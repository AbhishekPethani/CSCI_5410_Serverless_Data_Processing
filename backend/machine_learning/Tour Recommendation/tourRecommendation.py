from google.cloud import aiplatform
from google.cloud.aiplatform.gapic.schema import predict
from google.protobuf import json_format
from google.protobuf.struct_pb2 import Value
from google.cloud import firestore
from flask import jsonify
import pandas as pd

def tourRecommendation(requests):
    request_args = requests.args
    request_json = requests.get_json(silent=True)

    headers = {
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Origin': '*'
    }
    if request_args and "duration" in request_args:
        duration = request_args['duration']
    elif request_json and "duration" in request_json:
        duration = request_json['duration']
    else:
        duration = None
        return (jsonify({"message": "Something went wrong", "status":400}),400,headers)
    api_endpoint = "us-central1-aiplatform.googleapis.com"
    project="project-id"
    endpoint_id="endpoint-id"
    location="us-central1"
    instance_dict = { "duration": duration}
    client_options = {"api_endpoint": api_endpoint}
    client = aiplatform.gapic.PredictionServiceClient(client_options=client_options)
    instance = json_format.ParseDict(instance_dict, Value())
    instances = [instance]
    parameters_dictionary = {}
    all_parameters = json_format.ParseDict(parameters_dictionary, Value())
    endpoint = client.endpoint_path(project=project, location=location, endpoint=endpoint_id)
    response = client.predict(endpoint=endpoint, instances=instances, parameters=all_parameters)
    predictions = response.predictions
    dataframe = pd.DataFrame(dict(predictions))
    tour_class = dataframe['classes'].iloc[dataframe[['scores']].idxmax()]
    flag, recommended_tour = getFireStoreData("tour_packages", tour_class.values[0])
    return (jsonify(recommended_tour),200,headers)


def getFireStoreData(collection_name, tour_class):
    db = firestore.Client()
    users_ref = db.collection(collection_name).document(tour_class)
    users_doc = users_ref.get()
    if users_doc.exists:
        response = users_doc.to_dict()
        return True, response
    else:
        return False, {}
from google.cloud import aiplatform
from google.cloud.aiplatform.gapic.schema import predict
from google.protobuf import json_format
from google.protobuf.struct_pb2 import Value
from google.cloud import firestore
from flask import jsonify

def feedback_sentiment_analysis(requests):
    request_args = requests.args
    request_json = requests.get_json(silent=True)
    headers = {
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Origin': '*'
    }

    if request_args and "feedback" in request_args and "email" in request_args:
        feedback = request_args['feedback']
        email = request_args['email']
    elif request_json and "feedback" in request_json and "email" in request_args:
        feedback = request_json['feedback']
        email = request_args['email']
    else:
        feedback = None
        email = None
        return (jsonify({"message": "Something went wrong", "status":400}),400,headers)
        
    api_endpoint = "us-central1-aiplatform.googleapis.com"
    project="project-id"
    endpoint_id="endpoint-id"
    location="us-central1"
    client_options = {"api_endpoint": api_endpoint}
    client = aiplatform.gapic.PredictionServiceClient(client_options=client_options)
    instance = predict.instance.TextSentimentPredictionInstance(content=content,).to_value()
    instances = [instance]
    endpoint = client.endpoint_path(project=project, location=location, endpoint=endpoint_id)
    response = client.predict(endpoint=endpoint, instances=instances)
    predictions = response.predictions
    for prediction in predictions:
        print(" prediction:", dict(prediction))
        print(prediction['sentiment'])

    feedback_object = {"feedback": feedback, "polarity_score": prediction['sentiment']}
    setFireStoreData("UserFeedback", email, feedback_object)

    return (jsonify({"message": "Prediction successfully completed.", "status":200, "score": prediction['sentiment']}),200,headers)


def setFireStoreData(collection_name, email, doc_value):
    db = firestore.Client()
    doc_ref = db.collection(collection_name).document(email)
    doc_ref.set(doc_value)
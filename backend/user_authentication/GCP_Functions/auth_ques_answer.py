import json
from google.cloud import firestore
import random
from flask_cors import cross_origin

@cross_origin(allowed_methods=['GET'])
def auth_user_quest_answer(requests):
    if requests.method == 'OPTIONS':
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Max-Age': '3600',
        }
        return ('', 204, headers)
    headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Origin": "*",
        "X-Requested-With": "*"
    }
    collectionName = u'auth_users_quest_answer'
    requestArgs = requests.args
    requestJson = requests.get_json(silent=True)
    if requestArgs and "email" in requestArgs and "task" in requestArgs:
        email = requestArgs['email']
        task = requestArgs['task']
    elif requestJson and "email" in requestJson and "task" in requestArgs:
        email = requestJson['email']
        task = requestJson['task']
    else:
        email = None
        task = None

    if task == "READ":
        randomQuestion = 'q' + str(random.randint(1, 3))
        flag, ques, ans = connectFirestoreCollection(collectionName, email, randomQuestion)

        if flag:
            print(ques + " " + ans)
            return {"email": email, "question": ques, "answer": ans, "status": 200, "headers": headers}
        else:
            return {"email": email, "error message": "Invalid EmailId", "status": 400, "headers": headers}
    elif task == "WRITE":
        if requestArgs and 'ques_ans_values' in requestArgs:
            doc_value = requestArgs['ques_ans_values']
        elif requestJson and 'ques_ans_values' in requestJson:
            doc_value = requestJson['ques_ans_values']
        else:
            return {
                "message": "ques_ans_values' key is not found. Key is required to store the data in firestore for WRITE operation",
                "status": 200, "headers": headers}

        # firestore data storing functionality
        db = firestore.Client()
        doc_ref = db.collection(collectionName).document(email)
        json_acceptable_string = doc_value.replace("'", "\"")
        print("JSON: " + json_acceptable_string)
        d = json.loads(json_acceptable_string)
        print("JSON LOAD: " + str(d))
        doc_ref.set(d)

        return {"message": "The security question answers are inserted successfully in the collection", "status": 200,
                "headers": headers}
    else:
        return {"status": 400, "headers": headers}

# Connect to Firestore collection and fetch data
def connectFirestoreCollection(collectionName, email_id, q_number):
    # Read collection
    db = firestore.Client()
    usersRef = db.collection(collectionName).document(email_id)
    doc = usersRef.get()
    if doc.exists:
        resultDict = doc.to_dict()
        randomQuestion = resultDict[q_number]["question"]
        answer = resultDict[q_number]["answer"]
        return True, randomQuestion, answer
    else:
        return False, "", ""
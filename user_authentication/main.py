import json
from winreg import QueryInfoKey
from google.cloud import firestore
import os
import random

os.environ[
    "GOOGLE_APPLICATION_CREDENTIALS"] = r"C:\Users\shelj\AppData\Local\Google\Cloud SDK\key_serverless_final.json"

# This function is written for performing authentication - Question answer round.
# In the input it accepts email of the user. {"email": "dummy@gmail.com", "task": "READ" or "WRITE"}
######################################################################
# SAMPLE INPUT TO BE RECEIVED FOR WRITE
"""     {"email": "dummy@gmail.com", 
         "task": "WRITE",
        "ques_ans_values" = {'q2': {'id': 2, 'question': 'What is your mother name', 'answer': 'Manisha'}, 
                     'q3': {'id': 3, 'answer': 'Indu', 'question': 'What is the name of your favorite teacher?'}, 
                     'q1': {'id': 1, 'question': 'What is your father name?', 'answer': 'Kumar'}}
        }
"""
# SAMPLE INPUT TO BE RECEIVED FOR READ
"""     {"email": "dummy@gmail.com", 
         "task": "READ"
        }
"""


######################################################################


def authentication_user_quest_answer(requests):
    collection_name = u'auth_users_quest_answer'
    # fetch the user email id  and check what task is requested
    request_args = requests.args
    request_json = requests.get_json(silent=True)
    # handle params in url
    if request_args and "email" in request_args and "task" in request_args:
        email = request_args['email']
        task = request_args['task']
    # handle params in json body
    elif request_json and "email" in request_json and "task" in request_args:
        email = request_json['email']
        task = request_json['task']
    else:
        email = None
        task = None

    if task == "READ":
        random_question = 'q' + str(random.randint(1, 3))
        flag, ques, ans = connect_firestore_collection(collection_name, email, random_question)

        if flag:
            return {"email":email, "question":ques, "answer":ans, "status": 200}
        else:
            return {"email":email, "error message":"Invalid EmailId", "status": 400}
    elif task == "WRITE":
        if request_args and 'ques_ans_values' in request_args:
            doc_value = request_args['ques_ans_values']
        elif request_json and 'ques_ans_values' in request_json:
            doc_value = request_json['ques_ans_values']
        else:
            return {"message": "ques_ans_values' key not found. Key is mandatory for WRITE operation", "status": 200}

        # firestore details here
        db = firestore.Client()
        doc_ref = db.collection(collection_name).document(email)
        json_acceptable_string = doc_value.replace("'", "\"")
        d = json.loads(json_acceptable_string)
        doc_ref.set(d)
        return {"message": "User question answers are inserted successfully in the collection", "status": 200}
    else:
        return {"status": 400
                }


# Connect to Firestore collection and fetch data
# Read any collection documents
def connect_firestore_collection(collection_name, email_id, q_number):
    # Read collection
    db = firestore.Client()
    users_ref = db.collection(collection_name).document(email_id)
    doc = users_ref.get()
    if doc.exists:
        result_dict = doc.to_dict()
        random_question = result_dict[q_number]["question"]
        answer = result_dict[q_number]["answer"]
        return True, random_question, answer
    else:
        return False, "", ""


# Adding questions to Firestore Collection
# One Time activity
# Command to execute: functions-framework --target load_questions_collection
def load_user_questions_collection():
    db = firestore.Client()
    questions = [u'What is your father middle name?',
                 u'What is your sibling name?',
                 u'What is your favorite color?',
                 u'What is the name of your favorite teacher?',
                 u'What is your mother maiden name?',
                 u'What is your birth year?'
                 ]

    for i in range(len(questions)):
        doc_ref = db.collection(u'authentication_questions').document()
        doc_ref.set({u'question': questions[i], u'id': i + 1})

    return str(i) + " Records are inserted successfully in auth_questions firestore collection "


# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    authentication_user_quest_answer({"email": "hello@gmail.com", "task": "WRITE"})
    # authentication_user_quest_answer({"email": "dummy@gmail.com", "task": "READ"})

    # Used this to create the collection in firebase
    # load_questions_collection()

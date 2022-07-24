from google.cloud import firestore
from flask import jsonify

def feedbackSummation(requests):
    collection_name = 'UserFeedback'
   
    headers = {
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Origin': '*'
    }
    feedback_response = getFireStoreData(collection_name)
    
    return (jsonify(feedback_response),200,headers)


def getFireStoreData(collection_name):
    
    db = firestore.Client()
    user_feedbacks = db.collection(collection_name).stream()
    total_records = 0
    polarity_score = 0
    for feedback in user_feedbacks:
        total_records = total_records + 1
        database_feedback_dict = feedback.to_dict()
        polarity_score = polarity_score + database_feedback_dict['polarity_score']
    positive_feedback_percentage = (sum / total_records) * 100
    return {"positive_feedback": positive_feedback_percentage}
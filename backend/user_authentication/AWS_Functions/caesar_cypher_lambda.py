import string
import boto3
from boto3.dynamodb.conditions import Key
import json


def lambda_handler(event, context):
    try:
        body = event['body']
        json_acceptable_string = body.replace("'", "\"")
        body = json.loads(json_acceptable_string)
        input = body['input']
        userid = body['user_id']
        
        key_step = fetch_key("user", userid)
        
        if key_step:
            alphabets = (string.ascii_lowercase, string.ascii_uppercase, string.digits)
        
            def shift(alphabet):
                return alphabet[key_step:] + alphabet[:key_step]
        
            shifted_alphabets = tuple(map(shift, alphabets))
            joined_aphabets = ''.join(alphabets)
            joined_shifted_alphabets = ''.join(shifted_alphabets)
            table = str.maketrans(joined_aphabets, joined_shifted_alphabets)
            decrypted_word = input.translate(table)
            
            return {
                'statusCode': 200,
                'body': decrypted_word
            }
        else:
            return {
                'statusCode': 400,
                'body': "Error! Something went wrong."
            }
    except Exception as e:
        print(e)
        return {
            'statusCode': 404,
            'body': str(e)
        }

def fetch_key(tablename, userid):
    connectSession = boto3.Session()
    db = connectSession.resource('dynamodb')
    dynamo_table = db.Table(tablename)
    response_json = dynamo_table.query(KeyConditionExpression=Key('user_id').eq(userid))
    print(response_json)
    print("Empty")
    if response_json['Items']:
        user_key = int(response_json['Items'][0]['key'])
        return user_key
    else:
        return False
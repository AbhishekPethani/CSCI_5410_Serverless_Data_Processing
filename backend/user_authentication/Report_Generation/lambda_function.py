import json
from uuid import uuid1
import datetime
import pygsheets

DYNAMO_SOURCE = "aws:dynamodb"
FOOD_ORDERS = "foodOrder"
ROOM_BOOKING = "roomBooking"
TOUR_BOOKING = "tourBooking"
path = 'authorize_key.json'

SHEET_URL = 'https://docs.google.com/spreadsheets/d/1uG4QJTaiZny5FlOLQXIsx8UnrQQk-VyU1dkHHQo0NHg/edit?usp=sharing'
gc = pygsheets.authorize(service_file=path)
sh = gc.open_by_url(SHEET_URL)


def lambda_handler(event, context):
    for record in event['Records']:
        if record['eventSource'] == DYNAMO_SOURCE:
            if FOOD_ORDERS in record['eventSourceARN']:
                entry = process_food_order(record['dynamodb'])
                write_sheets(entry, sh[1])
                print(entry)
                print(record)
            elif ROOM_BOOKING in record['eventSourceARN']:
                entry = process_room_booking(record['dynamodb'])
                write_sheets(entry, sh[1])
                print(entry)
                print(record)
            elif TOUR_BOOKING in record['eventSourceARN']:
                entry = process_room_booking(record['dynamodb'])
                write_sheets(entry, sh[1])
                print(entry)
                print(record)
            else:
                entry = ['13', 'sherrinraji11@gmail.com',
                         'logged in', 'price', 'today']
                write_sheets(entry, sh[0])
    return {
        'statusCode': 200,
        'body': json.dumps("testing")
    }


def write_sheets(data, sheet):
    sheet.append_table(data, start='A2')


def process_food_order(dynamo_record):
    key = dynamo_record['Keys']
    image = dynamo_record['NewImage']
    id = str(uuid1())
    user_id = image['email']['S']
    order_id = key['order_id']['S']
    event = FOOD_ORDERS
    price = image['totalCost']['N']
    order_timestamp = image['timestamp']['S']
    timestamp = str(datetime.datetime.now())
    return [id, user_id, order_id, event, price, order_timestamp, timestamp]


def process_room_booking(dynamo_record):
    key = dynamo_record['Keys']
    image = dynamo_record['NewImage']
    id = str(uuid1())
    user_id = image['email']['S']
    order_id = key['booking_id']['S']
    event = ROOM_BOOKING
    price = image['price']['N']
    order_timestamp = image['timestamp']['S']
    timestamp = str(datetime.datetime.now())
    return [id, user_id, order_id, event, price, order_timestamp, timestamp]


def process_tour_booking(dynamo_record):
    key = dynamo_record['Keys']
    image = dynamo_record['NewImage']
    id = str(uuid1())
    user_id = image['email']['S']
    order_id = key['tour_booking_id']['S']
    event = TOUR_BOOKING
    price = image['price']['N']
    order_timestamp = dynamo_record['ApproximateCreationDateTime']
    timestamp = str(datetime.datetime.now())
    return [id, user_id, order_id, event, price, order_timestamp, timestamp]

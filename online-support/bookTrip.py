import boto3
from datetime import datetime,timedelta
import uuid
 
dynamodb = boto3.resource("dynamodb")
put_item_dynamodb = boto3.client('dynamodb')
# --- Helpers that build all of the responses ---
 
def get_slots(intent_request):
   return intent_request['sessionState']['intent']['slots']
 
def get_slot(intent_request, slot_name):
   slots = get_slots(intent_request)
   if slots is not None and slot_name in slots and slots[slot_name] is not None:
       return slots[slot_name]['value']['interpretedValue']
   else:
       return None
 
def elicit_slot(intent_request, session_attributes, slot_to_elicit, message):
   return {
       'sessionState': {
           'sessionAttributes': session_attributes,
           'dialogAction': {
               'type': 'ElicitSlot',
               'slotToElicit': slot_to_elicit,
           },
           'intent': intent_request['sessionState']['intent']
       },
       'messages': [{
           'contentType': 'PlainText',
           'content': message
       }],
       'sessionId': intent_request['sessionId'] ,
       'requestAttributes': intent_request['requestAttributes'] if 'requestAttributes' in intent_request else None
   }
 
 
 
def close(intent_request, session_attributes, fulfillment_state, message):
   intent_request['sessionState']['intent']['state'] = fulfillment_state
   return {
       'sessionState': {
           'sessionAttributes': session_attributes,
           'dialogAction': {
               'type': 'Close'
           },
           'intent': intent_request['sessionState']['intent']
       },
       'messages': [{
           'contentType': 'PlainText',
           'content': message
       }],
       'sessionId': intent_request['sessionId'],
       'requestAttributes': intent_request['requestAttributes'] if 'requestAttributes' in
       intent_request else None
   }
 
 
""" --- Functions that control the bot's behavior --- """
 
 
def get_session_attributes(intent_request):
   session_state = intent_request['sessionState']
   if 'sessionAttributes' in session_state:
       return session_state['sessionAttributes']
   return {}
 
#Function to check room's availability
def checkRoomAvailability(intent_request):
    session_attributes = get_session_attributes(intent_request)
    checkRooms = get_slot(intent_request, 'checkRooms')
    roomType = get_slot(intent_request, 'RoomType')
    bookingDate = get_slot(intent_request, 'BookingDate')
    checkoutDate = get_slot(intent_request, 'CheckoutDate')
    complete = get_slot(intent_request, 'complete')
    confirm = get_slot(intent_request, 'confirm')
    
    if not roomType:
        return elicit_slot(intent_request, session_attributes, 'RoomType', "What type of room are you looking for? (King/Queen/Deluxe)")
    if not bookingDate: 
        return elicit_slot(intent_request, session_attributes, 'BookingDate', "When do you want to check-in?")
    if not checkoutDate: 
        return elicit_slot(intent_request, session_attributes, 'CheckoutDate', "When do you want to check-out?")
        
    roomBooking_data = dynamodb.Table('roomBooking').scan()
    roomBooking_item = roomBooking_data['Items']
    flag = 0
    
    for i in roomBooking_item:
        if roomType == i["room_type"]:
            print(type(i["checkoutDate"]))
            if not ((datetime.strptime(bookingDate, '%Y-%m-%d') <= datetime.strptime(i["bookingDate"],'%Y-%m-%d')) and (datetime.strptime(checkoutDate, '%Y-%m-%d')  >= datetime.strptime(i["checkoutDate"],'%Y-%m-%d'))):
                flag = 0
            else:
                flag = 1

    if not complete:
        if flag == 0:
                return elicit_slot(intent_request, session_attributes, "complete", "Yes, the room is available. Do you want to book this room? (Yes or No)")
                
        else:
                return elicit_slot(intent_request, session_attributes, "complete", "Sorry no rooms available.")
    
    if complete.lower() == "yes":
        return close(intent_request, session_attributes, "Fulfilled", "Please login here.<link>")
    if complete.lower() == "no":
        return close(intent_request, session_attributes, "Fulfilled", "Thanks for checking!")

#Function to book room 
def bookRooms(intent_request):
    session_attributes = get_session_attributes(intent_request)
    roomType = get_slot(intent_request, 'book_roomType')
    booking_date = get_slot(intent_request, 'book_bookingDate')
    checkout_date = get_slot(intent_request, 'book_checkoutDate')
    complete = get_slot(intent_request, 'book_complete')
    
    if not roomType:
               return elicit_slot(intent_request, session_attributes, 'book_roomType', "What type of room do you want to book?(King/ Queen/ Deluxe)")
    
    if not booking_date:
               return elicit_slot(intent_request, session_attributes, 'book_bookingDate', "When do you want to check-in?")
    
    if not checkout_date:
               return elicit_slot(intent_request, session_attributes, 'book_checkoutDate', "When do you want to check-out?")
    
    roomBooking_data = dynamodb.Table('roomBooking').scan()
    roomBooking_item = roomBooking_data['Items']
    
    if roomType.lower() == "king":
                    id = "101"
    if roomType.lower() == "queen":
        id = "102"
    if roomType.lower() == "deluxe":
        id = "103"
        
    
    for i in roomBooking_item:
        if roomType == i["room_type"]:
            print(type(i["checkoutDate"]))
            if not ((datetime.strptime(booking_date, '%Y-%m-%d') <= datetime.strptime(i["bookingDate"],'%Y-%m-%d')) and (datetime.strptime(checkout_date, '%Y-%m-%d')  >= datetime.strptime(i["checkoutDate"],'%Y-%m-%d'))):
                flag = 1
            else:
                flag = 0
        else:
            flag = 1
    
    if flag == 1:
        if not complete:
            return elicit_slot(intent_request, session_attributes, 'book_complete', "You have requested for {} room on {} and the checkout date is {}. Confirm yes or no?"
                                              .format(roomType.title(),
                                                      booking_date,
                                                      checkout_date))
        if complete.lower() == 'yes':
            item = put_item_dynamodb.put_item(TableName='roomBooking',
                                                     Item={
                                                            'room_id' : {'N' : id},
                                                            'booking_id' : {'S' : str(uuid.uuid1())},
                                                            'room_type': {'S' : roomType},
                                                            'bookingDate' : {'S' : str(booking_date)},
                                                            'checkoutDate' : {'S' : str(checkout_date)},
                                                            'status': {'S' : "1"},
                                                            'timestamp' : {'S' : str(datetime.now())},
                                                            })
            return close(intent_request, session_attributes, "Fulfilled", "Your request has been placed successfully")
                
        elif complete.lower() == 'no':
            return close(intent_request, session_attributes, "Fulfilled", "Your request has been cancelled!")
        else:
            return elicit_slot(intent_request, session_attributes, 'Complete','Enter valid option (yes or no)')
    
    else:
        return elicit_slot(intent_request, session_attributes, "book_complete", "Sorry this room is not available.") 


#Function to order food       
def orderFood(intent_request):    
    session_attributes = get_session_attributes(intent_request)
    foodItem = get_slot(intent_request, 'foodItem')
    quantity = get_slot(intent_request, 'quantity')
    complete = get_slot(intent_request, 'food_complete')
    
    
    food_data = dynamodb.Table('food').scan()
    food_item = food_data['Items']

    if not foodItem:
        return elicit_slot(intent_request, session_attributes, 'foodItem', "What do you want to order?")
    
    if not quantity:
        return elicit_slot(intent_request, session_attributes, 'quantity', "How many plates?")
    
    item_price = 0
    if not complete:
        for d in food_item:
            print(foodItem)
            if d["food_item"] == "Lamb Broth":
                print("XXX")
                item_price = d["price"]*int(quantity)
                return elicit_slot(intent_request, session_attributes, 'food_complete', "You have requested for {} {} and the price is {}. Confirm yes or no?"
                                          .format(quantity,
                                          foodItem.title(),
                                          item_price))
                                      
    if complete.lower() == 'yes':                             
        item = put_item_dynamodb.put_item(TableName='foodOrder',
                                             Item={
                                                    'order_id' : {'S' : str(uuid.uuid1())},
                                                    'foodItem': {'S' : foodItem},
                                                    'quantity' : {'N' : quantity},
                                                    'price' : {'N' :  str(int(item_price))},
                                                    'timestamp' : {'S' : str(datetime.now())},
                                                    })
        return close(intent_request, session_attributes, "Fulfilled", "Your order has been placed successfully")
    
    elif complete.lower() == 'no':
        return close(intent_request, session_attributes, "Fulfilled", "Your request has been cancelled!")
    else:
        return elicit_slot(intent_request, session_attributes, 'Complete','Enter valid option (yes or no)')


#Calling the functions based on intents
def dispatch(intent_request):
   intent_name = intent_request['sessionState']['intent']['name']
   response = None
   if intent_name == 'Bookrooms':
       return bookRooms(intent_request)
   if intent_name == 'CheckRoomAvailability':
       return checkRoomAvailability(intent_request)
   if intent_name == 'foodOrder':
       return orderFood(intent_request)    
       
   raise Exception('Intent with name ' + intent_name + ' not supported')
  

   

def lambda_handler(event, context):
   response = dispatch(event)
   return response

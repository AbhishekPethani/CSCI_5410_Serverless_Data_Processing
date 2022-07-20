import axios from "axios";


//Caesar Cipher check from Lambda
const caesar_cipher = data => {
    return "hello";
    // return json_api.post("/houses", data);
};


export const getAllRooms = async () => {
    return axios({
        method: "GET",
        url: `https://4jyhjxmmhtkne4bzf4z2ix6coi0jftck.lambda-url.us-east-1.on.aws/`
    });
};

export const getRoom = async (userData) => {
    return axios({
        method: "POST",
        url: `https://ealmiun7hmaxwh6to72wijzxgu0rvlyy.lambda-url.us-east-1.on.aws/`,
        data: { "some": "101" }
    });
};

export const storeBookingInfo = async (userData) => {
    
    return await axios({
        method: "POST",
        url: `https://vc8cixv998.execute-api.us-east-1.amazonaws.com/store-booking-info`,
        data: userData,
    });
};

export const sendMessage = async (messageInfo) => {
    
    return axios({
        method: "POST",
        url: "https://us-central1-sdpproject-355718.cloudfunctions.net/notification_info",
        data: messageInfo,
    })
}

export default {
    caesar_cipher,
};

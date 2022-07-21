import axios from "axios";


//Caesar Cipher check from Lambda
const caesar_cipher = userData => {
    return axios({
        method: "POST",
        url: `https://snkzertx7jitqrsqwbea4e2tmi0tbjvq.lambda-url.us-east-1.on.aws/`,
        data: userData,
    });
};


export const getAllRooms = async () => {
    return axios({
        method: "GET",
        url: `https://4jyhjxmmhtkne4bzf4z2ix6coi0jftck.lambda-url.us-east-1.on.aws/`
    });
};

export const getMeals = async () => {
    return axios({
        method: "GET",
        url: `https://47vlfsqggxbx3tektlcjyktxnu0mrwyr.lambda-url.us-east-1.on.aws/`
    });
};

export const getMeal = async (food_id) => {
    return axios({
        method: "GET",
        url: `https://37bh7hmypoto5uqlkz63eshazm0yenpy.lambda-url.us-east-1.on.aws/?foodId=`+food_id,
    });
};

export const storeOrder = async (userData) => {
    
    return axios({
        method: "POST",
        url: `https://lssfq7dvah.execute-api.us-east-1.amazonaws.com/store-order`,
        data: userData,
    });
};


export const storeFeedback = async (userData) => {
    
    return axios({
        method: "GET",
        url: `https://us-central1-serverless-project-g16.cloudfunctions.net/feedback_sentiment_analysis?feedback=${userData.feedback}%20was%20bad%20and%20dirty&email=shelja86@gmail.com`,
        data: userData,
    });
};

export const getFeedbackAnalysis = async () => {
    return axios({
        method: "GET",
        url: `https://us-central1-serverless-project-g16.cloudfunctions.net/feedback_analytics_fetch`,
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

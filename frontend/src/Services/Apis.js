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
        method: "POST",
        url: `https://2j4lyj2mc4.execute-api.us-east-1.amazonaws.com/store-feedback`,
        data: userData,
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
    
    return axios({
        method: "POST",
        url: `https://vc8cixv998.execute-api.us-east-1.amazonaws.com/store-booking-info`,
        data: userData,
    });
};
export default {
    caesar_cipher,
};

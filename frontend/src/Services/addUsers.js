import { CognitoUserPool, CognitoUserAttribute } from "amazon-cognito-identity-js"
import storeSecurityQuestionsAnswers from "./addSecurityQuestionAnswer"

const poolData = {
    UserPoolId: "us-east-1_SXOBXtb3q",
    ClientId: "4aqstlor5vdu7j7t76mh54j2f"
}

const registerUser = async (userInput, questionVals, answers, securityKey) => {
    let attributeList = []
    attributeList.push(new CognitoUserAttribute({
        Name: "custom:first_name",
        Value: userInput.firstName
    }))
    attributeList.push(new CognitoUserAttribute({
        Name: "custom:last_name",
        Value: userInput.lastName
    }))
    attributeList.push(new CognitoUserAttribute({
        Name: "email",
        Value: userInput.email
    }))
    try{
        const result = await register(userInput.email, userInput.password, attributeList)    
        alert("Your account is created. Please login to use our services.")
        console.log(result)
        storeSecurityQuestionsAnswers(userInput.email, questionVals, answers, securityKey)
    }catch(err){
        alert((err.message || JSON.stringify(err)) + " Please login to use our services.");
        console.log(err)
    }
} 

function register (email, password, attributeList) {
    const UserPool = new CognitoUserPool(poolData)

    return new Promise((resolve, reject) => {
        UserPool.signUp(email, password, attributeList, null, (err, data) => {
            if (err) {
                reject(err)
            }else{
                resolve(data)
            }
        })
    })
}
export default registerUser
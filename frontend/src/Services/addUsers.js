import { CognitoUserPool, CognitoUserAttribute } from "amazon-cognito-identity-js"

const poolData = {
    UserPoolId: "us-east-1_SXOBXtb3q",
    ClientId: "4aqstlor5vdu7j7t76mh54j2f"
}
const registerUser = (userInput) => {
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

    const UserPool = new CognitoUserPool(poolData)
    UserPool.signUp(userInput.email, userInput.password, attributeList, null, (err, data) => {
        if (err) {
            alert(err.message || JSON.stringify(err));
        }else{
            console.log(data)
        }
    })
} 

export default registerUser
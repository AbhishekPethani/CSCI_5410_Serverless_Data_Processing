import { CognitoUserPool, AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js"

const poolData = {
    UserPoolId: "us-east-1_SXOBXtb3q",
    ClientId: "4aqstlor5vdu7j7t76mh54j2f"
}
const loginUser = async (userInput) => {
    const userPool = new CognitoUserPool(poolData);
    const user = new CognitoUser({ Username: userInput.email, Pool: userPool });
   
    const authenticationData = { Username: userInput.email, Password: userInput.password };
    const authenticationDetails = new AuthenticationDetails(authenticationData);
    
    return new Promise((resolve, reject) =>
     user.authenticateUser(authenticationDetails, {
      onSuccess: result => resolve(result),
      onFailure: err => reject(err)
     })
    );
}

export default loginUser;
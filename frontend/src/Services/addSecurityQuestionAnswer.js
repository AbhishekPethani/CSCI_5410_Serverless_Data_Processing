import axios from "axios"

const headers = {
    "Content-Type" : "application/json",
    "Access-Control-Allow-Headers" : "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
    "Access-Control-Allow-Methods" : "OPTIONS,POST",
    "Access-Control-Allow-Credentials" : true,
    "Access-Control-Allow-Origin" : "*",
    "X-Requested-With" : "*"
}

const storeSecurityQuestionsAnswers = (email, questionVals, answers) => {
    // store security question, answer and key
    const questions = {
        que_1: questionVals.que_1.label,
        que_2: questionVals.que_2.label,
        que_3: questionVals.que_3.label
    }
    const URL = "https://us-east1-serverless-final-project-15.cloudfunctions.net/auth_user_ques_ans?email="+ 
                email +"&task=WRITE&ques_ans_values={'q2': {'id': '2', 'question': '" + 
                questions.que_2 + "', 'answer': '" + answers.ans2 +"'}, 'q3': {'id': '3', 'answer': '" + 
                answers.ans3 + "', 'question': '" + questions.que_3 + "'}, 'q1': {'id': '1', 'question': '" +
                questions.que_1 + "', 'answer': '" +questions.que_1 +"'}}"
    
    axios.get(URL)
    .then((response) => {
        console.log("User Account is created")
    })
    .catch((error) => {
        console.log(error)
    })
}

export default storeSecurityQuestionsAnswers
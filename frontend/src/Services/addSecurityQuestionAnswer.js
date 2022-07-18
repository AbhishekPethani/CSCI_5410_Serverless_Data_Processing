import axios from "axios"

const headers = {
    "Content-Type" : "application/json",
    "Access-Control-Allow-Headers" : "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
    "Access-Control-Allow-Methods" : "OPTIONS,POST",
    "Access-Control-Allow-Credentials" : true,
    "Access-Control-Allow-Origin" : "*",
    "X-Requested-With" : "*"
}

const storeSecurityQuestionsAnswers = (email, questionVals, answers, securityKey) => {
    // store security question, answer and key
    const questions = {
        que_1: questionVals.que_1.label,
        que_2: questionVals.que_2.label,
        que_3: questionVals.que_3.label
    }
    const data = {
        email: email,
        questions: questions, 
        answers: answers,
        securityKey: securityKey
    }
    
    axios.post('https://us-central1-project-356601.cloudfunctions.net/sec_question_answers', data)
    .then((response) => {
        console.log(response)
    })
    .catch((error) => {
        console.log(error)
    })
}

export default storeSecurityQuestionsAnswers
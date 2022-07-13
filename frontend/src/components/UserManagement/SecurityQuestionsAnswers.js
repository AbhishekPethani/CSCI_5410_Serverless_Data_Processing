import Select from "react-select";
import React, { useState } from 'react'
import { Grid, TextField } from "@mui/material";

const SecurityQuestionsAnswers = ({questionVals, setQuestionVals, answers, setAnswers, inputErrors}) => {
    
    const [filterOptions, setFilterOptions] = useState([
        {
          value: "What was your childhood nickname?",
          label: "What was your childhood nickname ?"
        },
        {
          value: "In what city did you meet your spouse / significant other?",
          label: "In what city did you meet your spouse / significant other?"
        },
        {
          value: "What is the name of your favorite childhood friend?",
          label: "What is the name of your favorite childhood friend?"
        },
        {
          value: "What street did you live on in third grade?",
          label: "What street did you live on in third grade?"
        },
        {
          value: "What is the middle name of your youngest child?",
          label: "What is the middle name of your youngest child?"
        },
        {
          value: "What is the middle name of your oldest sibling?",
          label: "‘What is the middle name of your oldest sibling?"
        },
        {
          value: "What school did you attend for sixth grade?",
          label: "What school did you attend for sixth grade"
        },
        {
          value: "What was the name of your first stuffed animal?",
          label: "What was the name of your first stuffed animal?"
        },
        {
          value: "In what city or town did your mather and father meet?",
          label: "In what city or town did your mather and father meet?"
        }
    ])

    const handleQuestionValChange = (option, index) => {
        setQuestionVals({
            ...questionVals,
            [index]: option
        })
    };

    const getAvailableOptions = () => {
        const availableOptionsLeft = filterOptions;
        return availableOptionsLeft.filter(questionOption => {
          return Object.values(questionVals).indexOf(questionOption) === -1;
        });
    };
    const handleAnswerChange = (e) => {
      const {name, value} = e.target;
      setAnswers({
        ...answers,
        [name]: value
      });
    }

    return (
        <>
            <Grid item xs={12}>
                <Select
                    name="filters"
                    placeholder="Security Question #1"
                    value={questionVals["que_1"]}
                    options={getAvailableOptions()}
                    onChange={e => {
                        handleQuestionValChange(e, "que_1");
                    }}
                />
                {inputErrors.que_1 && <p style={{color:"red", margin:"auto"}}> {inputErrors.que_1}</p>}
            </Grid>
            <Grid item xs={12}>
              <TextField size='small' autoComplete='off' name="ans1" value={answers.ans1} 
                   onChange={e => handleAnswerChange(e)} required fullWidth id="answer_1" />
              {inputErrors.ans1 && <p style={{color:"red", margin:"auto"}}> {inputErrors.ans1}</p>}    
            </Grid>
            <Grid item xs={12}>
                <Select
                    name="filters"
                    placeholder="Security Question #2"
                    value={questionVals["que_2"]}
                    options={getAvailableOptions()}
                    onChange={e => {
                        handleQuestionValChange(e, "que_2");
                    }}
                />
                {inputErrors.que_2 && <p style={{color:"red", margin:"auto"}}> {inputErrors.que_2}</p>}
            </Grid>
            <Grid item xs={12}>
              <TextField size='small' autoComplete='off' name="ans2" value={answers.ans2}
                   onChange={e => handleAnswerChange(e)} required fullWidth id="answer_2" />
              {inputErrors.ans2 && <p style={{color:"red", margin:"auto"}}> {inputErrors.ans2}</p>}
            </Grid>
            <Grid item xs={12}>
                <Select
                    name="filters"
                    placeholder="Security Question #3"
                    value={questionVals["que_3"]}
                    options={getAvailableOptions()}
                    onChange={e => {
                        handleQuestionValChange(e, "que_3");
                    }}
                />
                {inputErrors.que_3 && <p style={{color:"red", margin:"auto"}}> {inputErrors.que_3}</p>}
            </Grid>
            <Grid item xs={12}>
              <TextField size='small' autoComplete='off' name="ans3" value={answers.ans3}
                   onChange={e => handleAnswerChange(e)} required fullWidth id="answer_3" />
              {inputErrors.ans3 && <p style={{color:"red", margin:"auto"}}> {inputErrors.ans3}</p>}
            </Grid>
            
        </>
    )
}

export default SecurityQuestionsAnswers
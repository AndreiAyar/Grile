import React, { useState } from 'react'
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

const debugging = true;
let answeredAllCorrect = 0;
/*
function debuggQ(props) {
    if (debugging) {
        return console.log('[Debugging]\nIntrebare:\n', props.questionDetails.question, '\nRaspuns:\n', props.answerDetails.correct ? 'Corect' : 'False', '\nIndex:\n', props.questionDetails.index)
    }
}
*/

function AnswerView({ ans_text, ans_num, isValid, onChange, disabled, setQuestionCorrect, questionCorrect}) {
    const style = {borderRadius:5, padding:5};
    //console.log(questionCorrect)
    if (isValid !== null) {
        if(isValid ){
        answeredAllCorrect = 1;
        }else{
            answeredAllCorrect = 1;
        }
        style.background = isValid ? '#4caf50' : '#f44336';
        disabled=true;
    }

    return (
        
        <div style={style}>
            <FormControl component="fieldset" onChange={e => {
                // debuggQ(props);
            //
                onChange(ans_num, e.target.checked);
            }}>
                <FormGroup aria-label="position" row>
                    <FormControlLabel
                        label={ans_text}
                        disabled={disabled}
                        value="end"
                        control={<Checkbox color="primary" />}
                        labelPlacement="end"
                    />
                </FormGroup>
            </FormControl>
        </div>

    )

  
}




export default AnswerView
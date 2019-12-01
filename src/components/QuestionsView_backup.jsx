import React, { useState } from 'react'
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

let debugging = true;

let checkQuestionArr = [];

function QuestionsView({ ans_text, correct, answers, question, index, ans_num }) {

    let [status, setStatus] = useState(0);

    let setAnswer = (question, correct, index, ans_num) => {

        if (debugging) {
            console.log('[Debugging]\nIntrebare:\n', question, '\nRaspuns:\n', correct, '\nIndex:\n', index, '\nAnsNum:\n', ans_num)
        }

    }
    return (

        < div >
            <FormControl component="fieldset" onChange={e => {
                //context api de citit
                if (e.target.checked === true) {
                    setStatus(status + 1)
                    console.log(status)
                    checkQuestionArr.push({ index, ans: parseInt(ans_num), ans_text, correct })

                    setAnswer(question, correct, index, ans_num)
                    console.log(checkQuestionArr.sort())


                } else {
                    setStatus(status - 1)
                    for (let i = 0; i < checkQuestionArr.length; i++) {
                        if (checkQuestionArr[i].ans === 1) {
                            console.log(checkQuestionArr[i])
                        }
                    }
                    //  let toRemoveIndex = indexOf()
                    // checkQuestionArr[0]
                    console.log('debifat')

                }

            }}>
                <FormGroup aria-label="position" row>
                    <FormControlLabel
                        label={ans_text}
                        value="end"
                        control={<Checkbox color="primary" />}
                        labelPlacement="end"
                    />
                </FormGroup>
            </FormControl>


            <button onClick={() => {
                for (let i = 0; i < checkQuestionArr.length; i++) {
                    //  if (checkQuestionArr[0[3] ==)
                    if (checkQuestionArr[i][3] === 1) {
                        alert('Tot Corect')

                    } else {
                        alert('Ai Gresit una')
                    }
                    console.log(checkQuestionArr[i][3])
                }


            }}>s </button>
        </div >



    )
}

export default QuestionsView

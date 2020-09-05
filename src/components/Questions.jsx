import React, { useState } from 'react'
import AnswerView from './AnswerView'
import { useQuery } from '@apollo/react-hooks';
import { gql } from "apollo-boost";
/**** Material UI */
import { withStyles, } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { green } from '@material-ui/core/colors';
import Loading from './Loading'
const ColorButton = withStyles(theme => ({
    root: {
        color: theme.palette.getContrastText(green[700]),
        backgroundColor: green[700],
        '&:hover': {
            backgroundColor: green[900],
        },
    },
}))(Button);

const GET_QUESTIONS = gql`
    query($chapID:Int, $first:Int, $offset:Int){
        questions(chapID:$chapID, first:$first, offset:$offset)
        {
            question
            answers
                {
                    ans_num
                    ans_text
                    correct
                }
          chapter{
            chap_id
            chap_name
          }
        }
        pagination{
            perTotal
        }
    }
  
`;

function QuestionItem({ question, answers, setQuestionCorrect, questionCorrect, questionWrong, setQuestionWrong, totalQuestions, setTotalQuestions }) {
    //const [questionList, questionLoad] = useState({question});
    const [answeredItems, setAnsweredItems] = useState({});
    const [validItems, setValidItems] = useState({});
    const [disabledStatus, setDisabledStatus] = useState(false);
    setTotalQuestions(totalQuestions)
    return (
        <div className='question'>
            {


            }
            <div className='question-inner'>
                <h3 className='question-list question-text'>{question}</h3>
                <ul className='answers'>
                    {
                        answers.map(({ ans_text, correct, ans_num }, index) => (
                            <li className="answer" key={index}>

                                <AnswerView
                                    /*props={{ answerDetails: { ans_num, ans_text, correct }, questionDetails: { index, question } }}*/
                                    ans_num={ans_num}
                                    ans_text={ans_text}
                                    questionCorrect={questionCorrect}
                                    setQuestionCorrect={setQuestionCorrect}
                                    correct={correct}
                                    totalQuestions={totalQuestions}
                                    isValid={validItems[ans_num] !== undefined ? validItems[ans_num] : null}
                                    onChange={(ans_num, value) => {
                                        let newState = {
                                            ...answeredItems,
                                            [ans_num]: value
                                        };
                                        if (!value) {
                                            delete newState[ans_num];
                                            // newState = newState.filter(x => x !== ans_num);
                                        }
                                        setAnsweredItems(newState);
                                    }}
                                />
                                <span>
                                    {/* {correct}  <DisplayAnswer isCorrect={correct} />*/}
                                    <br />
                                </span>
                            </li>
                        ))
                    }
                </ul>
                <ColorButton  disabled = {disabledStatus} variant="contained" color="primary" onClick={() => {
                    /* <button onClick={() => {*/
                    let onlyOneValid = true;
                    const newValidItems = {};
                    
                    answers.map((answer) => {
                        let isValid = false;
                        if (answeredItems[answer.ans_num] !== undefined) {



                            // daca eu am bifat true
                            if (answeredItems[answer.ans_num] === true && answer.correct) {
                                isValid = true;


                            }

                            newValidItems[answer.ans_num] = isValid;

                        }

                        else if (answer.correct && answeredItems[answer.ans_num] === undefined) {
                            newValidItems[answer.ans_num] = false;
                            onlyOneValid = false
                            setQuestionWrong(questionWrong + 1)




                        }



                    });
                    if (onlyOneValid !== false) {
                        setQuestionCorrect(questionCorrect + 1)
                      
                    }
                    setValidItems(newValidItems);
                    setDisabledStatus(true) 

                }
                
                }>Verifica raspunsuri </ColorButton>
            </div>
        </div>
    )
}

function QuestionsList({ chapID, first, offset, questionCorrect, setQuestionCorrect, questionWrong, setQuestionWrong, totalQutions, setTotalQuestions }) {
    const { loading, error, data } = useQuery(GET_QUESTIONS, {
        variables: { chapID, first, offset }
    });
    if (loading) return <Loading/>
    if (error) return <p>Error :(</p>;
    return data.questions.map(({ question, answers, chapter }, index) => <QuestionItem key={index} questionCorrect={questionCorrect} setQuestionCorrect={setQuestionCorrect} questionWrong={questionWrong} setQuestionWrong={setQuestionWrong} question={question} answers={answers} chapter={chapter.chap_name} totalQuestions={data.pagination.perTotal} setTotalQuestions={setTotalQuestions} />);
}

export default QuestionsList







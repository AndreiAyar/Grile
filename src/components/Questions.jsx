import React, { useState } from 'react'
import AnswerView from './AnswerView'
import TitleList from '../contexts/TitleContext'
import { useQuery } from '@apollo/react-hooks';
import { gql } from "apollo-boost";


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
    }
  
`;

function DisplayAnswer({ isCorrect }) {

    if (isCorrect === 1) {
        return 'Corect'
    } else {
        //console.log(isCorrect)
        return 'Gresit '

    }
}

function QuestionItem({ question, answers }) {
    const [questionList, questionLoad] = useState({question});
    const [answeredItems, setAnsweredItems] = useState({});
    const [validItems, setValidItems] = useState({});
   return(
        <div className='question'>
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
                                    correct={correct}
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
                              {/*  {correct}  <DisplayAnswer isCorrect={correct} />*/}
                                    <br />
                                </span>
                            </li>
                        ))
                    }
                </ul>
                <button onClick={() => {
                    const newValidItems = {};
                    answers.map((answer) => {
                        if (answeredItems[answer.ans_num] !== undefined) {
                            let isValid = false;

                            // daca eu am bifat true
                            if (answeredItems[answer.ans_num] === true && answer.correct) {
                                isValid = true;
                            }

                            newValidItems[answer.ans_num] = isValid;
                        }

                        else if (answer.correct && answeredItems[answer.ans_num] === undefined) {
                            newValidItems[answer.ans_num] = false;
                        }
                    });
                
                 setValidItems(newValidItems);
                }}>Verifica raspunsuri</button>
            </div>
        </div>
    )
}

function QuestionsList({ chapID, first, offset }) {
    const { loading, error, data } = useQuery(GET_QUESTIONS, {
        variables: { chapID, first, offset }
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return data.questions.map(({ question, answers }, index) => <QuestionItem key={index} question={question} answers={answers}/>);
    }

export default QuestionsList







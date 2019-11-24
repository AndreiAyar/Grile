import React, { useState } from 'react'
import QuestionsView from './QuestionsView'
import { useQuery } from '@apollo/react-hooks';
import { gql } from "apollo-boost";


const GET_QUESTIONS = gql`
    query($chap:Int, $first:Int, $offset:Int){
    
    questions(chap:$chap, first:$first, offset:$offset)
        {
            question
            answers
                {
                    ans_num
                    ans_text
                    correct
                }
        }
    }
`;

function DisplayAnswer({ isCorrect }) {

    if (isCorrect === 1) {
        return 'Corect'
    } else {
        console.log(isCorrect)
        return 'Gresit '

    }
}

function QuestionsData({ chap, first, offset, status }) {

    const { loading, error, data } = useQuery(GET_QUESTIONS, {
        variables: { chap, first, offset }
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;


    return data.questions.map(({ question, answers }, index) => (

        <div id='question' key={index}>
            <div className='question-inner'>
                <ol className='question-list'><h3 className='question-list question-text'>{question}</h3></ol>
                {
                    answers.map(({ ans_text, correct }, index) => (
                        <div className='answers' key={index}>

                            <li key={index} className='answers-list' ><QuestionsView testing={status} prop={ans_text} /></li>



                            <span>

                                {correct}  <DisplayAnswer isCorrect={correct} />


                                <br />
                            </span>
                        </div>

                    ))
                }




                <button>s</button>
            </div >
        </div>
        //console.log(answers[1].ans_text)
    ));

}

export default QuestionsData







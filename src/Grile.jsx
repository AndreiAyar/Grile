import React from 'react';

import questionsOrig from './questions-orig'

const questions = [];

for (let i in questionsOrig.questions_array) {
    const question = questionsOrig.questions_array[i];
    questions.push({
        question: question.ques_text,
        uniqueid: parseInt(question.chap_ques_num),
        answers: question.answers
    });
}

console.log(questions)

/*
type Answer {
    ans_num: String
    chosen: Int
    numerical_id: Int
    ans_text: String
}

type Question {
    question: String
    uniqueid: Int
    answer: [Answer]
}

type Query {
    questions: [Question]
}
*/

//=> asta e id unic dupa care iau din alt request de rest, raspunsul corect.. ca raspunsul corect e doar pentru cateva aici.. pt restu, trebuie alt request
class Grile extends React.Component {

    render() {

        return (
            <>
                test
        </>
            // <div>{arr.map(intrebare => (<div className='intrebare'>{intrebare})</div>))}</div>
        );

    }
}
export default Grile;
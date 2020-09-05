import React from 'react';
import QuestionsList from './Questions'

/**** Material UI */



const Grills = ({ chapID, cN, first, offset, setFirst, setOffset, questionCorrect, setQuestionCorrect, questionWrong, setQuestionWrong, totalQuestions, setTotalQuestions}) => {

    const handlePage = (type) => {
        if(type ==='forward'){
            setFirst(first  + 10);
            setOffset(offset + 10)
        }else if(type==="backwards"){
            console.log('first: ' + first + "offset: " + offset)
            setFirst(first - 20)
            setOffset(offset - 10)
            console.log(totalQuestions)
        }
       
    };
 //console.log(chapter)
    return (

        <div>
   
            <div className="chapter current">  <h2>Capitol Curent:  {cN} </h2></div>
            <div className="questions-status">
                <div className="questions-status-correct">
                  Intrebari Corecte: {questionCorrect}
                 </div>
                < div className="questions-status-wrong">
                  Intrebari Gresite: {questionWrong}
                 </div>
            </div>
           
        
            <div>
            <QuestionsList chapID={chapID} first={first} offset={offset} questionCorrect={questionCorrect} setQuestionCorrect={setQuestionCorrect} questionWrong={questionWrong} setQuestionWrong={setQuestionWrong} totalQuestions={totalQuestions} setTotalQuestions={setTotalQuestions}
            />
                
                </div>
            </div>
           
    )

}
export default Grills;

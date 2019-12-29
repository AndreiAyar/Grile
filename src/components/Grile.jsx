import React,{useState} from 'react';
import QuestionsList from './Questions'
import { red } from '@material-ui/core/colors';


const Grills = ({ chapID, cN, questionCorrect, setQuestionCorrect, questionWrong, setQuestionWrong}) => {
 //console.log(chapter)
    return (

        <div>
   
            <div className="chapter current">  <h2>Capitol Curent:  {cN} </h2></div>
            <div class="questions-status">
                <div class="questions-status-correct">
                  Intrebari Corecte: {questionCorrect}
                 </div>
                < div class="questions-status-wrong">
                  Intrebari Gresite: {questionWrong}
                 </div>
            </div>
    
            <div>
            <QuestionsList chapID={chapID} first={0} offset={250} questionCorrect={questionCorrect} setQuestionCorrect={setQuestionCorrect} questionWrong={questionWrong} setQuestionWrong={setQuestionWrong} 
            />
                
                </div>
            </div>
           
    )

}
export default Grills;

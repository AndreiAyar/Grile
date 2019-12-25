import React,{useState} from 'react';
import QuestionsList from './Questions'


const Grills = ({ chapID }) => {
    return (
        <div>
            <QuestionsList chapID={chapID} first={0} offset={9999}/>
        </div>
    )
}
export default Grills;

import React, { useState, useEffect } from 'react'
import QuestionsList from './Questions'
import { useQuery } from '@apollo/react-hooks';
import { gql } from "apollo-boost";


const GET_QUESTIONS = gql`
    query($first:Int, $filter:String){
        questions(first:$first, filter:$filter)
        {
          chapter{
            chap_name
          }
        }
    }
  
`;

function Chapters ({first, filter}) {

    const { loading, error, data } = useQuery(GET_QUESTIONS, {
        variables: {first, filter}
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;


        return data.questions.map(({ chapter }, i) => 
            <ChapterItem chapter={chapter.chap_name} key={i}/>
    
        )
         
}
function ChapterItem({chapter},key){

    return(
        <div className="chapter">
         <button onClick={()=> (
             console.log('s')
           )}>{chapter}</button>
      </div>
    )

}
  

    
export default Chapters;
import React, { useState, useEffect } from 'react'

import Grills from '../components/Grile'
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import { gql } from "apollo-boost";


const GET_QUESTIONS = gql`
    query($first:Int, $filter:String){
        questions(first:$first, filter:$filter)
        {
          chapter{
            chap_name
            chap_id
          }
        }
    }
  
`;

function Chapters ({first, filter, setChapId}) {   
    // const [getQ, {loading, data}] = useLazyQuery(GET_QUESTIONS)
    const { loading, error, data } = useQuery(GET_QUESTIONS, {
        variables: {first, filter}
    });
    
    if (loading) return <p>Loading chapters...</p>;
    if (data && data.questions){
      console.log(data.questions)
        return data.questions.map(({chapter }, index) => {
          return (
            <button
              onClick={() => setChapId(chapter.chap_id)}
              style={{marginRight:10,marginBottom:10}}
            >{chapter.chap_name}</button>
          )
        })
    }

    /*
    return(
    <div>
    <button onClick={() => getQ({ variables: { first, filter } })}>
      Click me!
    </button>
    </div>
      )
      */
   return null;
}
function s(){
    //return <QuestionsList  chapID={1} first={0} offset={5}/>
}


    
export default Chapters;
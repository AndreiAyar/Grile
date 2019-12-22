import React, { useState } from 'react'
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
          chapter{
            chap_id
            chap_name
          }
        }
    }
  
`;

function Chapters ({ chap, first, offset }) {

    const { loading, error, data } = useQuery(GET_QUESTIONS, {
        variables: { chap, first, offset }
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

  
    
    let x = data.questions.map(({ chapter,chap_id}, index) => console.log(chapter));
 //  console.log()
    return x
}
<<<<<<< HEAD
<<<<<<< HEAD
function ChapterItem({chapter},key){
=======
>>>>>>> parent of 36ef26f... before context
=======
>>>>>>> parent of 36ef26f... before context


  

    
export default Chapters;
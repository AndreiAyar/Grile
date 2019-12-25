import React, {useState} from 'react';
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

const TitleList= ({chapID, first, offset}) => {
    const { loading, error, data } = useQuery(GET_QUESTIONS, {
        variables: { chapID, first, offset}
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
/*
    const [titles, setTitles] = useState([

        {
            text:'Sal'
        },
        {
            text:'re'
        }
    ]);*/
   ///<QuestionsList  chapID={2} first={0} offset={5}/>
    return data.questions.map(({ question, answers }, index) => console.log(question));
    }


export default TitleList
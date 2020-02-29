const { ApolloServer, gql } = require('apollo-server-express');
const app = require('express')();
const express = require('express')

const questionsOrig = require('../src/questions.json')

let questions = [];
let questionsObj =[];
let questionsInTotal;

const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Answer {
    ans_num: String
    chosen: Int
    numerical_id: Int
    ans_text: String
    correct:Int
  }

  
  type Chapter{
      question: [Question]
      chap_name: String
      chap_id: Int
  }

  type Question {
    question: String
    uniqueid: Int
    answers: [Answer]
    chapter(chapID:Int): Chapter
  }

type Pagination{
     perTotal:Int
}

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    questions (chapID: Int, chapName: String, first:Int, offset:Int, filter:String):[Question]
    pagination:Pagination
  }
`;
/*
const questions_q = [
    {
        question: () => questionsOrig.questions_array[qid].ques_text,
        uniqueid: 'J.K. Rowling',
    },
    {
        question: 'Jurassic Park',
        uniqueid: 'Michael Crichton',
    },
];*/

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
        questions: (_, args) => {
            questions = [];
            for (let i in questionsOrig.questions_array) {
                const question = questionsOrig.questions_array[i];
                questions.push({
                    question: question.ques_text,
                    uniqueid: i,//question.chap_ques_num,
                    answers: question.answers,
                    chapter: question.chap_info
                });
    
               //  console.log(questions)
            }
            
            //* Returns specifc chapter based on how much First and Offset is given
            if (args.chapID !== 999 && args.first !== undefined && args.filter !=='unique' && args.chapName === undefined) {
                questions_chapter = null;
                questions_chapter = questions.filter(x => {
                    return x.chapter.chap_id === args.chapID.toString();
                })
 
                //console.log(questions_chapter.length)
                // first 0 
                // offset 

                //Fallback in case pagination is abused
                /*
                if(args.offset > questions_chapter.length){
                    args.offset = questions_chapter.length;
                    args.first =  questions_chapter.length - 10
                }*/

               //Setting the total questions based on CHAPTER
               questionsInTotal =  questions_chapter.length;
                return (
                    questions_chapter.slice(args.first, args.offset)
                )
                    
            
            //* Returns all chapters, based on how much First and Offset Is given
            } else if (args.chapID === 999) {
                return questions.slice(args.first, args.offset)

            //* Returns all the Chapter names, based on First arg(usually 0...)
            }else if(args.first !== undefined && args.filter === 'unique'){
                const gotQuestions = questions.slice(args.first)
                questionsSet = new Set(gotQuestions.map(z=>{
                    // console.log(questionsObj.find(x => x.chapter.chap_id === z.chapter_chap_id));
                    if(!questionsObj.find(x => x.chapter.chap_id === z.chapter.chap_id)) {
                        questionsObj.push({
                            chapter: {
                                chap_name: z.chapter.chap_name,
                                chap_id: z.chapter.chap_id
                            }
                        })
                      
                    }
                } ))

              console.log(questionsObj.length)
              return questionsObj;
                
            }else if(args.chapName !== undefined){
                questions_chapter = questions.filter(x => {
                    return x.chapter.chap_name === args.chapName;
                })
                return questions_chapter.slice(args.first)
            }
            
        },
        pagination: () => {
            let paginationData = {
                perTotal:questionsInTotal
            }
            return paginationData;
            
        }

    }

}
/*
const resolvers = {
    Query: {
        books: () => books,
        hello: () => {
            return 'tre sa returnam string'
        },
        hello2: () => {
            var x = ['a', 'b', 'c'];
            return x;
        },
        librarii: () => {
            return [
                { name: 'Nume Librarie1', books: books },
                { name: 'Nume Librarie2', books: books },
                { name: 'Nume Librarie2', books: books }
            ]
        }
    },
};
*/

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.applyMiddleware({ app });
app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)


//Working code
/*
}else if(args.first !== undefined && args.filter === 'unique'){
    let arr=[];
    let x = questions.slice(args.first)
        for(let i=0; i <= x.length-1; i++){//x[i].chapter.chap_id, 
            arr.push({chap_name: x[i].chapter.chap_name})

    }
    const distinctChapters = new Set(arr.map(z=>z.chap_name))
    console.log(distinctChapters)
    return distinctChapters
    
}*/
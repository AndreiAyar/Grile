const { ApolloServer, gql } = require('apollo-server');

const questionsOrig = require('../src/questions.json')

const questions = [];



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
      chap_id:String
  }

  type Question {
    question: String
    uniqueid: Int
    answers: [Answer]
    chapter(chap:Int): Chapter
  }


  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    questions (chap: Int, first:Int, offset:Int):[Question]

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
            for (let i in questionsOrig.questions_array) {
                const question = questionsOrig.questions_array[i];
                questions.push({
                    question: question.ques_text,
                    uniqueid: i,//question.chap_ques_num,
                    answers: question.answers,
                    chapter: question.chap_info
                });
                //  console.log(questions[i].chapter.chap_id[1])
            }
            if(args.chap !== 999 && args.first !== undefined){
               questions_chapter =  questions.filter(x => {
                   return x.chapter.chap_id === args.chap.toString();
                })
                return questions_chapter.slice(args.first, args.offset)
            }else if(args.chap === 999){
                    return questions.slice(args.first, args.offset)
            }
            /*
            if (args.first !== undefined) {
                return questions.slice(args.first, args.offset);
            }*/

        },

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
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url} `);
});


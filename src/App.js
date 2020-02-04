import React, { useState } from 'react';
import Grills from './components/Grile'
import Chapters from './components/Chapters'
import HeaderMenu from './components/Header'
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import './style.css'


const client = new ApolloClient({
  uri: 'http://localhost:4000',
});


function App() {
  const [chapID, setChapId] = useState(1);
  const [first, setFirst] = useState(0);
  const [offset, setOffset] = useState(10);
  const [questionCorrect, setQuestionCorrect] = useState(0);
  const [questionWrong, setQuestionWrong] = useState(0)
  let [totalQuestions, setTotalQuestions] = useState(0);
  console.log(totalQuestions)
  const[cN, setCN] = useState(' ')
  return (
    <React.Fragment>
      <HeaderMenu />
      <ApolloProvider client={client}>
        <div>
       {/*button onClick={() => setChapId(4)}>test</button>*/}
        <div id="chapters">
          <div className="chapters-list">
           <Chapters setChapId={setChapId} setCN={setCN} first={0} filter={"unique"}  setFirst={setFirst} setOffset={setOffset} />
           </div>
        </div>
        <div id="questions">
        <Grills totalQuestions={totalQuestions} setTotalQuestions={setTotalQuestions} first={first} offset={offset} setFirst={setFirst} setOffset={setOffset} chapID={chapID} setChapId={setChapId} cN ={cN} questionWrong={questionWrong} setQuestionWrong={setQuestionWrong} setQuestionCorrect={setQuestionCorrect} questionCorrect={questionCorrect}/>
        
        </div>
        </div>
      </ApolloProvider >
    </React.Fragment>

  );
}

export default App;

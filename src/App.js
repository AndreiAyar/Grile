import React, { useState,useContext } from 'react';
import Grills from './components/Grile'
import Chapters from './components/Chapters'
import HeaderMenu from './components/Header'
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import {ChapterProvider} from './contexts/TitleContext'
import './style.css'

/*test*/
import TitleList from './contexts/TitleContext'

const client = new ApolloClient({
  uri: 'http://localhost:4000',
});


function App() {
  const [chapID, setChapId] = useState(2);
  const [questionCorrect, setQuestionCorrect] = useState(0);
  const [questionWrong, setQuestionWrong] = useState(0)
   const[cN, setCN] = useState(' ')
  return (
    <React.Fragment>
      <ChapterProvider>
      <HeaderMenu />
      <ApolloProvider client={client}>
        <div>
       {/*button onClick={() => setChapId(4)}>test</button>*/}
        <div id="chapters">
          <div className="chapters-list">
           <Chapters setChapId={setChapId} setCN={setCN} first={0} filter={"unique"} />
           </div>
        </div>
        <div id="questions">
        <Grills chapID={chapID} cN ={cN} questionWrong={questionWrong} setQuestionWrong={setQuestionWrong} setQuestionCorrect={setQuestionCorrect} questionCorrect={questionCorrect}/>
        
        </div>
        </div>
      </ApolloProvider >
      </ChapterProvider>
    </React.Fragment>

  );
}

export default App;

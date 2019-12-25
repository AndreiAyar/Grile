import React, { useState } from 'react';
import Grills from './components/Grile'
import Chapters from './components/Chapters'
import HeaderMenu from './components/Header'
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import './style.css'

/*test*/
import TitleList from './contexts/TitleContext'

const client = new ApolloClient({
  uri: 'http://79.113.100.105:4000',
});


function App() {
  const [chapID, setChapId] = useState(2);

  return (
    <React.Fragment>
      <HeaderMenu />
      <ApolloProvider client={client}>
        <div>
        <button onClick={() => setChapId(4)}>test</button>
         
        <div id="chapters">
           <Chapters setChapId={setChapId} first={0} filter={"unique"} />
        </div>
        <div id="questions">
        <Grills chapID={chapID} />
        </div>
        </div>
      </ApolloProvider >
    </React.Fragment>

  );
}

export default App;

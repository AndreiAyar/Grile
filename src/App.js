import React from 'react';
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
  return (
    <React.Fragment>
      <HeaderMenu />
      <ApolloProvider client={client}>
        <div>
        <div id="chapters">
           <Chapters first={0} filter={"unique"} />
        </div>
        <div id="questions">
          <Grills />
        </div>
        </div>
      </ApolloProvider >
    </React.Fragment>

  );
}

export default App;

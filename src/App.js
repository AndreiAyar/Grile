import React from 'react';
import Grills from './components/Grile'
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
<<<<<<< HEAD
=======
          <Chapters chap={999} first={0} offset={300} />
>>>>>>> parent of 36ef26f... before context
          <Grills />
        </div>
      </ApolloProvider >
    </React.Fragment>

  );
}

export default App;

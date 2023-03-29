import React from 'react';
import Books from './Component/Books';
import AddBooks from './Component/AddBook';
import { ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import './App.css';

const client = new ApolloClient({
    uri: 'http://localhost:3001/graphql',
    cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <p>My Reading list</p>
        </header>
        <div>
          <AddBooks />
          <Books/>
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;

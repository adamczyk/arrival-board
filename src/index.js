import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import App from './modules/app/components/App';
import AppWithQueue from './modules/app/components/AppWithQueue';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

// Used by App
const client = new ApolloClient({
  uri: 'https://api.entur.org/journeyplanner/2.0/index/graphql',
  headers: {
    "ET-Client-Name": "test",
  }
});

ReactDOM.render(
  // <ApolloProvider client={client}>
  //  <App />
  // </ApolloProvider>

  <AppWithQueue />
  , document.getElementById('root'));
registerServiceWorker();

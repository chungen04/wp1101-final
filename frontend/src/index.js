import React from 'react';
import ReactDOM from 'react-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from "@apollo/client";
import {
  setContext
} from '@apollo/client/link/context';
import {split} from "apollo-link";
import {WebSocketLink} from "apollo-link-ws";
import {getMainDefinition} from "apollo-utilities"
import './index.css';
import App from './App'
import reportWebVitals from './reportWebVitals';

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
});

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  options: { reconnect: true },
})

const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const authLink = setContext((_, {
   headers
}) => {
   // get the authentication token from local storage if it exists
   const token = localStorage.getItem('token');
   // return the headers to the context so httpLink can read them
   return {
      headers: {
         ...headers,
         authorization: token ? `Bearer ${token}` : "",
      }
   }
});

const client = new ApolloClient({
   link: authLink.concat(link),
   cache: new InMemoryCache()
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

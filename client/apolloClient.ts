import ApolloClient from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { ApolloLink, concat, split } from "apollo-link";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createUploadLink } from 'apollo-upload-client'
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from 'apollo-utilities'
import { createClient } from "graphql-ws";


const basicApolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  uri
})

const terminatingLink = new HttpLink({
  uri,
  credentials: 'include'
})

const apolloClientWithHeaders = new ApolloClient({
  cache: new InMemoryCache(),
  link: terminatingLink
})

=====================================================

const authLink = new ApolloLink(
  (operation, forward) => {
    const token = localStorage.getItem('token');
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    });
    return forward(operation);
  }
)

const multipleLinksApolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([ authLink, terminatingLink ])
})

====================================================

const uploadLink = createUploadLink({
  credentials: 'include',
  uri
})

const httpLink = ApolloLink.concat(authLink, uploadLink)

const wsLink = new GraphQLWsLink(
  createClient({
    url: `ws://${wsUri}`,
  }),
)

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  httpLink
)

const splitApolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink
})

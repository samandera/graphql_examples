import * as React from 'react'
import * as ReactDOM from 'react-dom'
import apolloClient from '#veewme/web/common/apolloClient'
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks'
import * as React from 'react'
import { ApolloProvider } from 'react-apollo'

const App = () => (
  <Router history={history}>
    <ApolloProvider client={apolloClient}>
      <ApolloHooksProvider client={apolloClient}>
        <Main />
      </ApolloHooksProvider>
    </ApolloProvider>
  </Router>
)

ReactDOM.render(<App />, document.getElementById('app'))

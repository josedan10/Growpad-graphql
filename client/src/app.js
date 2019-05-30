import React from 'react'
import { Provider } from 'react-redux'
import { Router, Switch, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'

// Pages
import Home from './pages/home'
import Dashboard from './pages/dashboard'
import LoginPage from './pages/login'
import SignUpPage from './pages/signUp'

// AuthRoutes Component
import AuthRoute from './components/auth/AuthRoute'

// Redux store
import store from './store'

let history = createBrowserHistory()

import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { ApolloLink } from 'apollo-link'

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        )
      }
      if (networkError) console.log(`[Network error]: ${networkError}`)
    }),
    new HttpLink({
      uri: 'http://localhost:4000/graphql'
      // credentials: 'same-origin'
    })
  ]),
  cache: new InMemoryCache()
})

const App = () => (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={LoginPage} />
          <Route exact path='/signUp' component={SignUpPage} />
          <AuthRoute exact path='/dashboard' component={Dashboard} />
        </Switch>
      </Router>
    </Provider>
  </ApolloProvider>
)

export default App

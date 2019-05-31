import React from 'react'
import { Provider } from 'react-redux'
import { Router, Switch, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'

// Styles
import './scss/index.scss'

// Pages
import Home from './pages/home'
import Dashboard from './pages/dashboard'
import LoginPage from './pages/login'
import SignUpPage from './pages/signUp'

// AuthRoutes Component
import AuthRoute from './components/auth/AuthRoute'
import Loader from './components/Loader'

// Redux store
import store from './store'

import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { ApolloLink } from 'apollo-link'

let history = createBrowserHistory()

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql'
})

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  let token = localStorage.getItem('auth-token')
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : ''
    }
  })

  return forward(operation)
})

const authAfterware = new ApolloLink((operation, forward) => {
  return forward(operation).map(response => {
    const context = operation.getContext()
    const { headers } = context

    if (headers) {
      const refreshToken = headers.authorization.split(' ')[1]
      if (refreshToken) {
        localStorage.setItem('auth-token', refreshToken)
      }
    }

    return response
  })
})

const client = new ApolloClient({
  link: authAfterware.concat(authMiddleware.concat(httpLink)),
  cache: new InMemoryCache()
})

class App extends React.Component {
  render () {
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <Router history={history}>
            <Loader />
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
  }
}

export default App

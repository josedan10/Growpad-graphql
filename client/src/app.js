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
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'

let history = createBrowserHistory()

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql'
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('auth-token')
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
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

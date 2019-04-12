import React from 'react'
import { Provider } from 'react-redux'
import { Router, Switch, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

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

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
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

import React from 'react'
import { Provider } from 'react-redux'
import { Router, Switch, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

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

let history = createBrowserHistory()

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
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

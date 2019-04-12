import React from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

// Pages
import Home from './pages/home'
import Dashboard from './pages/dashboard'

let history = createBrowserHistory()

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})

const App = () => (
  <ApolloProvider client={client}>
    <div>
      <Router history={history}>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/dashboard' component={Dashboard} />
        </Switch>
      </Router>
    </div>
  </ApolloProvider>
)

export default App

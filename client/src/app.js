import React from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'

// Pages
import Home from './pages/home'

let history = createBrowserHistory()

export default () => (
  <div>
    <Router history={history} >
      <Switch>
        <Route exact path='/' component={Home} />
      </Switch>
    </Router>
  </div>
)

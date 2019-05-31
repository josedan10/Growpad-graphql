import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import React from 'react'
import PropTypes from 'prop-types'

const AuthRoute = ({ component: Component, authenticated, ...rest }) => {
  if (!authenticated) {
    return (
      <Route
        {...rest}
        render={props => <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location }
          }}
        />}
      />
    )
  } else {
    return (
      <Route
        {...rest}
        render={props => <Component {...props} />}
      />
    )
  }
}

AuthRoute.propTypes = {
  component: PropTypes.func,
  location: PropTypes.object,
  authenticated: PropTypes.bool
}

const mapStateToProps = (state) => ({
  authenticated: state.authenticated
})

export default connect(mapStateToProps)(AuthRoute)

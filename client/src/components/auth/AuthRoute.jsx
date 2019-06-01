import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import React from 'react'
import PropTypes from 'prop-types'
import { ApolloConsumer } from 'react-apollo'
import gql from 'graphql-tag'

// actions
import { logout } from '../../store/actions/auth'

const CHECK_TOKEN = gql`
  {
    checkToken
  }
`

const AuthRoute = ({ component: Component, authenticated, logout, ...rest }) => {
  // Check token here
  if (!authenticated) {
    // localStorage.removeItem('auth-token')
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
  authenticated: PropTypes.bool,
  location: PropTypes.object,
  logout: PropTypes.func
}

const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated
})

const mapDispatchToProps = (dispatch) => ({
  logout: () => { dispatch(logout()) }
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthRoute)

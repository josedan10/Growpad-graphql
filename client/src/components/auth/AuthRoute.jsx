import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import React from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

// actions
import { logout } from '../../store/actions/auth'

const CHECK_TOKEN = gql`
  {
    checkToken
  }
`

const AuthRoute = ({ component: Component, logout, ...rest }) => {
  // Check token here
  return (
    <Query query={CHECK_TOKEN}>
      {({ loading, error, data }) => {
        if (loading) return 'Loading...'
        if (error) return `Error! ${error.message}`
        let { checkToken } = data

        if (!checkToken) {
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
      }}
    </Query>
  )
}

AuthRoute.propTypes = {
  component: PropTypes.func,
  location: PropTypes.object,
  logout: PropTypes.func
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({
  logout: () => { dispatch(logout()) }
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthRoute)

import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'

// Errors
import { NOT_AUTHENTICATED_ERROR } from '../../errors'

const GET_PROFILE = gql`
  {
    profile {
      username
      email
    }
  }
`

const AuthRoute = ({ component: Component, ...rest }) => {
  return (
    <Query query={GET_PROFILE}>
      {({ loading, error, data }) => {
        if (loading) return 'Loading...'
        if (error) {
          switch (error.message) {
            case NOT_AUTHENTICATED_ERROR:
              // redirect
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

            default:
              console.log(NOT_AUTHENTICATED_ERROR)
              console.log(error.message)
              return `Error! ${error.message}`
          }
        }

        return (
          <Route
            {...rest}
            render={props => <Component {...props} user={data} />}
          />
        )
      }}
    </Query>
  )
}

AuthRoute.propTypes = {
  component: PropTypes.func,
  location: PropTypes.object
}

export default connect()(AuthRoute)

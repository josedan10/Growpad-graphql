import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

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
          console.log(error)
          return `Error! ${error.message}`
        }

        return (
          <Route
            {...rest}
            render={props =>
              error.user.isAuthenticated ? (
                <Component {...props} user={data} />
              ) : (
                <Redirect
                  to={{
                    pathname: '/login',
                    state: { from: props.location }
                  }}
                />
              )
            }
          />
        )
      }}
    </Query>
  )
}

export default connect()(AuthRoute)

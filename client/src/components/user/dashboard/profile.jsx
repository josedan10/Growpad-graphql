import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Query } from 'react-apollo'

// query
import ProfileQuery from '../../../gql/queries/profile.gql'

class Profile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: null
    }
  }

  render () {
    return (
      <Query query={ProfileQuery}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...'
          if (error) return `Error! ${error.message}`

          console.log(data)

          return (
            <h1>Hello {data.profile.username}!</h1>
          )
        }}
      </Query>
    )
  }
}

export default connect()(Profile)

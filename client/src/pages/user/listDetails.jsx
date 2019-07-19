import React, { Component } from 'react'
import { Query } from 'react-apollo'

import ListDetails from '../../components/user/lists/listDetails'

import GET_LIST from '../../gql/queries/listDetails.gql'

export default class ListDetailsPage extends Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }

  render () {
    let { params } = this.props.match

    return (
      <Query query={GET_LIST} variables={{ id: params.id }}>
        {
          ({ data, error, loading }) => {
            if (loading) return 'Loading...'
            if (error) {
              console.log('Error fetching the query.')
              console.log(error)
              return 'Error getting list data'
            }

            if (data) return <ListDetails data={data.getListById} />
          }
        }
      </Query>
    )
  }
}

import React, { Component } from 'react'
import { ApolloConsumer } from 'react-apollo'

import GET_LIST from '../../gql/queries/listDetails.gql'

export default class ListDetails extends Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }

  render () {
    console.log(this.props)

    let { params } = this.props.match

    return (
      <ApolloConsumer>
        {
          client => {
            client.query({
              query: GET_LIST,
              variables: { id: params.id }
            })
              .then(response => console.log(response))
              .catch(error => console.error(error))
          }
        }
      </ApolloConsumer>
    )
  }
}
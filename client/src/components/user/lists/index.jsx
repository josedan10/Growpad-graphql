import React from 'react'
import { ApolloConsumer } from 'react-apollo'
import { connect } from 'react-redux'

import GET_LISTS from '../../../gql/queries/userLists.gql'

import { updateUserLists } from '../../../store/actions/user'

class ListsContainer extends React.Component {
  constructor (props) {
    super(props)
    this.updateLists = this.updateLists.bind(this)
  }

  updateLists (lists) {
    this.props.updateLists(lists)
  }

  render () {
    return (
      <ApolloConsumer>
        {
          client => {
            if (this.props.lists === null) {
              client.query({
                query: GET_LISTS
              })
                .then(response => {
                  this.props.updateUserLists(client)
                })
                .catch(error => {
                  console.log(error)
                })

              return 'Loading lists...'
            } else if (this.props.lists.length > 0) {
              return (
                this.props.lists.map(list => <span key={list._id}>{list.name}</span>)
              )
            } else return 'You don\'t have lists'
          }
        }
      </ApolloConsumer>
    )
  }
}

const mapToStateToProps = (state) => ({
  lists: state.user.lists
})

const mapToDispatchToProps = (dispatch) => ({
  updateUserLists: (lists) => { dispatch(updateUserLists(lists)) }
})

export default connect(mapToStateToProps, mapToDispatchToProps)(ListsContainer)

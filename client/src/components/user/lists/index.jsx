import React from 'react'
import { ApolloConsumer, Mutation } from 'react-apollo'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

import GET_LISTS from '../../../gql/queries/userLists.gql'
import DELETE_LIST from '../../../gql/mutations/deleteList.gql'

import { updateUserLists } from '../../../store/actions/user'

class ListsContainer extends React.Component {
  constructor (props) {
    super(props)
    this.updateLists = this.updateLists.bind(this)
    this.removeList = this.removeList.bind(this)
  }

  removeList (ind) {
    let lists = [...this.props.lists]
    lists.splice(ind, 1)
    
    this.updateLists(lists)
  }

  updateLists (lists) {
    this.props.updateUserLists(lists)
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
                  this.props.updateUserLists(response.data.getLists)
                })
                .catch(error => {
                  console.log(error)
                })

              return 'Loading lists...'
            } else if (this.props.lists.length > 0) {
              return (
                <ul>
                  {this.props.lists.map((list,  idx) => (
                    <ListElement idx={idx} removeList={this.removeList} key={list._id} { ...list } />
                  ))}
                </ul>
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

const ListElement = (props) => {
  let { removeList } = props

  return (
    <Mutation mutation={DELETE_LIST}
    >
      {
        (deleteList, { data, loading }) => {
          return (
            <li>
              <Link className='link-no-decoration link-primary' to={`/user/list/${props._id}`}>{props.title}</Link>
              <FontAwesomeIcon onClick={e => {
                deleteList({ variables: { id: props._id } })
                  .then(response => {
                    removeList(props.idx)
                  })
                  .catch(error =>  console.log(error))
              }} className='c-pointer icon-danger' size='sm' icon={faTimesCircle} />
            </li>
          )
        }
      }
    </Mutation>
  )
}

export default connect(mapToStateToProps, mapToDispatchToProps)(ListsContainer)

import React from 'react'
import { Mutation } from 'react-apollo'
import { connect } from 'react-redux'

// Mutation
import CreateList from '../../../gql/mutations/createList.gql'
import UserLists from '../../../gql/queries/userLists.gql'
import { updateUserLists } from '../../../store/actions/user'

class CreateListModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      title: ''
    }

    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange ({ target }) {
    this.setState(prevState => ({
      ...prevState,
      [target.name]: target.value
    }))
  }

  handleSubmit (createList) {
    let { title } = this.state
    createList({ variables: { title } })
  }

  render () {

    let { openModal } = this.props

    return (
      <Mutation
        mutation={CreateList}
        update={(cache, { data: { createList } }) => {
          const { getLists } = cache.readQuery({ query: UserLists })
          cache.writeQuery({
            query: UserLists,
            data: { getLists: getLists.concat([createList]) }
          })

          console.log(getLists.concat([createList]))

          this.props.updateUserLists(getLists.concat([createList]))
        }}
      >
        {(createList, { data, loading, error }) => {
          let msgError
          if (error) {
            if (error.graphQLErrors.length > 0 && error.graphQLErrors[0] && error.graphQLErrors[0].errors) {
              msgError = (
                <div>
                  <ul>
                    { error.graphQLErrors[0].errors.map((err, index) => (
                      <li key={err + index} className='alert-danger'>{ err.message }</li>
                    ))}
                  </ul>
                </div>
              )
            } else {
              console.log(error)
              msgError = (
                <div>
                  <span className='alert-danger'>{ error.toString() }</span>
                </div>
              )
            }
          }

          return (
            <div style={{
              display: openModal ? 'block' : 'none'
            }}>
              { loading && 'Loading...' }

              { msgError }
              <form
                onSubmit={e => {
                  e.preventDefault()
                  this.handleSubmit(createList)
                }}
              >
                <input
                  type='text'
                  name='title'
                  onChange={this.handleInputChange}
                />
                <button type='submit'>Create list</button>
              </form>
            </div>
          )}
        }
      </Mutation>
    )
  }
}

const MapStateToProps = (props) => ({

})

const MapDispatchToProps = (dispatch) => ({
  updateUserLists: (lists) => { dispatch(updateUserLists(lists)) }
})

export default connect(MapStateToProps, MapDispatchToProps)(CreateListModal)

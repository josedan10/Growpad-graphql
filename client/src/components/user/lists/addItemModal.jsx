import React, { useState } from 'react'
import { Mutation } from 'react-apollo'

import ADD_ITEM_TO_LIST from '../../../gql/mutations/addItemToList.gql'

export default ({ listId, updateList }) => {
  
  const [ name, setName ] = useState('')

  function handleSubmit (mutation, name) {
    mutation({ variables: { name, id: listId } })
      .then(response => updateList(response.data))
      .catch(error => console.log(error.graphQLErrors))
  }

  function inputHandleChange (e) {
    setName(e.target.value)
  }

  return (
    <Mutation mutation={ADD_ITEM_TO_LIST} errorPolicy='all'>
      {
        (addItemToList, { data, error, loading }) => {
          if (loading) return 'Loading...'
          if (error) {
            console.log('Error adding item to list')
            console.log(error)
            return <span className='alert-danger'>{error.networkError.message}</span>
          }

          return (
            <div className='modal show'>
              <form onSubmit={e => {
                e.preventDefault()
                handleSubmit(addItemToList, name)
              }}>
                <label htmlFor="itemName">Item name</label>
                <input type="text" onChange={e => inputHandleChange(e)} />
                <input type="submit" value="Add item"/>
              </form>
            </div>
          )
        }
      }
    </Mutation>
  )
}

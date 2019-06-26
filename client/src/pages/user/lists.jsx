import React from 'react'
import ListsContainer from '../../components/user/lists'

class ListsIndex extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      openModal: false

    }

    this.toggleModal = this.toggleModal.bind(this)
  }

  toggleModal () {
    this.setState(prevState => ({
      ...prevState,
      openModal: !prevState.toggleModal
    }))
  }

  render () {

    return (
      <main className='d-flex flex-center--column'>
        <h1>Your Lists</h1>
        <ListsContainer />
        <button onClick={this.showModal}>Create new list</button>
        
      </main>
    )
  }
}

export default ListsIndex

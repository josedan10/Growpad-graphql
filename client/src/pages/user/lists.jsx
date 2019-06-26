import React from 'react'
import ListsContainer from '../../components/user/lists'
import CreateListModal from '../../components/user/lists/createListModal'

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
        <button className='btn btn-primary' onClick={this.toggleModal}>Create new list</button>
        <CreateListModal openModal={this.state.openModal} />
      </main>
    )
  }
}

export default ListsIndex

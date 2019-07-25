import React, { Component } from 'react'
import moment from 'moment'
import AddItemModal from './addItemModal'

export default class ListDetails extends Component {
  constructor (props) {
    super(props)
    this.state = {
      list: {
        id: props.data._id,
        title: props.data.title,
        items: [...props.data.items],
        tags: [...props.data.tags],
        createdAt: props.data.createdAt,
        updatedAt: props.data.updatedAt
      },
      showAddItemModal: false,
      unsavedChanges: false
    }

    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
    this.removeTag = this.removeTag.bind(this)
    this.addItemToList = this.addItemToList.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  addItemToList (name) {
    this.setState(prevState => ({
      ...prevState,
      items: [...prevState, {}]
    }))
  }

  updateList ({ addItemToList }) {
    this.setState(prevState => ({
      ...prevState,
      list: { ...addItemToList },
      showAddItemModal: false
    }))
  }

  handleCheckboxChange (ind) {
    // This trigger a mutation to update the item in the database

    this.setState(prevState => {
      let newList = [...prevState]
      newList[ind].checked = !prevState[ind].checked

      return {
        ...prevState,
        items: [...newList]
      }
    })
  }

  removeTag (ind) {
    // This trigger a mutation to remove tag from list in the db
    this.setState(prevState => {
      let newTags = prevState.tags.slice(ind, 1)

      return {
        ...prevState,
        tags: [...newTags]
      }
    })
  }

  displayDate (timestamp) {
    let date = moment(timestamp, 'x')
    return date.from(moment())
  }

  render () {
    let { title, items, tags, createdAt, updatedAt, id } = this.state.list
    let { showAddItemModal } = this.state
    let { handleCheckboxChange, removeTag, updateList, displayDate } = this

    return (
      <div>
        <h2>{ title }</h2>
        {/* Implement here moment.js */}
        <small><b>Last update:</b> { displayDate(updatedAt) }</small>
        <hr />
        <ul>
          {
            items.length
              ? items.map((item, ind) => (<li key={item._id}><input type='checkbox' onChange={e => handleCheckboxChange(ind)} checked={item.checked} />{item.name}</li>))
              : 'No items in list'
          }
        </ul>

        <button className='btn btn-primary' onClick={e => this.setState(prevState => ({
          ...prevState,
          showAddItemModal: true
        }))}>Add new item</button>

        <br />

        <h3>Tags</h3>
        <ul>
          {
            tags.length
              ? tags.map((tag, ind) => (
                <li key={tag._id}>{ tag.name } <span onClick={e => removeTag(ind)}>X</span></li>
              ))
              : 'No tags associated to this list'
          }
        </ul>
        { showAddItemModal && <AddItemModal updateList={updateList} listId={id} />}
      </div>
    )
  }
}

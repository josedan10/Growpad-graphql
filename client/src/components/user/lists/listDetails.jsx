import React, { Component } from 'react'

export default class ListDetails extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: props.data.title,
      items: [...props.data.items],
      tags: [...props.data.tags],
      createdAt: props.data.createdAt,
      updatedAt: props.data.updatedAt
    }
  }

  handleCheckboxChange (ind) {
    this.setState(prevState => {
      let newList = [...prevState]
      newList[ind].checked = !prevState[ind].checked

      return {
        ...prevState,
        items: [...newList]
      }
    })
  }

  render () {
    let { title, items, tags, createdAt, updatedAt } = this.state
    let { handleCheckboxChange } = this

    return (
      <div>
        <h2>{ title }</h2>
        <hr />

        <ul>
          {
            items.length 
            ? items.map((item, ind) => (<li key={item._id}><input type='checkbox' onChange={e => handleCheckboxChange(ind)} checked={item.checked} />{item.name}</li>)) :
              'No items in list'
          }
        </ul>
      </div>
    )
  }
}

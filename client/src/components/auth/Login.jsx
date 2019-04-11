import React, { Component } from 'react'

export default class LoginForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      error: null
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange ({ target }) {
    this.setState(prevState => ({
      ...prevState,
      [target.name]: target.value
    }))
  }

  render () {
    let { error } = this.state
    return (
      <form onSubmit={this.handleSubmit}>
        { error && <span>{ error }</span> }

        <div className='input-group'>
          <label htmlFor='username'>Username</label>
          <input type='text' name='username' id='username' />
        </div>
        <div className='input-group'>
          <label htmlFor='password'>Password</label>
          <input type='password' name='password' id='password' />
        </div>
        <input type='submit' value='Login' />
      </form>
    )
  }
}

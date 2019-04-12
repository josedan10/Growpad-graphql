import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import LoginMutation from '../../gql/mutations/login.gql'

export default class LoginForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: ''
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

  handleSubmit (mutation) {
    let { username, password } = this.state
    mutation({ variables: { username, password } })
      .then(this.props.history.push('/dashboard'))
      .catch(error => console.error(error.graphQLErrors))
  }

  render () {
    return (
      <Mutation mutation={LoginMutation} errorPolicy='all'>
        { (login, { loading, error }) => (

          <form onSubmit={e => {
            e.preventDefault()
            this.handleSubmit(login)
          }}>
            { error && <span>{ error.toString() }</span> }

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
        )}
      </Mutation>
    )
  }
}

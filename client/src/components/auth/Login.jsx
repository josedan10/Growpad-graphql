import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import LoginMutation from '../../gql/mutations/login.gql'
import { withRouter } from 'react-router-dom'

class LoginForm extends Component {
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
      .then(response => console.log(response))
      .catch (error => console.error(error.message))
  }

  render () {
    return (
      <Mutation mutation={LoginMutation} errorPolicy='all'>
        { (login, { data, loading, error }) => {
          data && console.log(data)

          let msgError
          if (error) {
            if (error.graphQLErrors[0].errors) {
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
              msgError = (
                <div>
                  <span className='alert-danger'>{ error.graphQLErrors[0].message }</span>
                </div>
              )
            }
          }
          return (

            <form onSubmit={e => {
              e.preventDefault()
              this.handleSubmit(login)
            }}>
              { loading && 'Loading...' }

              { msgError }

              <div className='input-group'>
                <label htmlFor='username'>Username</label>
                <input onChange={this.handleChange} type='text' name='username' id='username' />
              </div>
              <div className='input-group'>
                <label htmlFor='password'>Password</label>
                <input onChange={this.handleChange} type='password' name='password' id='password' />
              </div>
              <input className='btn btn-primary' type='submit' value='Login' />
            </form>
          )
        }}
      </Mutation>
    )
  }
}

export default withRouter(LoginForm)

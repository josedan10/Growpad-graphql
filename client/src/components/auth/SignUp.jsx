import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Mutation } from 'react-apollo'

// Graphql mutation
import signUpMutation from '../../gql/mutations/signUp.gql'

class SignUpForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      firstName: '',
      lastName: '',
      sex: '',
      birthDate: '',
      password: '',
      password_confirmation: ''
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
    mutation({ variables: { input: this.state } })
      .then(this.props.history.push('/login'))
      .catch(error => console.error(error.graphQLErrors))
  }

  render () {
    return (
      <Mutation mutation={signUpMutation} errorPolicy='all'>
        { (signUp, { data, loading, error }) => (
          <div>
            { loading && <span>Enviando...</span> }
            { (error && error.networkError) ? <span className='alert-danger'>Error Network: { error.networkError.message }</span> :
              (error && error.graphQLErrors[0]) ? (
                <div className='errors'>
                  { console.log(error.graphQLErrors[0].message) }
                  <ul>
                    {error.graphQLErrors[0].errors.map((err, index) => (
                      <li key={err + index} className='alert-danger'>{ err.message }</li>
                    ))}
                  </ul>
                </div>
              ) : ''
            }
            <form onSubmit={e => {
              e.preventDefault()
              this.handleSubmit(signUp)
            }}>
              <div className='input-group'>
                <label htmlFor='username'>Username</label>
                <input onChange={this.handleChange} type='text' name='username' id='username' />
              </div>
              <div className='input-group'>
                <label htmlFor='firstName'>First name</label>
                <input onChange={this.handleChange} type='text' name='firstName' id='firstName' />
              </div>
              <div className='input-group'>
                <label htmlFor='lastName'>Last name</label>
                <input onChange={this.handleChange} type='text' name='lastName' id='lastName' />
              </div>
              <div className='input-group'>
                <label htmlFor='email'>Email</label>
                <input onChange={this.handleChange} type='email' name='email' id='email' />
              </div>
              <div className='input-group'>
                <label htmlFor='password'>Password</label>
                <input onChange={this.handleChange} type='password' name='password' id='password' />
              </div>
              <div className='input-group'>
                <label htmlFor='passwordC_cnfirmation'>Confirm your password</label>
                <input onChange={this.handleChange} type='password' name='password_confirmation' id='password_confirmation' />
              </div>
              <div className='input-group'>
                <label htmlFor='birthDate'>Birth date</label>
                <input onChange={this.handleChange} type='date' name='birthDate' id='birthDate' />
              </div>
              <div className='input-group'>
                <label htmlFor='sex'>Sex</label>
                <input onChange={this.handleChange} type='radio' name='sex' value='F' /> Female
                <input onChange={this.handleChange} type='radio' name='sex' value='M' /> Male
              </div>

              <input className='btn btn-primary' type='submit' value='Sign Up' />
            </form>
          </div>
        ) }
      </Mutation>
    )
  }
}

export default withRouter(SignUpForm)

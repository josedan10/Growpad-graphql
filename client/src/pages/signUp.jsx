import React from 'react'
import { Link } from 'react-router-dom'

import SignUpForm from '../components/auth/SignUp'

const SignUpPage = () => (
  <div>
    <h1>Sign Up</h1>
    <SignUpForm />
    <p>You already have an account? <Link to='/login'>Login here</Link></p>
  </div>
)

export default SignUpPage

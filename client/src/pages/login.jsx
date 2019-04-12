/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import { Link } from 'react-router-dom'

import Login from '../components/auth/Login'

const LoginPage = () => (
  <div>
    <h1>Login</h1>
    <Login />
    <p>You don't have an account? <Link to='/signUp'>Register here</Link></p>
  </div>
)

export default LoginPage

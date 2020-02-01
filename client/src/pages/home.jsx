import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => (
  <main className='d-flex flex-around--column'>
    <h1>Welcome to growpad :)</h1>
    <div className='auth-links d-flex flex-around'>
      <Link to='/login' className='link-primary link-no-decoration'>Access to growpad</Link>
      <Link to='/signup' className='link-primary link-no-decoration'>Create a growpad account</Link>
    </div>
  </main>
)

export default Home

import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='body bg-features'>
      <div><img src="/images/uber-logo.png" alt="uber-logo" /></div>
      <div className='getting-started'>
        <h3>Join Our Family</h3>
        <Link to="/signin">Get Started</Link>
      </div>
    </div>
  )
}

export default Home
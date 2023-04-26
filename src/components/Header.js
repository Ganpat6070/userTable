import React from 'react'
import {Link} from 'react-router-dom'

const Header = () => {
  return (
    <div className="App">
    <ul className='d-flex justify-content-start'  style={{ listStyleType: 'none' }}>
      <li className="mx-4 text-decoration-none">
        <Link to="/" className="text-decoration-none">SignUP</Link>
      </li>
      <li className='mx-4 text-decoration-none'>
        <Link to="/signIn" className="text-decoration-none">SignIn</Link>
      </li>
      
    </ul>
</div>
  )
}

export default Header
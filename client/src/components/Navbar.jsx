import React from 'react'
import { Link } from 'react-router-dom'
import { logo } from '../assets/img'

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className="container">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="links">
          <Link to="/?category=art" className='link'><h6>Arts</h6></Link>
          <Link to="/?category=science" className='link'><h6>Science</h6></Link>
          <Link to="/?category=technology" className='link'><h6>Technology</h6></Link>
          <Link to="/?category=cinema" className='link'><h6>Cinema</h6></Link>
          <Link to="/?category=design" className='link'><h6>Design</h6></Link>
          <Link to="/?category=food" className='link'><h6>Food</h6></Link>
          <span>Prince</span>
          <span>Logout</span>
          <span className='write'><Link className='link' to='/write'>Write</Link></span>
        </div>
      </div>
    </div>
  )
}

export default Navbar
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { logo } from '../assets/img'
import { AuthContext } from '../context/authContext'

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);


  return (
    <div className='navbar'>
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
        </div>
        <div className="links">
          <Link to="/?category=art" className='link'><h6>Arts</h6></Link>
          <Link to="/?category=science" className='link'><h6>Science</h6></Link>
          <Link to="/?category=technology" className='link'><h6>Technology</h6></Link>
          <Link to="/?category=cinema" className='link'><h6>Cinema</h6></Link>
          <Link to="/?category=design" className='link'><h6>Design</h6></Link>
          <Link to="/?category=food" className='link'><h6>Food</h6></Link>
          <span>{currentUser?.username}</span>
          {currentUser ? <span onClick={logout}>Logout</span> : <Link className='link' to="/login">Login</Link>}
          <span className='write'><Link className='link' to='/write'>Write</Link></span>
        </div>
      </div>
    </div>
  )
}

export default Navbar
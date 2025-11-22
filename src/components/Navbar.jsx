import { Link } from 'react-router-dom'
import logo from '../assets/eCloset-white-logo.png'

export default function Navbar() {
  return (
    <nav className="navbar">
      <img src={logo} alt="eCloset Logo" className="navbar-logo"/>
      <h1 className="logo">eCloset</h1>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/about">Project Page</Link>
      </div>
    </nav>
  )
}

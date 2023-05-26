import React from 'react'
import {NavLink} from 'react-router-dom'
import './AppBar.css'
import logo from './AppBar.logo.svg'

const AppBar = () => (
  <nav className="AppBar">
    <img className="AppBar-logo" src={logo} aria-label="people" alt="People" />
    <hr />
    <NavLink to="/all">Show all</NavLink>
    <NavLink to="/discover">Discover</NavLink>
    <NavLink to="/add-people">Add people</NavLink>
  </nav>
)

export default AppBar

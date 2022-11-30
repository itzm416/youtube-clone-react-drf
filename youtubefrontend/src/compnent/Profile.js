import React from 'react'
import { NavLink } from 'react-router-dom'
import Account from './Account'

const Profile = () => {
  return (
    <>
    <ul className="nav px-4">
      
      <li className="nav-item pt-4">
        <NavLink to="/userprofile" style={{textDecoration: 'none', color:'#0d6efd'}}>
            account
        </NavLink>
      </li>

      <li className="nav-item pt-4 mx-4">
      <NavLink to="/channel" style={{textDecoration: 'none', color:'gray'}}>
            channel
        </NavLink>
      </li>

      <li className="nav-item pt-4">
      <NavLink to="/videos" style={{textDecoration: 'none', color:'gray'}}>
            videos
        </NavLink>
      </li>
 
    </ul>
    
    

    
    <Account />
    
    </>
  )
}

export default Profile
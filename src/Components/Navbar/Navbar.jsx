import React from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png';
import navProfile from '../../assets/nav-profile.jpg';

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='nav-logo'>
        <img src={logo} alt="Logo" />
        <p>VELENZO</p>
        <p className='subtitle'>Admin Panel</p>
      </div>
      <img src={navProfile} className='nav-profile' alt="Profile" />
    </div>
  );
};

export default Navbar;

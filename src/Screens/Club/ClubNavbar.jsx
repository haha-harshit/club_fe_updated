// ClubNavbar.js

import React, { useState } from 'react';
import '../../Styles/Club Styles/ClubNavbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faCog, faCalendar, faBlog,faBars ,faClose } from '@fortawesome/free-solid-svg-icons';
import ClubLogo from '../../assets/hp.png';
import { Link, useNavigate } from 'react-router-dom';

const ClubNavbar = () => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const navigate = useNavigate();

  return (
    <div className="navbar">
      <div className="logo" onClick={() => navigate('/')}>
        <img style={{ cursor: 'pointer' }} src={ClubLogo} alt="Logo" />
      </div>

      <div className="options">
        <div className="dropdown">
          <button className="dropdown-btn" style={{ background: 'transparent',color:"#fff" }}>
            Category
          </button>
          <div className="dropdown-content">
            <Link to="/club">Club</Link>
            <Link to="/dj">DJ</Link>
            {/* <Link to="/male">Male</Link> */}
          </div>
        </div>

        <div className="icons">
          <div className="icon-wrapper" style={{marginTop:10}} onClick={() => navigate('/club-profile')}>
            <FontAwesomeIcon icon={faUser} />
            {showProfileDropdown && (
              <div className="profile-dropdown">
                <a href="#">My Profile</a>
                <a href="#">My Bookings</a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Toggle Button */}
      <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
        <FontAwesomeIcon icon={showMobileMenu===false ? faBars : faClose} style={{cursor:"pointer",marginRight:10,fontSize:20,color:"#fff"}}  />
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="mobile-menu">
          <Link to="/club" style={{color:"red"}}>Home</Link>
          <Link to="/djlogin">DJ</Link>
          <Link to="/userlogin">User</Link>
          <Link to="/club-profile">My Profile</Link>
        </div>
      )}
    </div>
  );
};

export default ClubNavbar;

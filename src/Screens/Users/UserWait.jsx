// UserWait.js

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch, faCreditCard } from '@fortawesome/free-solid-svg-icons';
import '../../Styles/User Styles/UserWait.css';

 const UserWait = () => {
    return (
    <div className="wait-container">
    <h1 style={{textAlign:"center",marginTop:50}}>Club <span style={{color:"#ff82bf"}}>Nights</span></h1>
      <p className="waiting-text">
        <FontAwesomeIcon style={{color:"#ccc"}} icon={faCreditCard} /> 
        Waiting for Payment...
      </p>
      <p style={{color:"orange",fontSize:12}}>Payment link will sent soon through SMS.</p>
      <div className="blur-circle">
      <div className="loading-icon">
        <FontAwesomeIcon style={{fontSize:35}} icon={faCircleNotch} spin />
      </div>
      </div>
     
    </div>
  );
};

export default UserWait;

// DJOnboard.js

import React from 'react';
import '../../Styles/DJ Styles/DJOnboard.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';

  const DJOnboard = () => {
  const navigate = useNavigate()
   
  return (
    <div className="djOnboard-container">
        <div className='djOnboard-imgbx'>
        <img className='djOnboard-img' src={require('../../assets/hp.png')} alt='img'/>
        </div>
      <div className="djOnboard-card">
        <p style={{color:"#fff"}}>Welcome to DJ Onboard</p>
        <div className="djOnboard-button-container">
          <button onClick={()=>{
           navigate('/djportal');
          }} className="djOnboard-main-button"> <i class="fa-solid fa-up-right-from-square"></i> Open Portal</button>
       
          <button  onClick={()=>{
           navigate('/djhistory');
          }} className="djOnboard-main-button"> <i class="fa-solid fa-clock-rotate-left"></i> History</button>


          

        </div>
      </div>
      <div onClick={()=>{
         navigate('/')
      }} class="dj-onboard-button">CLUB NIGHTS - DJ</div>
      </div>
  );
};

export default DJOnboard;

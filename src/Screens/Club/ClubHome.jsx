// ClubHome.js

import React from 'react';
import '../../Styles/Club Styles/ClubHome.css';
import ClubImg from '../../assets/dj1.png'
import ClubImg2 from '../../assets/djnight.png'
import { useNavigate } from 'react-router-dom';

const ClubHome = () => {
  const navigation = useNavigate();
  return (
    <div className="club-home-container">
      <h2 className='clubnighttitle'>CLUB NIGHTS</h2>
      <div className="clubimg2">
      <img
          src={ClubImg2}
          alt="Club Image"
          className="club-image"
        />
      </div>
      <div className="club-info">
        <img
          src={ClubImg}
          alt="Club Image"
          className="club-image"
        />
        <h1 className="club-description">PLAY THAT SONG</h1>
      </div>
      <div className="club-buttons">
        <button className="button dj-button" onClick={()=>{
          navigation('/djlogin')
        }}>DJ</button>
        <button className="button owner-button" onClick={()=>{
          navigation('/club')
        }}>Club Owner</button>
      </div>
      <div className="club-qr-button">
        <button onClick={()=>{
          navigation('/userlogin')
        }} className="button qr-button"> <i class="fa-solid fa-qrcode"></i> Scan QR/Enter Club ID</button>
      </div>
    </div>
  );
};

export default ClubHome;

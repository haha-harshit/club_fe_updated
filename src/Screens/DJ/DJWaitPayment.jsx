import React, { useEffect } from 'react';
import '../../Styles/Club Styles/ClubWait.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const DJWaitPayment = () => {
  const navigation = useNavigate();
  
  return (
    <div className="club-waiting-container">
      <img style={{width:"300px",height:"40%",cursor:"pointer"}} src={require('../../assets/timer2.png')} alt="Club Image" className="club-image-wait" />
      <h1 className="heading">Please Wait</h1>
      <p className="description">
       Once the Selected Users are Done with Payments. You'll get a Final List of Songs to be Played.
      </p>

      <button onClick={() => {
        window.history.back()
      }} className="custom-btn btn-77"><span><i className="fa-solid fa-arrow-left"></i> Home</span></button>
    </div>
  );
};

export default DJWaitPayment;

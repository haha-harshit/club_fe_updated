import React, { useEffect } from 'react';
import '../../Styles/Club Styles/ClubWait.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const ClubWaitingPage = () => {
  const navigation = useNavigate();
  const clubData = localStorage.getItem('clubData'); // Replace with your actual storage logic

  useEffect(() => {


    const fetchClubData = async () => {

     
   await axios.get(`https://api.clubnights.fun/club/check-verification/${clubData.clubEmail}`)
   .then((response)=>{
    const isVerified = response.data.isVerified;

    // Check if the club is verified
    if (isVerified === true) {
      // Redirect to the dashboard with the clubId
      navigation(`/dashboard/${response.data.clubId}`);
      console.log(isVerified);
    } else {
      toast.warn("Club Verification is Under Process...",{toastId:"under_verification"});
      console.log(isVerified);
    }
   })
   .catch((err)=>{
    console.log("err",err);
   })}
 
    fetchClubData();
  }, [clubData]); // Empty dependency array to ensure the effect runs once when the component mounts

  return (
    <div className="club-waiting-container">
      <img src={require('../../assets/timer.png')} alt="Club Image" className="club-image-wait" />
      <h1 className="heading">Please Wait</h1>
      <p className="description">
        Your club will be verified soon, and you'll get notified.
      </p>

      <button onClick={() => {
        navigation('/club');
      }} className="custom-btn btn-6"><span style={{color:"#000"}} ><i className="fa-solid fa-arrow-left"></i> Home</span></button>
    </div>
  );
};

export default ClubWaitingPage;

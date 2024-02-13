import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa'; // Import the warning icon
import BackButton from '../../Screens/Club/BackButton';

const PaymentFailed = () => {
  const clubNightsStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
   
    color: '#ffcc00',
    marginTop:100,

    fontSize: '2rem',
    marginBottom: '1rem',
  };

  const gifFailedStyle = {
    width: '300px',
    height: '300px',
  };

  const descriptionStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin:20,
    fontSize: '1.5rem',
    marginTop: '2rem',
  };

  const iconStyle = {
    color: '#ff0000',
    fontSize: '5rem',
    marginBottom: '1rem',
  };

  return (
    <div style={{position:"relative",width:"100%",height:"100vh", display:"flex",justifyContent:"center",alignItems:"center", background:"#1b1b1b",flexDirection:"column"}}>
    <BackButton/>
    <div style={clubNightsStyle}>CLUB NIGHTS</div>
    <div>
    <img src={require('../../assets/failed.gif')} alt="Failed" style={gifFailedStyle} />

    </div>
    <div style={descriptionStyle}>
      <FaExclamationTriangle style={iconStyle} />
      <span>Payment failed, please try again later.</span>
    </div>
   
    </div>
  );
};

export default PaymentFailed;
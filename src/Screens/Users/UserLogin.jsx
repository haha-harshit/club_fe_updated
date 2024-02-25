import React, { useState ,useEffect} from 'react';
import '../../Styles/User Styles/Login.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Input } from 'antd';
const UserLogin = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [otpSent, setOtpSent] = useState(false);
  const handleChangePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };
  const handleChangeOtp = (e, index) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value;
    setOtp(newOtp);
  
    if (e.target.value !== '') {
      // Move focus to the next input field
      const nextIndex = index + 1;
      if (nextIndex < otp.length) {
        const nextInput = document.getElementById(`otp-input-${nextIndex}`);
        if (nextInput) {
          nextInput.focus();
        }
      } else {
        // If it's the last input field, you can trigger OTP verification here
      }
    } else {
      // Move focus to the previous input field
      if (index > 0) {
        const prevIndex = index - 1;
        const prevInput = document.getElementById(`otp-input-${prevIndex}`);
        if (prevInput) {
          prevInput.focus();
        }
      }
    }
  };
  
 
  const [sentLoader, setsentLoader] = useState(false);
  const handleSendOtp = async() => {
      setsentLoader(true)
      if(phoneNumber.length ===10){
          
        await axios.post('https://api.clubnights.fun/otp/send-otp-mobile',{to : "+91" + phoneNumber})
        .then((res)=>{
            if(res.data.success === true){
                setOtpSent(true);
                setsentLoader(false)
            }
        })
        .catch((err)=>{
            setsentLoader(false)
            alert("OTP not sent, try again!")
        })       
    
          } 

      else {

       alert("Enter a valid number")
       setsentLoader(false)
       }

        };

        const navigation = useNavigate()
        const [verifyLoader, setverifyLoader] = useState(false);
     const {id} = useParams();
     const handleVerifyOtp = async() => {
        setverifyLoader(true)
         const otpVal = (otp[0]+``+otp[1]+``+otp[2]+``+otp[3]);
         if(otpVal.length === 4){
                     
        await axios.post('https://api.clubnights.fun/otp/verify-otp',{otpMobile : "+91" + phoneNumber,otp:otpVal})
        .then((res)=>{
            if(res.data.status === true){
              Cookies.set('userMobile',phoneNumber)

              toast.success("Login Success", {toastId: "login_success_user"});
              setverifyLoader(false);
              setTimeout(() => {
                navigation(`/opendj/${id}`);
              }, 1000); // Adjust the timeout value as needed
            }
        })
        .catch((err)=>{
            alert("OTP not verified, try again!")
            setverifyLoader(false)

        })       

      
         }
         else{
            alert("Invalid OTP")
            setverifyLoader(false)

         }
      }

  return (
    <>
    <h1 style={{textAlign:"center",marginTop:50,fontWeight:"700",fontSize:22,marginBottom:5}}>Club <span style={{color:"#ff82bf"}}>Nights</span></h1>       

     <div className={'user-login-container'}>
     <div className='userloginImgbx'>
      <img className='userloginImg' src={require('../../assets/club_log.png')} alt="" />
     </div>
      <h2 style={{color:"#ccca97", fontWeight:"bold"}}>User Login</h2>

    
       <p style={{textAlign:"left"}}>Phone Number:</p>
      
      <Input
        type='number'
        style={{color:"#000"}}
        className='userlogininput'
        placeholder="Enter your phone number"
        value={phoneNumber}
        onChange={handleChangePhoneNumber}
      />
      <br />

      {otpSent ? (
        <>
          <label className='userloginlabel'>Enter OTP:</label>
          <div className={'otp-container'}>
            {otp.map((digit, index) => (
              <input
                  style={{color:"#000"}}
                key={index}
                id={`otp-input-${index}`}
                className={'otp-input'}
                maxLength="1"
                type='number'
                value={digit}
                onChange={(e) => handleChangeOtp(e, index)}
              />
            ))}
          </div>
          <button className='userloginverifybutton' onClick={handleVerifyOtp}> {verifyLoader === true ?  <i className="fas fa-spinner fa-spin"></i> : 'Login'}</button>
        </>
      ) : (
        <button className='userloginsentoptbutton' onClick={handleSendOtp}>{sentLoader === true ?  <i className="fas fa-spinner fa-spin"></i> : 'Send OTP'}</button>
      )}
    </div>
    <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
/>
    </>
  );
};

export default UserLogin;
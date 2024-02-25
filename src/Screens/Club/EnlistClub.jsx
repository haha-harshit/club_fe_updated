// EnlistClub.js
import React, { useState } from 'react';
import axios from 'axios';
import '../../Styles/Club Styles/Enlist.css';
import UploadClubImages from './UploadClubImages';
import ClubNavbar from './ClubNavbar';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { Input } from 'antd';
  
const EnlistClub = () => {
  const [clubData, setClubData] = useState({
    clubName: '',
    ownerName: '',
    clubAccountNumber: '',
    clubAccountIFSC: '',
    clubEmail: '',
    clubMobile: '',
    clubImage: '',
    clubUPIID:'',
    password:''
  });
 
  
  const handleChange = (e) => {
    const { name, value } = e.target;
  const maxLength = name === 'clubMobile' ? 10 : Infinity; // Maximum length allowed for clubMobile input
  const maxLengthAcc = name === 'clubAccountNumber' ? 15 : Infinity; // Maximum length allowed for clubMobile input


  let trimmedValue = value;

  // Check if the input exceeds maxLength
  if (value.length > maxLength) {
    // If it exceeds, trim the value
    trimmedValue = value.slice(0, maxLength);
  }
  if (value.length > maxLengthAcc) {
    // If it exceeds, trim the value
    trimmedValue = value.slice(0, maxLengthAcc);
  }
  setClubData({ ...clubData, [name]: trimmedValue });
  };
  const navigate=  useNavigate()

  const handleImageChange = (e) => {
  
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make an Axios request to your server endpoint
      const response = await axios.post('https://api.clubnights.fun/club/addclubs', clubData);
     console.log(response);
      if(response.data.success === false){
      toast.error(response.data.error)
     }
     else if(response.data.success=== true){
      localStorage.setItem('clubData', JSON.stringify(clubData));
      toast.success("Congrats🎉 Club Enlisted!");

      navigate('/verifying-club')
     }
      // Handle success or redirect to a success page
    } catch (error) {
      console.error('Error enlisting club:', error);
      // Handle error or show an error message
    }
  };
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  return (
    <>
    
    <ClubNavbar/>
    
    <div className="enlist-club-container">
      <form onSubmit={handleSubmit}>
        {/* Add form fields for each club data property */}
        <label>
          Club Name:
          <Input className='inputStyleClub' type="text" name="clubName" value={clubData.clubName} onChange={handleChange} required />
        </label>

        <label>
        Owner Name:
          <Input className='inputStyleClub'  type="text" name="ownerName" value={clubData.ownerName} onChange={handleChange} required />
        </label>
    
        <label>
        Club Email:
          <Input className='inputStyleClub'  type="email" name="clubEmail" value={clubData.clubEmail} onChange={handleChange} required />
        </label>

        <label>
        Password <span style={{ fontSize: 12 }}>(8 - characters)</span>:
        <div className="password-input-container">
          <Input
             minLength={'8'}
             maxLength={'8'}
            className="inputStyleClub"
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={clubData.password}
            onChange={handleChange}
            required
          />
          <i
            className={`password-toggle-icon ${showPassword ? 'visible' : 'hidden'}`}
            onClick={togglePasswordVisibility}
          >
            {!showPassword ? <i class="fa-solid fa-eye" style={{color:"#fff",fontSize:16,cursor:"pointer",marginLeft:5}}></i> : <i style={{color:"#fff",fontSize:16,cursor:"pointer",marginLeft:5}} class="fa-solid fa-eye-slash"></i>}
          </i>
        </div>
      </label>
       


        <label>
        Club Mobile:
          <Input  className='inputStyleClub'  type="number" name="clubMobile" value={clubData.clubMobile} onChange={handleChange} required />
        </label>

        <label>
        Club UPI ID: (optional)
          <Input className='inputStyleClub'  type="text" name="clubUPIID" value={clubData.clubUPIID} onChange={handleChange}  />
        </label>

        
        <label>
        Account Number:
          <Input className='inputStyleClub'  type="text" name="clubAccountNumber" value={clubData.clubAccountNumber} onChange={handleChange} required />
        </label>

        <label>
        Account IFSC Code:
          <Input className='inputStyleClub'  type="text" name="clubAccountIFSC" value={clubData.clubAccountIFSC} onChange={handleChange} required />
        </label>

        
        
        {/* <label style={{width:"100%",display:"flex",flexDirection:"row",marginTop:10}}>
          Club Image:
         <div style={{marginLeft:"2%"}}>
         <UploadClubImages/>
         </div>
        </label> */}

        <button style={{width:"90%",marginLeft:"5%",marginBottom:"5%"}} type="submit">Enlist Club</button>
      </form>
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
theme="dark"
/>
    </>

  );
};

export default EnlistClub;

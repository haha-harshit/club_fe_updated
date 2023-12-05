// DJLogin.js

import React, { useState } from 'react';
import '../../Styles/DJ Styles/DJLogin.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DJLogin = () => {
  const navigate = useNavigate();
  const [djId, setDjId] = useState('');
  const [password, setPassword] = useState('');
   const [djData, setdjData] = useState({
    DjName:'',
    statusLive:'',
    DJId : ''
   });
  const handleLogin =async (e) => {
      e.preventDefault();
       await axios.post('http://localhost:5000/dj/login',{DjNumber:djId,Djpassword:password})
       .then((res)=>{
              if(res.data.success === true ){
                alert('Login succeess!');
                const { _id, DjName, statusLive } = res.data;
                setdjData({  _id,DjName, statusLive });
        
                // Save DJ data to localStorage
                localStorage.setItem('djData', JSON.stringify({ _id, DjName }));
                   navigate('/djonboard')
              }
              
              else if(res.data.success ===false){
                alert(res.data.error);
              }
              else{
                alert("Try after sometimes!")
              }
        
       })
       .catch((err)=>{
        // console.log(err);
       })

    console.log('Logging in with DJID:', djId, 'and Password:', password);
  };

  return (

    <div style={{width:"100%",height:"100vh",display:"flex",justifyContent:"center",alignItems:"center",}}>
    <div className="djlogin-container">
      <div className="firstboxdjlogin">
        <div className='djimgboy'>
        <img src={require('../../assets/dj.png')} alt='img-dj'/>

        </div>

     <p>Welcome to <span style={{color:"#df3b3b",fontSize:20}}>Club Nights</span> </p>
     
      </div>
      <div className="secondboxdjlogin">

         <div className='djimgcard'>
        <img src={require('../../assets/djlogo.png')} alt='img-dj'/>
        </div>

      <h2 className='djlogintitle'>DJ Login</h2>
      <form className='djloginform' onSubmit={handleLogin}>
        <div className="dj-login-input-container">
          <label className='labeldjlogin' htmlFor="djId">DJID:</label>
          <input
                    className='djloginInputs'
            placeholder='Enter DJ ID'
            type="text"
            id="djId"
            value={djId}
            onChange={(e) => setDjId(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <label className='labeldjlogin' htmlFor="password">Pass:</label>
          <input
          placeholder='Enter Password here...'
          className='djloginInputs'
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        
        <button class="custom-btn btn-5" type='submit'><span>Login </span></button>
        
              </form>
      </div>
    
    </div>
    </div>
  );
};

export default DJLogin;

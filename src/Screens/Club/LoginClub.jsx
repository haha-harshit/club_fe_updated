import React, { useState } from 'react';
import axios from 'axios';
import '../../Styles/Club Styles/LoginClub.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const LoginClub = () => {
  const [credentials, setCredentials] = useState({
    clubIdOrEmail: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };
 const navigate = useNavigate()
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Make a request to your API endpoint for login
      const response = await axios.post('http://localhost:5000/club/login', credentials);

       if(response.data.success === true){
        localStorage.setItem('clubData', JSON.stringify(response.data.club));
        toast.success("Login success!");
        navigate(`/dashboard`)
       }    
       else{
        toast.warn(response.data.message)
       }
    } catch (error) {
      // Handle login error
      console.error('Login failed!', error.response ? error.response.data : error.message);
    }
  };

  return (
    <>
    <div className='clublogincontainer'>
        <div className="clubloginImageBox">
            <img className='clubloginImg' src={require('../../assets/login.png')} alt='login'/>
        </div>
      <h2 style={{textAlign:"center"}}>Club Login</h2>
      <form onSubmit={handleLogin}>
        <label>
          Club ID or Email:
          <input
            type="text"
            name="clubIdOrEmail"
            value={credentials.clubIdOrEmail}
            onChange={handleChange}
            className='clublogininput'
          />
        </label>
        <br />
        <label>
          Password :    
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            className='clublogininput'

          />
        </label>
        <br />
        <a style={{fontSize:12,color:"red",marginLeft:"10%"}} href="/resetclubpassword">Reset Password</a>
        <button class="custom-btn btn-9">Login</button>
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

export default LoginClub;

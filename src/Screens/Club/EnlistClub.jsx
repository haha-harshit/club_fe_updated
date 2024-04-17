// EnlistClub.js
import React, { useState } from 'react';
import axios from 'axios';
import '../../Styles/Club Styles/Enlist.css';
import UploadClubImages from './UploadClubImages';
import ClubNavbar from './ClubNavbar';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { Form, Input, InputNumber, Button } from 'antd';
// import { Input } from 'antd';

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};


const EnlistClub = () => {

  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

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
 
  
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  // const maxLength = name === 'clubMobile' ? 10 : Infinity; // Maximum length allowed for clubMobile input
  // const maxLengthAcc = name === 'clubAccountNumber' ? 15 : Infinity; // Maximum length allowed for clubMobile input


  // let trimmedValue = value;

  // // Check if the input exceeds maxLength
  // if (value.length > maxLength) {
  //   // If it exceeds, trim the value
  //   trimmedValue = value.slice(0, maxLength);
  // }
  // if (value.length > maxLengthAcc) {
  //   // If it exceeds, trim the value
  //   trimmedValue = value.slice(0, maxLengthAcc);
  // }
  // setClubData({ ...clubData, [name]: trimmedValue });
  // };
  const navigate=  useNavigate()

  const handleImageChange = (e) => {
  
  };

  const handleSubmit = async (values) => {
    console.log(values)
    try {
      // Make an Axios request to your server endpoint
      const response = await axios.post('https://api.clubnights.fun/club/addclubs', values);
      console.log(response);
      if(response.data.success === false){
      toast.error(response.data.error)
     }
     else if(response.data.success=== true){
      localStorage.setItem('clubData', JSON.stringify(values));
      toast.success("Congrats🎉 Club Enlisted!");

      navigate('/verifying-club')
     }
      // Handle success or redirect to a success page
    } catch (error) {
      console.error('Error enlisting club:', error);
      toast.error("failed")
      // Handle error or show an error message
    }
  };
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  // password rules
  const passwordRules = [
    {
      required: true,
      message: 'Please input your password!',
    },
    {
      min: 8,
      message: 'Password must be at least 8 characters long!',
    },
    {
      pattern: new RegExp('^(?=.*[a-z])'),
      message: 'Password must contain at least one lowercase letter!',
    },
    {
      pattern: new RegExp('^(?=.*[A-Z])'),
      message: 'Password must contain at least one uppercase letter!',
    },
    {
      pattern: new RegExp('^(?=.*[0-9])'),
      message: 'Password must contain at least one number!',
    },
    {
      pattern: new RegExp('^(?=.*[!@#$%^&*])'),
      message: 'Password must contain at least one special character (e.g. !@#$%^&*)!',
    },
  ];

  return (
    <>
    
    <ClubNavbar/>
    
    <div className="enlist-club-container">
      <Form
      layout='vertical'
      {...formItemLayout}
      form={form}
      label="true"
      name='enlist-form'
      onFinish={handleSubmit}
      onFinishFailed={onFinishFailed}
      scrollToFirstError
      // onSubmit={handleSubmit}
      >
        <div className='enlist-fields-container' style={{margin:""}}>
        {/* Club name input field */}
        <Form.Item
        style={{colorAdjust: "#1677ff"}}
        label={<label style={{ color: "whitesmoke" }}>Club name:</label>}
        name="clubName"
        rules={[{required: true, message: 'Empty club name'}]}
        // onChange={handleChange}
        >
          
          <Input className=''/>
          
        </Form.Item>

        {/* Owner name input field */}
        <Form.Item
        label={<label style={{ color: "whitesmoke" }}>Owner name:</label>}
        name="ownerName"
        rules={[{required: true, message: 'Empty owner name'}]}
        // onChange={handleChange}
        >
          {/* <Input className='' onChange={handleChange}/> */}
          <Input className=''/>
        </Form.Item>

        {/* Club email input field */}
        <Form.Item
        name="clubEmail"
        label={<label style={{ color: "whitesmoke" }}>Club E-mail:</label>}
        rules={[{required: true, message: 'Please provide E-mail'}, {type:"email", message:"E-mail not valid"}]}
        // onChange={handleChange}
        >
          <Input />
        </Form.Item>

        <Form.Item
        name="password"
        label={<label style={{ color: "whitesmoke" }}>Password:</label>}
        rules={passwordRules}
        hasFeedback
      >
        <div className="password-input-container"><Input.Password /></div>
        </Form.Item>

        <Form.Item
          name="confirm"
          label={<label style={{ color: "whitesmoke" }}>Confirm password:</label>}
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The new password that you entered do not match!'));
              },
            }),
          ]}
        >
          <div className="password-input-container"><Input.Password className="" /></div>
          
        </Form.Item>

        <Form.Item
          name="clubMobile"
          label={<label style={{ color: "whitesmoke" }}>Club mobile:</label>}
          rules={[{ required: true, message: 'Please input your phone number!' }]}
        >
          <Input className='' minLength={'10'} value={clubData.clubMobile}/>
        </Form.Item>

        <Form.Item
          name="clubUPIID"
          label={<label style={{ color: "whitesmoke" }}>Club UPI(optional):</label>}
          rules={[{ required: true, message: 'Please input your UPI Id!' }]}
        >
          <Input className='' value={clubData.clubUPIID}/>
        </Form.Item>

        <Form.Item
          name="clubAccountNumber"
          label={<label style={{ color: "whitesmoke" }}>Account number:</label>}
          rules={[{ required: true, message: 'Please input your Account number!' }]}
        >
          <Input className='' value={clubData.clubAccountNumber}/>
        </Form.Item>

        <Form.Item
          name="clubAccountIFSC"
          label={<label style={{ color: "whitesmoke" }}>Account IFSC code:</label>}
          rules={[{ required: true, message: 'Please input your Account number!' }]}
        >
          <Input className='' value={clubData.clubAccountIFSC}/>
        </Form.Item>
        </div>
        <Button type='primary' htmlType='submit'>Request to Enlist Club</Button>
        {/* <button style={{width:"90%",marginLeft:"5%",marginBottom:"5%"}} type="submit">Enlist Club</button> */}

      </Form>



      {/* <form onSubmit={handleSubmit}> */}
        {/* Add form fields for each club data property */}
        {/* <label>
          Club Name:
          <Input className='inputStyleClub' type="text" name="clubName" value={clubData.clubName} onChange={handleChange} required />
        </label>

        <label>
          Owner Name:
          <Input className='inputStyleClub'  type="text" name="ownerName" value={clubData.ownerName} onChange={handleChange} required />
        </label> */}
    
        {/* <Form.Item
        
        colon="true"
        label="Club E-mail:"
        name="clubEmail"
        className=''
        rules={[{required: true, message: 'Please provide E-mail'}, {type:"email", message:"E-mail not valid"}]}
        onChange={handleChange}
        >
          <Input className='inputStyleClub' value={clubData.clubEmail} onChange={handleChange}/>
        </Form.Item> */}
        
        {/* <label>
          Club Email:
          <Input className='inputStyleClub'  type="email" name="clubEmail" value={clubData.clubEmail} onChange={handleChange} required />
        </label>

        <label>
          Password <span style={{ fontSize: 12 }}>(8 - characters)</span>:
          <div className="password-input-container">
            <Input
              minLength={'8'}
              //  maxLength={'8'} //no need of max password
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
          <Input minLength={'10'} className='inputStyleClub' type="number" name="clubMobile" value={clubData.clubMobile} onChange={handleChange} required />
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
        </label> */}

        
        
        {/* <label style={{width:"100%",display:"flex",flexDirection:"row",marginTop:10}}>
          Club Image:
         <div style={{marginLeft:"2%"}}>
         <UploadClubImages/>
         </div>
        </label> */}

        {/* <button style={{width:"90%",marginLeft:"5%",marginBottom:"5%"}} type="submit">Enlist Club</button> */}
      {/* </form> */}
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

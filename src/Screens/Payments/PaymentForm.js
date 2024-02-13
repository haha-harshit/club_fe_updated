import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useParams } from 'react-router-dom';
import '../../Styles/User Styles/Home.css';
import Cookies from 'js-cookie';

const PaymentForm = () => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [number, setNumber] = useState('');
  const location = useLocation();
  const priceOfSongs = location.state?.priceOfSongs || '';
  const userMobileNumber = location.state?.userMobile || '';
  const SongReqList = location.state?.SongReqList || '';
  const [transactionId, setTransactionId] = useState();
  const params = useParams();
  const djId = params.djId;
  useEffect(() => {
    
    setAmount(priceOfSongs);
    setNumber(userMobileNumber);
    const generatedTransactionId = "TID1" + userMobileNumber + Date.now();
    setTransactionId(generatedTransactionId);
  }, [priceOfSongs, userMobileNumber,transactionId]);


  const userMobile =Cookies.get('userMobile')
  const handlePayment = async () => {
    try {
      //const TID = "TID1"  + number + Date.now();
      const MUID = "MUID" + number + Date.now()
      const response = await axios.post(
        'http://localhost:5000/pay/payment',
        {
          transactionId: transactionId,
          MUID: MUID,
          name,
          amount,
          number,
          djId,
          SongReqList

          
        }
      );
      console.log("payment successfull")
      console.log("TID",transactionId)
      console.log("MUID",MUID)
      console.log("Dj id", djId );
      console.log("Req list", SongReqList );
      console.log(response.data.redirectTo)
       window.location.href = response.data.redirectTo; // Redirect to the payment page
    } catch (error) {
      console.log("error in payment")
      console.error(error);
      // Handle error
    }
  };

  const checkTransactionStatus = async () => {
    try {
      console.log("transition id", transactionId);
      const response = await axios.post(
        //`http://localhost:5000/api/status/TID1`
        `http://localhost:5000/pay/status/${transactionId}`
      );

      if (response.data.success) {
        console.log('Payment successful');
        // Redirect or show success message
      } else {
        console.log('Payment failed');
        // Redirect or show failure message
      }
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  return (
    <div className="userhome-container ">
      <h1 style={{textAlign:"center",marginTop:50}}>Payment Form</h1>
      <div class="circle1"></div>
       <div class="circle2"></div>
      <div className="userhome-form card">
      <div >
        <label  className="userhome-label">Name:</label>
        <input
        className="userhome-input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label className="userhome-label">Amount:</label>
        <input
        className="userhome-input"
          type="text"
          value={amount}
          disabled
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div>
        <label className="userhome-label">Mobile Number:</label>
        <input
        className="userhome-input"
          type="text"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
      </div>
      <button style={{ marginLeft: "20px" }} onClick={handlePayment}>
        Make Payment
      </button>
      <button style={{ marginLeft: "20px" }} onClick={checkTransactionStatus}>
        Check Status
      </button>
      </div>
    </div>
  );
};

export default PaymentForm;

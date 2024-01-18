import React, { useState } from 'react';
import axios from 'axios';

const PaymentForm = () => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [number, setNumber] = useState('');

  const handlePayment = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/pay/payment',
        {
          transactionId : "TID1",
          MUID: "MUID"+Date.now, // Replace with your actual merchant user ID
          name,
          amount,
          number,
        }
      );

      window.location.href = response.data; // Redirect to the payment page
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  const checkTransactionStatus = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/status/TID1`
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
    <div>
      <h1>Payment Form</h1>
   
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Amount:</label>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div>
        <label>Mobile Number:</label>
        <input
          type="text"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
      </div>
      <button style={{marginLeft:"20px"}} onClick={handlePayment}>Make Payment</button>
      <button style={{marginLeft:"20px"}} onClick={checkTransactionStatus}>Check Status</button>
    </div>
  );
};

export default PaymentForm;

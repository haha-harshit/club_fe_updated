import React, { useState, useEffect } from 'react';
import './PaymentModal.css'; // Create a CSS file for styling
import axios from 'axios';

const PaymentModal = ({ show, handleClose, name, amount, mobileNumber, djId }) => {
  const [loading, setLoading] = useState(true);
  const [paymentLink, setPaymentLink] = useState(null);
  const [timer, setTimer] = useState(0);
  const [showPaymentButton, setShowPaymentButton] = useState(false);

  useEffect(() => {
    const fetchPaymentLink = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/waitpay/payment-waiting/${djId}/${mobileNumber}`);
        if (response.data.userSongReqList.length > 0) {
          const paymentInfo = response.data.userSongReqList[0];
          const currentTime = Date.now();
          if (currentTime < response.data.date) {
            setPaymentLink(prevPaymentLink => paymentInfo.paymentWaitingLink !== prevPaymentLink ? paymentInfo.paymentWaitingLink : prevPaymentLink);
            setShowPaymentButton(true);
            const timeDifference = Math.max(0, Math.floor((response.data.date - currentTime) / 1000));
            setTimer(timeDifference);
            
          } else {
            setShowPaymentButton(false);
          }
        } else {
          console.log('No payment info found');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching payment link:', error);
      }
    };

    fetchPaymentLink();

    // Cleanup function to clear timeout on unmount
    return () => clearTimeout();
  }, [djId, mobileNumber]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  const handlePayment = () => {
    window.location.href = paymentLink;
  };

  return (
    <div className={`payment-modal ${show ? 'show' : ''}`}>
      <div className="modal-content">
        <div className="modal-body">
          <div className="image-container">
            <img src={require('../../assets/pay.png')} alt="Payment Image" />
          </div>
          <h2>Unlock Songs</h2>
          <p>Please make a payment to play songs.</p>
          <p style={{ color: "#ccc", fontSize: 12 }}>A payment link has been sent to your mobile number.</p>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              {paymentLink && <div className="timer">Time Left: {formatTime(timer)}</div>}
              <button style={{ marginTop: 40 }} onClick={handlePayment} disabled={!paymentLink || loading}>
                {loading ? <i className="fas fa-spinner fa-spin"></i> : 'Make Payment'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;

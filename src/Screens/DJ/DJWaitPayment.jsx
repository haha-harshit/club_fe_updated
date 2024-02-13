import React, { useEffect, useState } from 'react';
import '../../Styles/Club Styles/ClubWait.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DJWaitPayment = () => {
  const navigation = useNavigate();
  const { id } = useParams();
  const [timer, setTimer] = useState(0);
  const [endTiming, setEndTiming] = useState(null);

  const updateDJStatus = async () => {
    await axios
      .put(`http://localhost:5000/dj/updateStatus/${id}`, { statusLive: false })
      .then((res) => {
        // log res
      })
      .catch((err) => {
        // log err
      });
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/waitpay/get-payment-timings/${id}`);
      const { paymentWaitingEndTiming } = response.data;

      // Set endTiming and calculate timer based on paymentWaitingEndTiming
      setEndTiming(new Date(parseInt(paymentWaitingEndTiming, 10))); // Convert to milliseconds
      const currentTime = new Date();
      const timeDifference = Math.max(0, Math.floor((parseInt(paymentWaitingEndTiming, 10) - currentTime.getTime()) / 1000));
      setTimer(timeDifference);
    } catch (error) {
      // Handle error
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]); // Fetch data on component mount

  useEffect(() => {
    if (endTiming && timer === 0) {
      // Timer expired, navigate to another screen
      updateDJStatus();
      // Show modal here
      navigation(`/djacceptedsongs/${id}`);
    }
  }, [timer, endTiming]);

  useEffect(() => {
    // If endTiming is set, start the countdown
    if (endTiming) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => Math.max(0, prevTimer - 1));
      }, 1000);

      return () => clearInterval(countdown);
    }
  }, [endTiming]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  return (
    <div className="club-waiting-container">
      <h1 style={{textAlign:"left",fontWeight:"500"}}>Club <span style={{color:"#ff82bf"}}>Nights</span></h1>       
      <img
        style={{ width: '200px', height: '32%', cursor: 'pointer' }}
        src={require('../../assets/timer2.png')}
        alt="Club Image"
        className="club-image-wait"
      />
      <h1 className="heading">Please Wait</h1>
      <p className="description">
        Once the Selected Users are Done with Payments. You'll get a Final List of Songs to be Played.
      </p>
      <p className="timer">Time remaining: {formatTime(timer)}</p>
      <button
        onClick={() => {
          window.history.back();
        }}
        style={{color:"#fff"}}
        className="custom-btn btn-77"
      >
        Back
      </button>
    </div>
  );
};

export default DJWaitPayment;

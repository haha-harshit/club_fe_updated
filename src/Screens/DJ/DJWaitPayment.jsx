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
      .put(`https://api.clubnights.fun/dj/updateStatus/${id}`, { statusLive: false })
      .then((res) => {
        // log res
      })
      .catch((err) => {
        // log err
      });
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://api.clubnights.fun/waitpay/get-payment-timings/${id}`);
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
 const [showBtn, setshowBtn] = useState(false);
  useEffect(() => {
    fetchData();
  }, [id]);
  useEffect(() => {
    if (endTiming && timer === 0) {
      // Timer expired, navigate to another screen
      updateDJStatus();
      setshowBtn(true);
      navigation(`/djacceptedsongs/${id}`)
   
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
    
      {
      showBtn=== true ?
    <button
        onClick={() => {
      
          navigation(`/djacceptedsongs/${id}`);

        }}
        style={{color:"#fff"}}
        className="custom-btn btn-77"
      >
        See Lists
      </button>
      :''
     }


    </div>
  );
};

export default DJWaitPayment;
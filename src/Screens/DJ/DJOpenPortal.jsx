import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../Styles/DJ Styles/DJPortal.css';
import BackButton from '../../Components/BackButton';
import { useNavigate } from 'react-router-dom';

const DJOpenPortal = () => {
  const [numberOfSongs, setNumberOfSongs] = useState('');
  const [minimumPrice, setMinimumPrice] = useState('');
  const [portalOpenMinutes, setPortalOpenMinutes] = useState(10); // Default to 10 minutes
  const [djData, setdjData] = useState({});
  const [formattedDate, setFormattedDate] = useState('');

  var today = new Date();

  // Get the current date components
  var year = today.getFullYear();
  var month = today.getMonth() + 1; // Months are zero-based, so add 1
  var day = today.getDate();

  // Format the date as a string (optional)
  useEffect(() => {
    const djDataString = localStorage.getItem('djData');

    if (djDataString) {
      const djData = JSON.parse(djDataString);
      setdjData(djData);
    } else {
      // console.log('No data found in localStorage for key "djData".');
    }

    setFormattedDate(`${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`);
  }, []);

  const navigate = useNavigate();
  const handleOpenPortal = async (e) => {
    e.preventDefault();

    // Calculate the portal end time
    const portalEndTime = new Date(today.getTime() + portalOpenMinutes * 60000); // Assuming portalOpenMinutes is in minutes

    // Add 5 hours and 30 minutes to portalEndTime
    portalEndTime.setTime(portalEndTime.getTime() + 5 * 60 * 60 * 1000 + 30 * 60 * 1000);
        // Format the portal end time in the specified format "2023-12-05T12:00"
    const formattedPortalEndTime =
      portalEndTime.toISOString().slice(0, 16);

    // Make Axios POST request
    try {
      const response = await axios.post('http://localhost:5000/djportal/start', {
        DJId: djData._id,
        DJPortalStartTimeing: Date.now(),
        TotalSongs: numberOfSongs,
        price: minimumPrice,
        DJPortalEndTiming: formattedPortalEndTime,
      });

      alert('Portal opened!');
      navigate('/djsongs');

      console.log(response.data);
      // Add any additional handling after a successful POST
    } catch (error) {
      console.error('Error making POST request:', error);
      // Handle error
    }
  };

  return (
    <div className='djOpenPortal-container'>
      <BackButton />
      <div className='djOpenPortal-header'>
        <div>
          <h2>DJ Portal</h2>
        </div>
        <button>Home</button>
      </div>

      <div>
        <form onSubmit={handleOpenPortal}>
          <div>
            <p>No. of Songs</p>
            <input
              type='number'
              className='djOpenPortal-input'
              value={numberOfSongs}
              onChange={(e) => setNumberOfSongs(e.target.value)}
            />
          </div>
          <div>
            <p>Minimum Price (in Rupee ₹)</p>
            <input
              type='number'
              className='djOpenPortal-input'
              value={minimumPrice}
              onChange={(e) => setMinimumPrice(e.target.value)}
            />
          </div>

          <div>
            <p>Portal is OPEN for (minutes)</p>
            <input
              type='number'
              className='djOpenPortal-input'
              value={portalOpenMinutes}
              onChange={(e) => setPortalOpenMinutes(e.target.value)}
            />
          </div>

          <button type='submit' className='djOpenPortal-open-button'>
            Open Portal
          </button>
        </form>
      </div>
    </div>
  );
};

export default DJOpenPortal;

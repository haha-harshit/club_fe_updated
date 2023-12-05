import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import '../../Styles/DJ Styles/DJPortal.css';
import BackButton from '../../Components/BackButton';
import { useNavigate } from 'react-router-dom';

const DJOpenPortal = () => {
  const [numberOfSongs, setNumberOfSongs] = useState('');
  const [minimumPrice, setMinimumPrice] = useState('');
  const [portalOpenTime, setPortalOpenTime] = useState('12:00');
  const [djData, setdjData] = useState({});
  
  var today = new Date();

  // Get the current date components
  var year = today.getFullYear();
  var month = today.getMonth() + 1; // Months are zero-based, so add 1
  var day = today.getDate();
  
  // Format the date as a string (optional)
  var formattedDate = year + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day;
  
  useEffect(() => {
const djDataString = localStorage.getItem('djData');

if (djDataString) {
  const djData = JSON.parse(djDataString);
   setdjData(djData);
   
  
} else {
  // console.log('No data found in localStorage for key "djData".');
}

  }, []);
  const handleTimeChange = (e) => {
    setPortalOpenTime(e.target.value);
  };

  console.log(djData);
  const navigate = useNavigate()
  const handleOpenPortal = async (e) => {


    e.preventDefault();
      console.log( numberOfSongs,
        minimumPrice,
        format12HourTime(portalOpenTime),);
    // Make Axios POST request
    try {
      const response = await axios.post('http://localhost:5000/djportal/start', {
        
          DJId: djData._id,
          DJPortalStartTimeing: Date.now(),
          TotalSongs:numberOfSongs ,
          price: minimumPrice,
          DJPortalEndTiming: formattedDate+"T"+portalOpenTime,
        
        
      
      });
      alert("Portal opened!");
      navigate('/djsongs')

      console.log(response.data);
      // Add any additional handling after successful POST
    } catch (error) {
      console.error('Error making POST request:', error);
      // Handle error
    }
  };

  const format12HourTime = (time) => {
    const [hours, minutes] = time.split(':');
    let formattedHours = parseInt(hours, 10);
    const ampm = formattedHours >= 12 ? 'PM' : 'AM';
    formattedHours = formattedHours % 12 || 12;
    return `${formattedHours}:${minutes} ${ampm}`;
  };
// console.log(formattedDate+"T"+portalOpenTime);
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
            <p>Portal is OPEN for</p>
            <input
              type='time'
              className='djOpenPortal-input'
              value={portalOpenTime}
              onChange={handleTimeChange}
            />
            <p>Chosen Time: {format12HourTime(portalOpenTime)}</p>
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

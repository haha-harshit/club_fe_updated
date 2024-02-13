// DJEarnings.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../Styles/DJ Styles/DJEarning.css'
import BackButton from '../../Components/BackButton';
import { animated,useSpring } from '@react-spring/web'
import { useNavigate } from 'react-router-dom';

const DJEarnings = () => {
  const [earningsData, setEarningsData] = useState([]);

  useEffect(() => {
    window.document.title = 'Club Nights - Earnings'
    // Fetch data using Axios
    axios.get('http://localhost:5000/djportal/getall')
      .then(response => {
        setEarningsData(response.data.reverse());
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array means this effect runs once when the component mounts
  function formatDateTime(dateTimeString) {
    // Parse the input date string
    const dateTime = new Date(dateTimeString);
  
    // Extract date components
    const day = dateTime.getDate();
    const month = dateTime.getMonth() + 1; // Month is zero-based
    const year = dateTime.getFullYear();
  
    // Format date in dd/mm/yyyy format
    const formattedDate = `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}/${year}`;
  
    // Extract time components
    let hours = dateTime.getHours();
    let minutes = dateTime.getMinutes();
  
    // Determine AM or PM
    const period = hours < 12 ? 'AM' : 'PM';
  
    // Convert hours to 12-hour format
    hours = hours % 12 || 12;
  
    // Format hours and minutes with leading zeros if needed
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  
    // Format the time in 12-hour format with AM/PM
    const formattedTime = `${formattedHours}:${formattedMinutes} ${period}`;
  
    return { date: formattedDate, time: formattedTime };
  }
  
  const currentDate = new Date();

  function isPortalOpen(endTiming) {
  
    const [endDateTime, endTime] = endTiming.split('T');
    const endDateTimeObject = new Date(endDateTime + 'T' + endTime);

    return currentDate < endDateTimeObject;
  }
  
  const springs = useSpring({
    from: { x: -200 },
    to: { x: 0 },
  })
const navigate = useNavigate()

   
  return (
    <div>
            <h1 style={{textAlign:"center",marginTop:50,fontSize:25,fontWeight:"bold"}}>Club <span style={{color:"#ff82bf"}}>Nights</span></h1>       
        <h2 style={{textAlign:"center"}}><i class="fa-solid fa-clock-rotate-left"></i> History</h2>
      
       <div className='maincontainerdjearnings'>
        
       {earningsData.map((earnings, index) => (
        <animated.div style={{...springs}} key={index} className="djearningcard" onClick={()=>{
          navigate(`/djacceptedsongs/${earnings.DJId}`)
        }}>
           <div style={{display:"flex",justifyContent:"flex-start",alignItems:"center",width:"100%",paddingTop:20,paddingLeft:30}}>
                <div
                  className="opendjportal"
                  style={{
                    padding: 5,
                    background: isPortalOpen(earnings.DJPortalEndTiming)
                      ? '#3fd14b'
                      : '#9c0909',
                    borderRadius: 20,
                    width: 90,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {isPortalOpen(earnings.DJPortalEndTiming) ? 'Open' : 'Closed'}
                </div>
              </div>
         <div className='djearningimgbx'>

            <p>Date : {formatDateTime(earnings.date).date} </p>
         <img style={{width:"100%",height:"100%",borderRadius:20}} className='djearningimg' src={require('../../assets/dj4.png')} alt="DJ Image" />

         </div>
          <div style={{padding:10}}>
            <b style={{cursor:"pointer"}}>DJ Portal Starting Time: {formatDateTime(earnings.date).time}</b>
            <p>TotalSongs: {earnings.TotalSongs}</p>
            {/* <p>Price: <span style={{color:"#ff5100"}}><i style={{fontSize:14}} class="fa-solid fa-indian-rupee-sign"></i>{earnings.price}</span></p> */}
            <p>DJ Portal End Timing: {new Date(earnings.DJPortalEndTiming).toLocaleTimeString()}</p>
          
          </div>
        </animated.div>
      ))}
       </div>
    </div>
  );
};

export default DJEarnings;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faPlay, faStop } from '@fortawesome/free-solid-svg-icons';
import '../../Styles/User Styles/DJOpen.css';
import BackButton from '../Club/BackButton';

const DJOpens = () => {
  const [djData, setDjData] = useState([]);
  const params = useParams();
  const clubId = params.clubId;
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async ()=>{
   await axios.get(`http://localhost:5000/dj/getdjbyclub/${clubId}`)
      .then(response => {
        setDjData(response.data.reverse());
      })
      .catch(error => {
        console.error('Error fetching DJ data:', error);
      });

    }
    getData()

  }, [clubId]);

  const navigateToHome = (id) => {
    navigate(`/home/${id}`);
  };

  const getLiveStatusIcon = (statusLive) => {
    return statusLive ? faPlay : faStop;
  };

  const getLiveStatusColor = (statusLive) => {
    return statusLive ? 'green' : 'red';
  };
  document.addEventListener('DOMContentLoaded', function () {
    const card = document.querySelector('.djopencard');

    card.addEventListener('mousemove', function (e) {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 25;

        card.style.transform = `rotateX(${yAxis}deg) rotateY(${xAxis}deg) scale(1.05)`;
    });

    card.addEventListener('mouseleave', function () {
        card.style.transform = 'rotate(0) scale(1)';
    });
});
const isAnyDjLive = djData.some(dj => dj.statusLive);
  return (
    <>
    <BackButton/>
    <h1 style={{textAlign:"center",marginTop:50,fontWeight:"bold",fontSize:"23px"}}>Club <span style={{color:"#ff82bf"}}>Nights</span></h1>       
    <div className="glassmorphism-container">
      {djData.length > 0 ? (
        <>
        <h3 style={{letterSpacing:1,fontWeight:"500",textTransform:"uppercase"}}>List of Dj's</h3>
        <div className="dj-container">
          {djData.map((dj, index) => (
            
            
              dj.statusLive && (
          <>
           <div key={index} className="djopencard" onClick={() => {dj.statusLive === true ? navigateToHome(dj._id+``) : alert("DJ is not live now!")} }>
             <div style={{zIndex:1000}}>
             <i class="musicanimation fa-solid fa-record-vinyl"></i>
             <h2 style={{margin:3}}>DJ Name: {dj.DjName}</h2>
              <h2 style={{color:"#ff82bf",margin:3}}>DJ Id: {dj.DjNumber}</h2>

              <p  style={{margin:3}}>Club ID: {dj.ClubID}</p>
              <p  style={{margin:3}}>
               Status:
                <FontAwesomeIcon
                  icon={getLiveStatusIcon(dj.statusLive)}
                  style={{ color: getLiveStatusColor(dj.statusLive), marginLeft: '5px' }}
                />
                {dj.statusLive ? ' Live' : ' Not Live'}
              </p>
             </div>
              {/* Add more details as needed */}
            </div>
          
          </>      
              )
            
           
          ))}
          <h2 style={{color:"red"}}>{!isAnyDjLive ? "No  DJ is playing now!":""}</h2>

        </div>
        </>

      ) : (
        <p>No DJ is playing now</p>
      )}
    </div>
    </>
  );
};

export default DJOpens;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faPlay, faStop } from '@fortawesome/free-solid-svg-icons';
import '../../Styles/User Styles/DJOpen.css';

const DJOpens = () => {
  const [djData, setDjData] = useState([]);
  const params = useParams();
  const clubId = params.clubId;
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/dj/getdjbyclub/${clubId}`)
      .then(response => {
        setDjData(response.data);
      })
      .catch(error => {
        console.error('Error fetching DJ data:', error);
      });
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

  return (
    <>
    <h1 style={{textAlign:"center",marginTop:50}}>Club <span style={{color:"#ff82bf"}}>Nights</span></h1>       
    <div className="glassmorphism-container">
      {djData.length > 0 ? (
        <>
        <h3>List of Dj's</h3>
        <div className="dj-container">
          {djData.map((dj, index) => (
            
            
              dj.statusLive && (
          <>
           <div key={index} className="open-dj" onClick={() => {dj.statusLive === true ? navigateToHome(dj._id+``) : alert("DJ is not live now!")} }>
              <h2>DJ Name: {dj.DjName}</h2>
              <p>Club ID: {dj.ClubID}</p>
              <p>
                Live Status:
                <FontAwesomeIcon
                  icon={getLiveStatusIcon(dj.statusLive)}
                  style={{ color: getLiveStatusColor(dj.statusLive), marginLeft: '5px' }}
                />
                {dj.statusLive ? ' Live' : ' Not Live'}
              </p>
              {/* Add more details as needed */}
            </div>
          
          </>      
              )
            
           
          ))}
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

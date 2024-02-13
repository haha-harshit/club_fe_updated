import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ConfirmedQueue.css';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';

const ConfirmedQueue = () => {
  const [acceptedSongs, setAcceptedSongs] = useState([]);
const {id} = useParams();
  useEffect(() => {
    const fetchAcceptedSongs = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/djportal/final-accepted-songs/${id}`);
        setAcceptedSongs(response.data.acceptedSongs);
      } catch (error) {
        console.error('Error fetching accepted songs:', error);
      }
    };


    fetchAcceptedSongs();
  }, []);
  
const userMobile = Cookies.get('userMobile');
// alert(userMobile)
  return (
    <div className='main_cq_parent'>

 <h1 style={{textAlign:"center",marginTop:10,fontWeight:"700",fontSize:22}}>Club <span style={{color:"#ff82bf"}}>Nights</span></h1>       

        <p style={{fontSize:18,fontWeight:"bold",marginTop:20}}>Congratulations 🎉</p>
        <p style={{fontSize:14,color:"#ccc"}}><i style={{color:"#2dcb74"}} className="fa fa-check-circle"></i> Payment successful!</p>
    <div className="parent_cq">
      <div className="card_cq">
     
        <div className="glass_cq"></div>
        <div className="content_cq">
          <span className="title_cq">Confirmed Song Queue</span>
          <div className="scroll_cq">
            {acceptedSongs.length ===0  ? <p style={{color:"#000",fontSize:18,fontWeight:"bold",marginTop:20}}>No Song List Found!</p>  : ''}
            {acceptedSongs.map(song => (
              <div className={`song-item ${song.userMobile == userMobile ? 'highlight' : ''}`} key={song._id}>
                <p className="song-name">Song : {song.songname}{userMobile == song.userMobile ? ' - Your Song' : ''}</p>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </div>
    </div>
  );
};

export default ConfirmedQueue;

import React, { useState, useEffect } from 'react';
import Checkbox from 'react-custom-checkbox';
import '../../Styles/DJ Styles/DJSongChoose.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DJSongChoose = () => {
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [timerTime, setTimerTime] = useState('');
  const [timer, setTimer] = useState(0); // Initialize timer with 0 seconds
  const [songList, setSongList] = useState([]);
  const [djData, setDjData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const djDataString = localStorage.getItem('djData');

    if (djDataString) {
      const djData = JSON.parse(djDataString);
      setDjData(djData);
      fetchSongList(djData._id); // Pass djData._id to the fetchSongList function
    } else {
      // console.log('No data found in localStorage for key "djData".');
    }
  }, []);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);
    return () => clearInterval(timerInterval);
  }, []); // Empty dependency array to run only once on mount

  useEffect(() => {
    if (timer === 0) {
      handleDoneButtonClick();
    }
  }, [timer]);

  useEffect(() => {
    if (timerTime !== '') {
      // Convert the timestamp to seconds
      const timestampInSeconds = Math.floor((new Date(timerTime) - Date.now()) / 1000);
      setTimer(timestampInSeconds);
    }
  }, [timerTime]);

  const handleSongSelect = (song) => {
    setSelectedSongs((prevSelectedSongs) => {
      const isSongSelected = prevSelectedSongs.some((selectedSong) => selectedSong.songname === song.songname);
  
      if (isSongSelected) {
        // If the song is already selected, remove it from the array
        return prevSelectedSongs.filter((selectedSong) => selectedSong.songname !== song.songname);
      } else {
        // If the song is not selected, add it to the array
        return [...prevSelectedSongs, song];
      }
    });
  };
  

  const fetchSongList = async (djId) => {
    try {
      const response = await axios.get(`http://localhost:5000/djportal/latestSongReqList/${djId}`);
      const { songs, timer: serverTimer } = response.data;

      setSongList(songs);
      setTimerTime(serverTimer); // Set the timer value from the server response
    } catch (error) {
      console.error('Error fetching song list:', error);
    }
  };

  const handleDoneButtonClick = async () => {
    try {
      await axios.post(`http://localhost:5000/djportal/saveAcceptedSongs/${djData._id}`, {
        acceptedSongs: selectedSongs,
      });
      navigate('/djwaiting');
      // console.log('AcceptedSongs saved successfully');
    } catch (error) {
      console.error('Error saving AcceptedSongs:', error.message);
    }
  };

  return (
    <div className="dj-song-choose-container">
      <h1 style={{ textAlign: 'center', color: '#fc033d' }}>Club Nights</h1>

      <h2>
        <i class="discicon fa-solid fa-compact-disc"></i> Song Requests - Lists
      </h2>
      <p style={{ textAlign: 'left' }}>Total No of songs: {songList.length}</p>
      <p style={{ textAlign: 'left' }}>Timer: {timer} seconds</p>

      <ul className="djchoosemusicsong-list">
        {songList &&
          songList.map((song, index) => (
            <li
              style={{
                background: 'rgba(255,255,255,0.01)',
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                borderRight: '2px solid rgba(255,255,255,0.1)',
                cursor: 'pointer',
                borderBottom: '2px solid rgba(255,255,255,0.1)',
              }}
              key={index}
            >
              <p htmlFor={`song${index}`}>{song.songname}</p>
              <Checkbox
                name={`song${index}`}
                checked={selectedSongs.some((selectedSong) => selectedSong.songname === song.songname)}
                onChange={() => handleSongSelect(song)}
              />
            </li>
          ))}
      </ul>

      <h2 style={{ textAlign: 'left', marginTop: 50 }}>
        <i class="fa-solid fa-users-viewfinder"></i> Preview
      </h2>

      <iframe
        title="Spotify Embed: Recommendation Playlist "
        src={`https://open.spotify.com/embed/playlist/5G2WKyu8pWpxVVvOzgocNx?utm_source=generator&theme=0`}
        width="100%"
        height="100%"
        style={{ minHeight: '360px' }}
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      />
    </div>
  );
};

export default DJSongChoose;

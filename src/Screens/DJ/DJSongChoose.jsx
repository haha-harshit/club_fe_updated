import React, { useState, useEffect } from 'react';
import Checkbox from 'react-custom-checkbox';
import '../../Styles/DJ Styles/DJSongChoose.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DJSongChoose = () => {
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [timerTime, setTimerTime] = useState('');
  const [timer, setTimer] = useState(0);
  const [songList, setSongList] = useState([]);
  const [djData, setDjData] = useState({});
  const [uniqueLinks, setUniqueLinks] = useState(new Set());
  const [showDoneButton, setShowDoneButton] = useState(false);
  const [showPayLoader, setShowPayLoader] = useState(false);
  const navigate = useNavigate();

  const updateDJStatus = async (id) => {
    try {
      const res = await axios.put(`http://localhost:5000/dj/updateStatus/${id}`, { statusLive: false });
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const djDataString = localStorage.getItem('djData');

    if (djDataString) {
      const djData = JSON.parse(djDataString);
      setDjData(djData);
      fetchSongList(djData._id);
    }
  }, []);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);
    return () => clearInterval(timerInterval);
  }, []);

  useEffect(() => {
    if (timer === 0) {
      setShowDoneButton(true);
    }
  }, [timer]);

  useEffect(() => {
    if (timerTime !== '') {
      const timestampInSeconds = Math.floor((new Date(timerTime) - Date.now()) / 1000);
      setTimer(timestampInSeconds);
    }
  }, [timerTime]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchSongList(djData._id);
    }, 30000); // Fetch every 30 seconds
    return () => clearInterval(interval);
  }, [djData._id]);

  const handleSongSelect = (song) => {
    setSelectedSongs((prevSelectedSongs) => {
      const isSongSelected = prevSelectedSongs.some((selectedSong) => selectedSong.songname === song.songname);

      if (isSongSelected) {
        return prevSelectedSongs.filter((selectedSong) => selectedSong.songname !== song.songname);
      } else {
        return [...prevSelectedSongs, song];
      }
    });
  };

  const fetchSongList = async (djId) => {
    try {
      const response = await axios.get(`http://localhost:5000/djportal/latestSongReqList/${djId}`);
      const { songs, timer: serverTimer } = response.data;

      setSongList(songs);
      setTimerTime(serverTimer);
    } catch (error) {
      console.error('Error fetching song list:', error);
    }
  };

  const handleDoneButtonClick = async () => {
    try {
      setShowPayLoader(true);

      const currentTime = Date.now();
      const fiveMinutesLater = currentTime + (5 * 60 * 1000);

      console.log(currentTime, fiveMinutesLater);
      await axios.post(`http://localhost:5000/waitpay/create-payment-waiting`, {
        SongReqList: selectedSongs,
        djID: djData._id,
        paymentWaitingStartTimeing: currentTime,
        paymentWaitingEndTiming: fiveMinutesLater
      });

      updateDJStatus(djData._id);
      setShowPayLoader(false);

      navigate(`/djwaiting/${djData._id}`);
    } catch (error) {
      setShowPayLoader(false);
      console.error('Error saving AcceptedSongs:', error.message);
    }
  };

  useEffect(() => {
    setUniqueLinks(new Set());
  }, [songList]);

  console.log(selectedSongs);

  return (
    <div className="dj-song-choose-container">
      <h1 style={{ textAlign: 'center', margin: 20, fontWeight: '700', fontSize: 22 }}>
        Club <span style={{ color: '#ff82bf' }}>Nights</span>
      </h1>

      <h2>
        <i className="discicon fa-solid fa-compact-disc"></i> Song Requests - Lists
      </h2>
      <p style={{ textAlign: 'left' }}>Total No of songs: {songList.length}</p>
      <p style={{ textAlign: 'left' }}>Timer: {timer} seconds</p>

      <ul className="djchoosemusicsong-list">
        {songList &&
          songList
            .sort((a, b) => b.bookingPrice - a.bookingPrice)
            .map((song, index) => (
              <li
                key={index}
                style={{
                  background: 'rgba(255,255,255,0.01)',
                  display: 'flex',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  borderRight: '2px solid rgba(255,255,255,0.1)',
                  cursor: 'pointer',
                  borderBottom: '2px solid rgba(255,255,255,0.1)',
                }}
              >
                <p style={{ color: '#ff82bf' }}>{song.songname}</p>
                <p style={{ color: '#ff82bf' }}> ₹{song.bookingPrice}</p>

                <Checkbox
                  name={`song${index}`}
                  checked={selectedSongs.some((selectedSong) => selectedSong.songname === song.songname)}
                  onChange={() => handleSongSelect(song)}
                />
              </li>
            ))}
        {showDoneButton && (
          <button onClick={handleDoneButtonClick} style={{ marginTop: 20, background: "#ff87ce", color: "#000", marginBottom: 10 }}>
            {showPayLoader ? <i className='fa fa-spinner fa-spin' /> : 'Choose song & request for Payments'}
          </button>
        )}
      </ul>
    </div>
  );
};

export default DJSongChoose;

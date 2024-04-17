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
  const [showPayLoader, setShowPayLoader] = useState(true);
  const [matchingElements, setMatchingElements] = useState([]);
  const [songLength, setSongLength] = useState('');

  const findMatchingElements = () => {
    const matches = [];
    selectedSongs.forEach((selectedItem) => {
      const matchingSongs = allSong.filter(
        (song) => song.songlink === selectedItem.songlink
      );
      matchingSongs.forEach((match) => {
        matches.push(match);
      });
    });
    setMatchingElements(matches);
  };

  useEffect(() => {
    findMatchingElements();
  }, [selectedSongs]);

  const navigate = useNavigate();
  const [allSong, setAllSong] = useState([]);
  const updateDJStatus = async (id) => {
    try {
      const res = await axios.put(
        `https://api.clubnights.fun/dj/updateStatus/${id}`,
        { statusLive: false }
      );
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
    if (selectedSongs.length > 0) {
      setShowDoneButton(true);
    }
  }, [selectedSongs]);

  useEffect(() => {
    if (timerTime !== '') {
      const timestampInSeconds = Math.floor(
        (new Date(timerTime) - Date.now()) / 1000
      );
      setTimer(timestampInSeconds);
    }
  }, [timerTime]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchSongList(djData._id);
    }, 10000); // Fetch every 10 seconds
    return () => clearInterval(interval);
  }, [djData._id]);

  useEffect(() => {
    setUniqueLinks(new Set());
  }, [songList]);

  const handleSongSelect = (song) => {
    setSelectedSongs((prevSelectedSongs) => {
      const isSongSelected = prevSelectedSongs.some(
        (selectedSong) => selectedSong.songname === song.songname
      );

      if (isSongSelected) {
        return prevSelectedSongs.filter(
          (selectedSong) => selectedSong.songname !== song.songname
        );
      } else {
        return [
          ...prevSelectedSongs,
          ...songList.filter((listSong) => listSong.songname === song.songname),
        ];
      }
    });
  };

  const fetchSongList = async (djId) => {
    try {
      const response = await axios.get(
        `https://api.clubnights.fun/djportal/latestSongReqList/${djId}`
      );
      const { songs, timer: serverTimer } = response.data;

      const groupedSongs = groupSongsByLink(songs);
      setSongLength(songs.length);
      setSongList(groupedSongs);
      setAllSong(songs);
      setTimerTime(serverTimer);
    } catch (error) {
      console.error('Error fetching song list:', error);
    }
  };

  const sortSongsByBookingPrice = () => {
    const sortedSongs = [...songList].sort(
      (a, b) => b.bookingPrice - a.bookingPrice
    );
    setSongList(sortedSongs);
  };

  const groupSongsByLink = (songs) => {
    const groupedSongs = {};

    songs.forEach((song) => {
      if (!groupedSongs[song.songlink]) {
        groupedSongs[song.songlink] = { ...song, count: 1 };
      } else {
        groupedSongs[song.songlink].bookingPrice += song.bookingPrice;
        groupedSongs[song.songlink].count++;
      }
    });
    sortSongsByBookingPrice();
    return Object.values(groupedSongs);
  };

  const handleDoneButtonClick = async () => {
    if (selectedSongs.length > 0) {
      try {
        setShowPayLoader(true);

        const currentTime = Date.now();
        const fiveMinutesLater = currentTime + 5 * 60 * 1000;

        await axios.post(
          `https://api.clubnights.fun/waitpay/create-payment-waiting`,
          {
            SongReqList: matchingElements,
            djID: djData._id,
            paymentWaitingStartTimeing: currentTime,
            paymentWaitingEndTiming: fiveMinutesLater,
          }
        );

        updateDJStatus(djData._id);
        setShowPayLoader(false);

        navigate(`/djwaiting/${djData._id}`);
      } catch (error) {
        setShowPayLoader(false);
        console.error('Error saving AcceptedSongs:', error.message);
      }
    } else {
      alert('Kindly choose the songs');
    }
  };

  const remainingTime = timer > 0 ? timer : 0;

  return (
    <div className="dj-song-choose-container">
      <h1
        style={{
          textAlign: 'center',
          margin: 20,
          fontWeight: '700',
          fontSize: 22,
        }}>
        Club <span style={{ color: '#ff82bf' }}>Nights</span>
      </h1>

      <h2>
        <i className="discicon fa-solid fa-compact-disc"></i> Song Requests -
        Lists
      </h2>
      <p style={{ textAlign: 'left' }}>Total no of songs: {songLength}</p>
      <p style={{ textAlign: 'left' }}>Timer: {remainingTime} seconds</p>

      <ul className="djchoosemusicsong-list">
        {songList.length > 0 ? (
          songList.map((song, index) => (
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
                paddingRight: 18,
              }}>
              <p style={{ color: '#fff', width: '65%' }}>
                <p style={{ color: '#ff82bf' }}>{song.count}x times</p>{' '}
                {song.songname}
              </p>
              <p style={{ color: '#ff82bf', width: '20%' }}>
                {' '}
                ₹{song.bookingPrice}
              </p>
              <Checkbox
                name={`song${index}`}
                checked={selectedSongs.some(
                  (selectedSong) => selectedSong.songname === song.songname
                )}
                onChange={() => handleSongSelect(song)}
              />
            </li>
          ))
        ) : (
          <div className="run-no-list" style={{ width: 300, height: 350 }}>
            <img
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              src={require('../../assets/no-list.png')}
              alt="no-list"
            />
          </div>
        )}

        {(timer <= 0 || remainingTime < 120) && showDoneButton && (
          <button
            onClick={handleDoneButtonClick}
            style={{
              marginTop: 20,
              background: '#ff87ce',
              color: '#000',
              marginBottom: 10,
            }}>
            {showPayLoader ? (
              'Choose song & request for Payments'
            ) : (
              <i className="fa fa-spinner fa-spin" />
            )}
          </button>
        )}

        {showPayLoader && remainingTime >= 120 && (
          <p style={{ color: '#ccc', fontSize: 12 }}>
            Kindly wait, don't skip the way. Processing the request. Button will
            appear in {remainingTime >= 180 ? '3 minutes' : '2 minutes'}
          </p>
        )}
      </ul>
    </div>
  );
};

export default DJSongChoose;

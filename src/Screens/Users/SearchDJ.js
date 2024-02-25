// SearchDj.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch, FaSpinner, FaQrcode, FaTimes } from 'react-icons/fa';
import '../../Styles/User Styles/SearchDJ.css';
import { useNavigate } from 'react-router-dom';
import QrReader from "react-qr-reader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BackButton from '../Club/BackButton';
const SearchDj = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [startScan, setStartScan] = useState(false);
  const [loadingScan, setLoadingScan] = useState(false);
  const [scanData, setScanData] = useState('');
  const [availableCameras, setAvailableCameras] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Get the list of available cameras
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const cameras = devices.filter((device) => device.kind === 'videoinput');
      setAvailableCameras(cameras);
    });
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://api.clubnights.fun/club/api/getallclubs');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const defaultCamera = availableCameras.find((camera) => camera.facingMode === 'user')
    ? 'user'
    : 'environment';

  const [selectedCamera, setSelectedCamera] = useState(defaultCamera);

  const handleSearch = () => {
    const searchQuery = searchInput.toLowerCase();
    const results = data.filter(
      (item) =>
        item.clubId?.toString().toLowerCase().includes(searchQuery) ||
        item.clubName.toLowerCase().includes(searchQuery)
    );
    setSearchResults(results);
  };

  const handleScan = async (data) => {
    setLoadingScan(true);
    if (data && data !== "") {
      setScanData(data);
      setStartScan(false);
      setLoadingScan(false);
      // Check if the scanned data is a valid URL
      if (/^https?:\/\//i.test(data)) {
        window.location.href = data; // Redirect to the scanned URL
      } else {
        console.log("Invalid URL:", data);
        // Handle other types of scanned data if needed
      }
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const handleScanQRCode = () => {
    setStartScan(!startScan);
  };

  const handleClearInput = () => {
    setSearchInput('');
    setSearchResults([]); // Clear search results when clearing input
  };

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
    handleSearch(); // Automatically search while typing
  };

  const handleCameraChange = (e) => {
    setSelectedCamera(e.target.value);
  };

  const handleSearchNavigate = async(result) =>{
    await axios.get(`https://api.clubnights.fun/dj/checkDJModalStatus/${result.clubId}`)
    .then((res)=>{
          if(res.data.isOpen !== null){
            navigate(`/userlogin/${result.clubId}`);

          }
          else{
            toast.error('No DJ is live!', {
              position: toast.POSITION.TOP_CENTER,
            });
            
          }
    })
      .catch((err)=>{
        //errr
      })
  }
  return (
    <>
    {/* <BackButton/> */}
    <div className="search-dj-tilt" options={{ max: 25 }}>
      <h1 style={{ fontWeight: "700", fontSize: 22, marginTop: 60 }}>
        Club <span>Nights</span> - Club Search
      </h1>

      <p>Search Club here... </p>
      <img src={require('../../assets/musicbg.png')} className="searchimg" />

      <div className="searchcard">

        <div className="scan-qrcode-container">
          <button onClick={handleScanQRCode} className="scan-qrcode-button">
            <FaQrcode /> {startScan ? "Stop Scan" : "Scan QR Code"}
          </button>

          {availableCameras.length > 1 && (
            <select style={{ color: "#000", marginTop: 10 }} onChange={handleCameraChange} value={selectedCamera}>
              <option style={{ color: "#000" }} value={"environment"}>Back Camera</option>
              <option style={{ color: "#000" }} value={"user"}>Front Camera</option>
            </select>
          )}
        </div>

        {startScan && (
         <QrReader
      key="environment"
    constraints={{
      audio: false,
      video: { facingMode: "environment" },
    }}
    delay={1000}
    onError={handleError}
    onScan={handleScan}
    style={{ width: "150px", height: "150px" }}
  />
)}

        <div className="textBox">
          <div className="search-dj-input-container">
            <input
              style={{ color: "#000" }}
              type="text"
              placeholder="Enter ClubID or DJ Name"
              value={searchInput}
              onChange={handleInputChange}
              className="search-dj-input"
            />
            {searchInput.length > 0 && (
              <button onClick={handleClearInput} className="clear-input-button">
                <FaTimes />
              </button>
            )}
          </div>

          <div className="search-dj-results">
            {searchInput.length > 0 && <h2>Search Results:</h2>}

            {loading && <FaSpinner className="fa-spin" />}

            {searchInput.length > 0 && !loading && (
              <ul className="search-dj-ul">
                {searchResults.map((result) => (
                  <li
                    onClick={() => { 
                      handleSearchNavigate(result);
                    }}
                    className="search-dj-li"
                    key={result.id}
                  >
                    {`Club Name: ${result.clubName} , ClubID: ${result.clubId}`}
                  </li>
                ))}
                {searchInput.length > 0 && searchResults.length === 0 && <h5>No DJ Found</h5>}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
    <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
/>
    </>
  );
};

export default SearchDj;

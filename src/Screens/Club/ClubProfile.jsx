// ClubProfile.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../Styles/Club Styles/ClubProfile.css'; // Import the CSS file

const ClubProfile = () => {
    const [clubData1, setClubData1] = useState({});
  const [djData, setdjData] = useState([]);

  const getDJData = async (clubId) => {
    try {
      const res = await axios.get(`http://localhost:5000/club/djData/${clubId}`);
      setdjData(res.data.alldj);
      // console.log(res.data.alldj);
    } catch (err) {
      // console.error(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clubData1s = JSON.parse(localStorage.getItem('clubData') || '{}');
        if (clubData1s && clubData1s.clubId) {
          await getDJData(clubData1s.clubId);
          setClubData1(clubData1s);
        }
      } catch (error) {
        // console.error(error);
      }
    };

    fetchData();
  }, []);
console.log(clubData1);
  const [clubData, setClubData] = useState(null);
  useEffect(() => {
    // Axios GET request to fetch club data
    axios.get(`http://localhost:5000/club/getoneclubs/${clubData1._id}`) // Replace '/api/club/:id' with your actual API endpoint
      .then(response => {
        setClubData(response.data);
      })
      .catch(error => {
        console.error('Error fetching club data:', error);
      });
  }, [clubData1._id]);

  return (

    
    <div className="club-profile-container">

        <button style={{width:"100px",borderRadius:20}} onClick={()=>{
            window.history.back()
        }}>Back</button>
      {/* <h1 className="neon-text">Club Profile</h1> */}

      {clubData ? (
        <div>
        <h1 style={{textAlign:"center",marginTop:50}}>Club <span style={{color:"#ff82bf"}}>Nights</span></h1>       

          <p><strong>Club Name:</strong> {clubData.clubName}</p>
          <p><strong>Owner Name:</strong> {clubData.ownerName}</p>
          <p><strong>Account Number:</strong> {clubData.clubAccountNumber}</p>
          <p><strong>Account IFSC:</strong> {clubData.clubAccountIFSC}</p>
          <p><strong>Email:</strong> {clubData.clubEmail}</p>
          <p><strong>Mobile:</strong> {clubData.clubMobile}</p>
          <p><strong>UPI ID:</strong> {clubData.clubUPIID}</p>
          <p><strong>Date:</strong> {new Date(clubData.date).toLocaleString()}</p>
          <p><strong>Club ID:</strong> {clubData.clubId}</p>
        </div>
      ) : (
        <p>Loading club data...</p>
      )}
    </div>
  );
};

export default ClubProfile;

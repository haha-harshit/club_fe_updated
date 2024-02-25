import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../Styles/Club Styles/DJModal.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DJModal = ({ isOpen, onClose }) => {

  const [clubData, setClubData] = useState({});
  const [djData, setDjData] = useState({
    DjName: '',
    DjNumber: '',
    Djpassword: '',
    clubEmail: '',
    ClubID: ''
  });

  useEffect(() => {
    const clubDatas = localStorage.getItem('clubData');
    const parsedClubData = JSON.parse(clubDatas || '{}');
    setClubData(parsedClubData);
  
    setDjData((prevData) => ({
      ...prevData,
      clubEmail: parsedClubData.clubEmail,
      ClubID: parsedClubData.clubId
    }));
  }, []);

  const generateRandomString = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  const generateRandomNumber = (length) => {
    return Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1));
  };
  const randomClubID = generateRandomNumber(8).toString();
  const randomPassword = generateRandomString(5) + generateRandomNumber(5).toString();
  const randomDjName = generateRandomString(8);

  const handleAddDj = async () => {
    try {
   
      const randomDjData = {

        ClubID: clubData.clubId,
        Djpassword: randomPassword,
        DjName: randomDjName,
        DjNumber:randomClubID,
      };

      await axios.post('https://api.clubnights.fun/club/adddjbyclub', randomDjData)
        .then((res) => {
          console.log(res.data);
          if (res.data.success === true) {
            toast.success("DJ Added Successfully!")
            window.location.reload();
          } else {
            toast(res.data.message);
          }
        })
        
        .catch((err) => {
          // Handle error
        });

      onClose();
    } catch (error) {
      console.error('Error adding DJ:', error);
      // Handle error as needed
    }
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <span className="close-icon-dj-modal" onClick={onClose}>
          <i style={{ fontSize: 18, cursor: "pointer" }} className="fa-regular fa-circle-xmark"></i>
        </span>
        <h2 className="modal-title">Add DJ</h2>
        
        <label className="modal-label">
          Dj Name:
          <input
            type="text"
            name="DjName"
            value={randomDjName}
            onChange={() => {}}
            className="modal-input"
            disabled
            style={{color:"#fff",background:"#1b1b1b"}}

          />
        </label>
        
        <label className="modal-label">
          Dj ID:
          <input
            type="number"
            name="DjNumber"
            value={randomClubID}
            onChange={() => {}}
            className="modal-input"
            disabled
            style={{color:"#fff",background:"#1b1b1b"}}
          />
        </label>
        
        <label className="modal-label">
          Dj Password:
          <input
            type="input"
            name="Djpassword"
            value={randomPassword}
            onChange={() => {}}
            className="modal-input"
            disabled
            style={{color:"#fff",background:"#1b1b1b"}}

          />
        </label>
        
        <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
          <button onClick={handleAddDj} className="custom-btn btn-14">Create DJ</button>
        </div>
      </div>
    </div>
  );
};

export default DJModal;

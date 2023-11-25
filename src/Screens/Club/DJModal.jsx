import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../Styles/Club Styles/DJModal.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DJModal = ({ isOpen, onClose }) => {

    const [clubData, setClubData] = useState({}); // Initialize as an object

  useEffect(() => {
    const clubDatas = localStorage.getItem('clubData');
    setClubData(JSON.parse(clubDatas || '{}')); // Parse the stored string to object
  }, []);
  const [djData, setDjData] = useState({
    DjName: '',
    DjNumber: '',
    Djpassword: '',
    clubEmail: clubData.clubEmail,
    ClubID:clubData.clubId
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDjData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddDj = async () => {
    try {
      // Make Axios request here
      await axios.post('http://localhost:5000/club/adddj', djData)
      .then((res)=>{

        if(res.data.success === true){
            toast.success("DJ Added Successfully!")
       
    setDjData({
    DjName: '',
    DjNumber: '',
    Djpassword: '',
  });

}
else{
    toast(res.data.message)
}
      })
      .catch((err)=>{

      })

     

      // Close the modal
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
        <i style={{fontSize:18,cursor:"pointer"}} class="fa-regular fa-circle-xmark"></i>
        </span>
        <h2 className="modal-title">Add DJ</h2>
        <label className="modal-label">
          Dj Name:
          <input
            type="text"
            name="DjName"
            value={djData.DjName}
            onChange={handleInputChange}
            className="modal-input"
          />
        </label>
        {/* <label className="modal-label">
          Club ID:
          <input
            type="text"
            name="ClubID"
            value={djData.ClubID}
            onChange={handleInputChange}
            className="modal-input"
          />
        </label> */}
        <label className="modal-label">
          Dj Mobile:
          <input
            type="number"
            name="DjNumber"
            value={djData.DjNumber}
            onChange={handleInputChange}
            className="modal-input"
          />
        </label>
        <label className="modal-label">
          Dj Password:
          <input
            type="password"
            name="Djpassword"
            value={djData.Djpassword}
            onChange={handleInputChange}
            className="modal-input"
          />
        </label>
        <div style={{width:"100%",display:"flex",justifyContent:"flex-end"}}>
        <button  onClick={handleAddDj} class="custom-btn btn-14">Create DJ</button>

        </div>

      </div>
    </div>
  );
};

export default DJModal;

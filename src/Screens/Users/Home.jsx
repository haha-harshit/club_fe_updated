// Home.jsx

import React, { useState ,useEffect} from 'react';
import '../../Styles/User Styles/Home.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import SearchBar from './SearchBar';

const Home = () => {
  const [requestType, setRequestType] = useState('music');
  const [announcement, setannouncement] = useState('');
  const id = useParams().djId;
   
  const [searchQuery, setSearchQuery] = useState('');
  const [url, setUrl] = useState('');
  const [price, setPrice] = useState(200);

  const handleRequestTypeChange = (type) => {
    setRequestType(type);
  };

  const handleAnnouncementChange = (e) => {
    setannouncement(e.target.value);
  };

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(Math.max(parseInt(e.target.value) || 0 ,requestType === 'music' ? priceOfSongs : priceOfSongs*1.5));
  };

 

   const handleSendRequest = async()=>{
   const userMobile = Cookies.get('userMobile');
   const SongReqList = [{
    songname:Cookies.get('spotifyName'),
    songlink:Cookies.get('spotifyUrl'),
    optionalurl:url,
    bookingPrice:requestType === 'music' ? priceOfSongs : priceOfSongs*1.5 ,
    userMobile:userMobile,
    announcement:announcement
  }];
   if(userMobile)
   
    {  await axios.post(`http://localhost:5000/djportal/saveselectedsongs/${id}`,{
      SongReqList  
     })
     .then((res)=>{
        if(res.data.message){
          alert('DJ song request sent successful!')
        }
     })
     .catch((err)=>{
      console.log(err);
     })
    }
         else{
          alert("Login to Continue...")
         } 
   }
const [priceOfSongs, setpriceOfSongs] = useState('');
 useEffect(() => {
  const getDJData=async ()=>{
    await axios.get(`http://localhost:5000/djportal/getlatestportal/${id}`)
    .then((res)=>{
           setpriceOfSongs(res.data.latestPortal.price);
    })
    .catch((err)=>{
      //err
    })
  }
  getDJData();
 }, [id]);
  return (
    <div className="userhome-container">
            <h1 style={{textAlign:"center",marginTop:50}}>Club <span style={{color:"#ff82bf"}}>Nights</span></h1>       
              <div className="homecircles">
                <div className="homecircles1"></div>
                <div className="homecircles2"></div>
              </div>
      <div className="userhome-options">
        <button className="userhomebutton" style={{background:requestType === 'music' ? "#ed008e" : "",border:"none",borderRadius:0}} onClick={() => handleRequestTypeChange('music')}>
          Request for Music
        </button>
        <button style={{background:requestType === 'announcement' ? "#ed008e" : "",border:"none",borderRadius:0}}  className="userhomebutton" onClick={() => handleRequestTypeChange('announcement')}>
          Request for Announcement
        </button>
      </div>

      <div className="userhome-form">
        <h2 className="userhome-title">{`Enter ${requestType === 'music' ? 'Music' : 'Announcement'} Request`}</h2>

      
        {requestType === 'music' && (
          <>
            <label className="userhome-label">Select Music</label>
            {/* <input
              className="userhome-input"
              type="text"
              value={searchQuery}
              onChange={handleSearchQueryChange}
            /> */}
            <SearchBar/>
            


            <label className="userhome-label">Copy URL (optional)</label>
            <input
              className="userhome-input"
              type="text"
              value={url}
              onChange={handleUrlChange}
            />
          </>
        )}
        
        {requestType === 'announcement' && (
          <>
            <label className="userhome-label">Write Announcement</label>
            <textarea
              className="userhome-input"
              type="text"
               style={{minHeight:100}}
              value={announcement}
              placeholder='Enter here...'
              onChange={handleAnnouncementChange}
            />

            
          </>
        )}


        <label className="userhome-label">Enter Price (minimum ₹{requestType === 'music' ? priceOfSongs : priceOfSongs*1.5})</label>
        <input
          className="userhome-input"
          type="number"
          value={requestType === 'music' ? priceOfSongs : priceOfSongs*1.5}
          onChange={handlePriceChange}
        />

        <button className="userhomesubmitbutton" onClick={handleSendRequest}>
          Send Request
        </button>
      </div>
    </div>
  );
};

export default Home;

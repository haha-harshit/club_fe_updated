// Home.jsx

import React, { useState ,useEffect} from 'react';
import '../../Styles/User Styles/Home.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import SearchBar from './SearchBar';
import PaymentModal from '../../Components/Modal/PaymentModal';
import { Input } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const navigate = useNavigate();
  const [requestType, setRequestType] = useState('music');
  const [announcement, setannouncement] = useState('');
  const id = useParams().djId;
   const [dateWaited, setdateWaited] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [url, setUrl] = useState('');
  const [price, setPrice] = useState(0);

  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handlePaymentModalClose = () => {
    setShowPaymentModal(false);
  };


  const handleRequestTypeChange = (type) => {
    setRequestType(type);
    setPrice(type === 'music' ? priceOfSongs : priceOfSongs * 1.5  )
  
  };

  const handleAnnouncementChange = (e) => {
    const inputValue = e.target.value;
    const words = inputValue.split(/\s+/); // Split input value by whitespace
    const truncatedInput = words.slice(0, 25).join(" "); // Take the first 25 words and join them back with a space
  
    setannouncement(truncatedInput); // Update the announcement state with truncated input
  };
  const [paymentLink, setPaymentLink] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [payLoader, setPayLoader] = useState(false);
  const userMobile = Cookies.get('userMobile');
  useEffect(() => {
    let initialFetchDone = false; // Variable to track initial fetch
    
    const fetchPaymentLink = async () => {
      try {
        if (!initialFetchDone) {
          setPayLoader(true); // Show loader only for initial fetch
        }
        
        const response = await axios.get(`http://localhost:5000/waitpay/payment-waiting/${id}/${userMobile}`);
        
        if (response.data.userSongReqList.length > 0) {
          const paymentInfo = response.data.userSongReqList[0];
       
          const currentTime =  Date.now();
          console.log("Current time:", currentTime); // Log current time
          
          // Check if current time is before expiration time plus 5 minutes
          if (currentTime < response.data.date && paymentInfo.paymentWaitingstatus === false  ) {
            console.log("Modal should be shown.");
            setShowModal(true); // Show the modal
          } else {
            console.log("Modal should be hidden.");
            setShowModal(false); // Close the modal
          }
        } else {
          // Handle case when there is no payment info available
          console.log('No payment info found');
        }
        
        if (!initialFetchDone) {
          setPayLoader(false); // Hide loader after initial fetch
          initialFetchDone = true; // Mark initial fetch as done
        }
      } catch (error) {
        setPayLoader(false); // Hide loader on error
        console.error('Error fetching payment link:', error);
      }
    };
    
  
    fetchPaymentLink(); // Initial fetch
  
    const intervalId = setInterval(fetchPaymentLink, 5000); // Fetch every 5 seconds
  
    return () => {
      clearInterval(intervalId); // Clear interval on component unmount
    };
  }, [id, userMobile]); // Add id and userMobile to dependency array
  
  console.log(paymentLink);


  const handleCloseModal = () => {
    setShowModal(false);
    // You can also add additional logic here, like resetting state variables
  };

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handlePriceChange = (e) => {

    // Update the price state
    setPrice(e.target.value);
  };
 const [songReqListFind, setsongReqListFind] = useState([]);

 const handleSendRequest = async () => {
  const userMobile = Cookies.get('userMobile');

  if (!userMobile) {
    alert('Login to Continue...');
    return;
  }

  let requestData = {};

  if (requestType === 'music') {
    requestData = {
      songname: Cookies.get('spotifyName'),
      songlink: Cookies.get('spotifyUrl'),
      optionalurl: url,
      bookingPrice: price,
      userMobile: userMobile,
      announcement: '',
    };
  } else if (requestType === 'announcement') {
    requestData = {
      songname: '',
      songlink: '',
      optionalurl: url,
      bookingPrice: price,
      userMobile: userMobile,
      announcement: announcement,
    };
  }

  const SongReqList = [requestData];

  setsongReqListFind(SongReqList);
  // console.log('Sending request', SongReqList);

  try {
    const response = await axios.post(`http://localhost:5000/djportal/saveselectedsongs/${id}`, {
      SongReqList,
    });

    if (response.data.message) {
      toast.success('Song request sent to DJ successfully!');
      alert("You will get a payment link soon. Kindly wait!")
    }
  } catch (error) {
    console.error(error);
  }
};

const [priceOfSongs, setpriceOfSongs] = useState('');
 useEffect(() => {
  const getDJData=async ()=>{
    await axios.get(`http://localhost:5000/djportal/getlatestportal/${id}`)
    .then((res)=>{
           setpriceOfSongs(res.data.latestPortal.price);
           setPrice(res.data.latestPortal.price)
    })
    .catch((err)=>{
      //err
    })
  }
  getDJData();
 }, [id]);
 const priceVal = requestType === 'music' ? priceOfSongs : priceOfSongs*1.5
 const handleIncrement = (amount) => {
  setPrice((prevPrice) => Math.max(0, requestType === 'music' ? priceOfSongs +amount: priceOfSongs * 1.5+amount));
};



  return (
    <div className="userhome-container">
            <h1 style={{textAlign:"center",marginTop:50,fontWeight:"700",fontSize:22}}>Club <span style={{color:"#ff82bf"}}>Nights</span></h1>       
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
      <a href="/recent-transactions" style={{textAlign:"left",width:"400px",color:"#55ff",margin:5,fontSize:14}}>Recent Plays <i class="fa-solid fa-square-caret-left"></i> </a>

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
            <Input
              className="userhome-input"
              type="text"
              style={{color:"#000"}}

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
               style={{minHeight:100,color:"#000"}}
              value={announcement}

              placeholder='Enter here...'
              onChange={handleAnnouncementChange}
            />

            
          </>
        )}


        <label className="userhome-label">Enter Price (minimum ₹{requestType === 'music' ? priceOfSongs : priceOfSongs*1.5})</label>
        <Input
          style={{color:"#000"}}
          className="userhome-input"
          type="number"
          value={price}
          onChange={handlePriceChange}
        />

           <div style={{width:"100%", display:"flex",
          justifyContent:"center",alignItems:"center"}}>
          
          
        <button  onClick={() => handleIncrement(100)} style={{ fontSize:11, width:90,marginLeft:10,display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}} className="userhomepriceincbutton">
           +₹100 
        </button>
        
        <button onClick={() => handleIncrement(200)} style={{ fontSize:11, width:90,marginLeft:10,display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}  className="userhomepriceincbutton">
           +₹200 
        </button>

        <button onClick={() => handleIncrement(500)} style={{ fontSize:11, width:90,marginLeft:10,display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}} className="userhomepriceincbutton">
           +₹500 
        </button>

           </div>

        <button className="userhomesubmitbutton" onClick={handleSendRequest}>
          Send Request
        </button>
      </div>

      {showModal && (
        <PaymentModal show={true} handleClose={handleCloseModal} name={'user'} amount={price} mobileNumber={userMobile} djId={id} SongReqList={songReqListFind}/>
      )}

      
    
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
theme="dark"
/>
    </div>
  );
};

export default Home;

import React,{useEffect,useState, useRef} from 'react'
import '../../Styles/Club Styles/Dash.css'
import ClubNavbar from './ClubNavbar'
import QRCodeGenerator from './QRCode'
import html2canvas from 'html2canvas';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ClubDashboard = () => {
  const [clubData, setClubData] = useState({});
  const [djData, setdjData] = useState([]);

  const getDJData = async (clubId) => {
    try {
      const res = await axios.get(`https://api.clubnights.fun/club/djData/${clubId}`);
      setdjData(res.data.alldj);
      // console.log(res.data.alldj);
    } catch (err) {
      // console.error(err);
    }
  };
  

  useEffect(() => {
    const fetchData = async () => {
      const clubDatas = JSON.parse(localStorage.getItem('clubData') );
      try {

        if (clubDatas) {
         // console.log(clubDatas);
          setClubData(clubDatas);
          await getDJData(clubDatas.clubId);


        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  // console.log(djData);

    const qrCodeRef = useRef(null);

    const downloadQRCode = () => {
      if (qrCodeRef.current) {
        html2canvas(qrCodeRef.current).then((canvas) => {
          const ctx = canvas.getContext('2d');
    
          // Add text above the scanner
          ctx.font = 'bold 20px Arial';
          ctx.fillStyle = '#000'; // Set text color
          ctx.fillText('CLUB NIGHTS', 10, 30);
    
          // Add text below the scanner
          ctx.font = 'bold 14px Arial';
          ctx.fillText('clubnights.fun down the scanner', 10, canvas.height - 10);
    
          const link = document.createElement('a');
          link.href = canvas.toDataURL('image/png');
          link.download = 'qrcode.png';
          link.click();
        });
      }
    };
    

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };
    
    const printQRCode = () => {
        if (qrCodeRef.current) {
          html2canvas(qrCodeRef.current).then((canvas) => {
            const printWindow = window.open('', '_blank');
            printWindow.document.write('<html><head><title>QR Code</title></head><body>');
            printWindow.document.write('<img src="' + canvas.toDataURL('image/png') + '"/>');
            printWindow.document.write('</body></html>');
            printWindow.document.close();
            printWindow.print();
          });
        }
      };
      // console.log(clubData);
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
      const randomClubID = generateRandomNumber(3).toString()+ clubData.clubId;
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
    
        } catch (error) {
          console.error('Error adding DJ:', error);
          // Handle error as needed
        }

      };


      const handleDeleteDJ = async (djNumber) => {
        try {
          // Display a confirmation prompt
          const isConfirmed = window.confirm('Are you sure you want to delete this DJ?');
      
          if (isConfirmed) {
            console.log(djNumber);
      
            // Make a DELETE request to your API endpoint
            await axios.delete(`https://api.clubnights.fun/dj/deletedj/${djNumber}`)
              .then((res) => {
                if (res.data.message) {
                  setdjData((prevDjData) => prevDjData.filter((dj) => dj.DjNumber !== djNumber));
                }
              })
              .catch((Err) => {
                // log error
              });
          } else {
            // User cancelled the deletion
            console.log('Deletion cancelled');
          }
        } catch (error) {
          console.error('Error deleting DJ:', error);
          // Handle error as needed
        }
      };
      
  return (
    <>
    <ClubNavbar/>
   
   
    <div className='clubdashboard'>
        <h2 style={{textAlign:"center"}}>Welcome , {clubData.ownerName || 'XYZ'} to  <span style={{color:"#53ab52"}}>Club Nights</span></h2> 
        
        <div className="cllubdahsboardcontainer">
            <div className="firstdahs">
              <p style={{textAlign:"left",color:"rgb(255, 0, 38)",fontSize:14,fontWeight:"700",letterSpacing:1,margin:5}}>Accounts</p>
              <p style={{padding:5}}>{clubData.clubAccountNumber || 'XXXX XXXX XXXX'}</p>
              <p>{clubData.clubAccountIFSC || 'IFSC CODE'}</p>

            </div>
            <div className="seconddash">
                <p>Wallet</p>
            <i className="fa-solid fa-wallet" style={{fontSize:30}}></i>
            </div>
        </div>


        <div className="scannerdash" style={{marginTop:70}}>
            <div className='threedscanner' style={{display:"flex",justifyContent:"center",flexDirection:"column"}}  ref={qrCodeRef}>
            <p style={{textAlign:"center"}}> {clubData.clubName || 'name here'}</p>

            <QRCodeGenerator clubId={clubData.clubId}/>
            <p style={{textAlign:"center"}}>clubnights.<span style={{color:"#ff82bf"}}>fun</span></p>

            </div>

         
        </div>


        <div className="dashinfo">
           <h5>Club iD : {clubData.clubId}</h5>
         <div style={{
            width:"100%",
            display:"flex",
            justifyContent:"space-around",
            alignItems:"center",
            flexDirection:"row"
         }}>
         <button  onClick={downloadQRCode} className="custom-btn btn-13">Download QR Code <i className="fa-regular fa-circle-down"></i></button>
           <button onClick={printQRCode} className="custom-btn btn-13">Print QR <i className="fa-solid fa-print"></i></button>
         </div>
        </div>

        

         <div className="tableDJdash">
      {djData && djData.length > 0 ? (
        <table className="tablecontainer">
          <thead>
            <tr>
              <th><h1>DJ's Id</h1></th>
              <th><h1>Password</h1></th>
              <th><h1 style={{color:"green."}}>Status</h1></th>
               <th><h1 style={{color:"red"}}>Delete</h1></th>
            </tr>
          </thead>
          <tbody>
            {djData.map((dj) => (
              <tr key={dj._id}>
                <td>{dj.DjNumber}</td>
                <td>{dj.Djpassword}</td>

                <td style={{ color: dj.statusLive ? "green" : "red" }}>
                  {dj.statusLive ? "Online" : "Offline"}
                </td>
                <td>
              <span
                style={{ cursor: 'pointer' }}
                onClick={() => handleDeleteDJ(dj.DjNumber)}
              >
                                    <i style={{marginLeft:20, color:"#fff"}} className="fas fa-trash-alt"></i>

              </span>
            </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading...</p>
      )}
    </div>
          <div className='addmoredj'>
            <button onClick={()=>handleAddDj()} className='addmorebutton'>Add more DJ's</button>
             </div>
    </div>




    </>
  )
}

export default ClubDashboard
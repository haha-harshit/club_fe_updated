import React,{useEffect,useState, useRef} from 'react'
import '../../Styles/Club Styles/Dash.css'
import ClubNavbar from './ClubNavbar'
import QRCodeGenerator from './QRCode'
import html2canvas from 'html2canvas';
import DJModal from './DJModal';

const ClubDashboard = () => {
    const [clubData, setClubData] = useState({}); // Initialize as an object

  useEffect(() => {
    const clubDatas = localStorage.getItem('clubData');
    setClubData(JSON.parse(clubDatas || '{}')); // Parse the stored string to object
  }, []);

    const qrCodeRef = useRef(null);

    const downloadQRCode = () => {
      if (qrCodeRef.current) {
        html2canvas(qrCodeRef.current).then((canvas) => {
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
      
  return (
    <>
    <ClubNavbar/>

   
    <div className='clubdashboard'>
        <h2 style={{textAlign:"center"}}>Welcome , {clubData.ownerName || 'XYZ'} to  <span style={{color:"#53ab52"}}>Club Nights</span></h2> 
        
        <div className="cllubdahsboardcontainer">
            <div className="firstdahs">
              <p style={{textAlign:"left",color:"rgb(255, 0, 38)"}}>Accounts</p>
              <p>{clubData.clubAccountNumber || 'XXXX XXXX XXXX'}</p>
              <p>{clubData.clubAccountIFSC || 'IFSC CODE'}</p>

            </div>
            <div className="seconddash">
                <p>Wallet</p>
            <i class="fa-solid fa-wallet" style={{fontSize:30}}></i>
            </div>
        </div>

        <p style={{textAlign:"center"}}>UPI : {clubData.clubUPIID || '@upi here'}</p>

        <div className="scannerdash">
            <div className='threedscanner' ref={qrCodeRef}>
            <QRCodeGenerator clubId={clubData.clubId}/>

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
         <button  onClick={downloadQRCode} class="custom-btn btn-13">Download QR Code <i class="fa-regular fa-circle-down"></i></button>
           <button onClick={printQRCode} class="custom-btn btn-13">Print QR <i class="fa-solid fa-print"></i></button>
         </div>
        </div>

        

        <div className="tableDJdash">
        <table class="tablecontainer">
	<thead>
		<tr>
			<th><h1>DJ's Name</h1></th>
			<th><h1>Status</h1></th>
			<th><h1>Password</h1></th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>Raj</td>
			<td style={{color:"green"}}>Online</td>
			<td>6369</td>
		</tr>
		<tr>
			<td>Phoniex</td>
			<td style={{color:"green"}}>Online</td>
			<td>10437</td>
		</tr>
		<tr>
			<td>Himanshu</td>
			<td style={{color:"red"}}>Offiline</td>
			<td>5327</td>
		</tr>
    
	</tbody>
</table>
        </div>

          <div className='addmoredj'>
            <button onClick={openModal} className='addmorebutton'>Add more DJ's</button>
             </div>
    </div>
    <DJModal clubEmail={clubData.clubEmail} ClubID={clubData.clubId} isOpen={isModalOpen} onClose={closeModal} />

    </>
  )
}

export default ClubDashboard
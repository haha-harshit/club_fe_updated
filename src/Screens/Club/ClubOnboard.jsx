import React from 'react'
import '../../Styles/Club Styles/Onboard.css'
import { useNavigate } from 'react-router-dom'
const ClubOnboard = () => {
  const navigate = useNavigate()
  return (
    <>
        <div className="clubonboardiv">

          <div>
           <h2 className='fontstyleClubOnboard' 
           onClick={()=>{
            window.location.reload();
           }}
           >Club Owner</h2>
          </div>
          <div>
          <button style={{color:"#000"}} class="custom-btn btn-6"><span style={{color:"#000"}}>Home</span></button>
          </div>
        </div>
            
           
        <div className="onboardregister" >
          <div>
          <button  class="custom-btn btn-6" onClick={()=>{
            navigate('/enlistclub')
          }} style={{marginBottom:"50px",color:"#000"}}><span style={{color:"#000"}}>Enlist Yourself</span></button>
          </div>
          <div>
          <button onClick={()=>{
            navigate('/clublogin')
          }} class="custom-btn btn-6" style={{color:"#000"}}><span style={{color:"#000"}}>Login</span></button>
          </div>
        </div>

    </>
  )
}

export default ClubOnboard
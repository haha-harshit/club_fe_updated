import React,{useState} from 'react'
import { BrowserRouter as Router, Route,Routes} from 'react-router-dom'
import ClubHome from './Screens/Club/ClubHome'
import QRCodeGenerator from './Screens/Club/QRCode'
import ClubOnboard from './Screens/Club/ClubOnboard'
import EnlistClub from './Screens/Club/EnlistClub'
import ClubWaitingPage from './Screens/Club/ClubWaitingPage'
import ClubDashboard from './Screens/Club/ClubDashboard'
import LoginClub from './Screens/Club/LoginClub'
import ResetPassword from './Screens/Club/ResetPassword'
import DJModal from './Screens/Club/DJModal'

const App = () => {
  return (
    <>
     <Router>
       <Routes>
        <Route exact Component={ClubHome} path='/'/>
        <Route Component={QRCodeGenerator} path='/qr'/>
        <Route Component={ClubOnboard} path='/club'/>
        <Route Component={EnlistClub} path='/enlistclub'/>
        <Route Component={ClubWaitingPage} path='/verifying-club'/>
        <Route Component={ClubDashboard} path='/dashboard/'/>
        <Route Component={LoginClub} path='/clublogin/'/>
        <Route Component={ResetPassword} path='/resetclub_password/'/>
        <Route Component={DJModal} path='/djmodal/'/>

       </Routes>
     </Router>
    </>
  )
}

export default App               
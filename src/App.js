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
import DJLogin from './Screens/DJ/DJLogin'
import DJOnboard from './Screens/DJ/DJOnboard'
import DJOpenPortal from './Screens/DJ/DJOpenPortal'
import DJEarnings from './Screens/DJ/DJEarnings'
import DJSongChoose from './Screens/DJ/DJSongChoose'
import DJWaitPayment from './Screens/DJ/DJWaitPayment'
import UserLogin from './Screens/Users/UserLogin'
import Home from './Screens/Users/Home'
import SearchDJ from './Screens/Users/SearchDJ'
import DJOpens from './Screens/Users/DJOpens'
import QRScanner  from './Screens/Users/QRScanner'
import ClubProfile from './Screens/Club/ClubProfile'
import PaymentForm from './Screens/Payments/PaymentForm'
import SearchBar from './Screens/Users/SearchBar'
import UserWait from './Screens/Users/UserWait'

const App = () => {
  return (
    <>
     <Router>
       <Routes>
        {/* Clubs */}
        <Route exact Component={ClubHome} path='/'/>
        <Route Component={QRCodeGenerator} path='/qr'/>
        <Route Component={ClubOnboard} path='/club'/>
        <Route Component={EnlistClub} path='/enlistclub'/>
        <Route Component={ClubWaitingPage} path='/verifying-club'/>
        <Route Component={ClubDashboard} path='/dashboard/'/>
        <Route Component={LoginClub} path='/clublogin/'/>
        <Route Component={ResetPassword} path='/resetclub_password/'/>
        <Route Component={DJModal} path='/djmodal/'/>
        <Route Component={ClubProfile} path='/club-profile'/>

           {/* DJ */}
           <Route Component={DJLogin} path='/djlogin'/>
           <Route Component={DJOnboard} path='/djonboard'/>
           <Route Component={DJOpenPortal} path='/djportal'/>
           <Route Component={DJEarnings} path='/djearning'/>
           <Route Component={DJSongChoose} path='/djsongs'/>
           <Route Component={DJWaitPayment} path='/djwaiting'/>

            {/* Users */}
            <Route Component={UserLogin} path='/userlogin'/>
            <Route Component={Home} path='/home/:djId'/>
            <Route Component={SearchDJ} path='/searchclubs'/>
            <Route Component={DJOpens} path='/opendj/:clubId'/>
            <Route Component={QRScanner} path='/qrscanner'/>
            <Route Component={SearchBar} path='/searchbar'/>
            <Route Component={UserWait} path='/waiting'/>

               {/* Payment */}
               <Route Component={PaymentForm} path='/payment'/>

       </Routes>
     </Router>
    </>
  )
}

export default App               
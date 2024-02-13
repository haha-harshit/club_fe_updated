import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import { AccessTime, CheckCircle, Cancel } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const RecentTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const userMobile =  Cookies.get('userMobile')
  
  useEffect(() => {
    // Make an API request using Axios to fetch the transaction data
    axios.get(`http://localhost:5000/waitpay/songs/${userMobile}`)
      .then(response => {
        setTransactions(response.data.reverse());
      })
      .catch(error => {
        console.error('Error fetching transaction data:', error);
      });
  }, []);

  const navigate = useNavigate();

  return (
    <div style={{margin:20}}>
      <h1 style={{textAlign:"center",marginTop:50,fontWeight:"700",fontSize:22}}>
        Club <span style={{color:"#ff82bf"}}>Nights</span> - Transactions  <i class="fas fa-exchange-alt"></i>
      </h1>
      <div style={{padding:20}}>
        <button style={{margin:10,background:"#ff8fea"}} onClick={() => navigate('/searchclubs')}>
          Search Clubs
        </button>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Amount(INR)</TableCell>
                <TableCell>Mobile Number</TableCell>
                <TableCell>Transaction ID</TableCell>
                <TableCell>Song Name</TableCell>
                <TableCell>Announcement</TableCell>
                <TableCell>Optional Url</TableCell>
                <TableCell>Payment Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map(transaction => (
                transaction.SongReqList.map(songReq => (
                  <TableRow key={songReq._id}>
                    <TableCell>{new Date(transaction.date).toLocaleString()}</TableCell>
                    <TableCell>₹{songReq.bookingPrice}</TableCell>
                    <TableCell>{songReq.userMobile}</TableCell>
                    <TableCell>{songReq.transactionId}</TableCell>
                    <TableCell>{songReq.songname === '' ? "N/A" : songReq.songname}</TableCell>
                    <TableCell>{songReq.announcement === '' ? "N/A" : songReq.announcement}</TableCell>
                    <TableCell>{songReq.optionalurl === '' ? "N/A" : songReq.optionalurl}</TableCell>
                    <TableCell>
                      {songReq.paymentWaitingstatus ? (
                        <CheckCircle style={{ color: 'green' }} />
                      ) : (
                        <Cancel style={{ color: 'red' }} />
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default RecentTransactions;

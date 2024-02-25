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
      const getData = async()=>{
        await axios.get(`https://api.clubnights.fun/waitpay/songs/${userMobile}`)
        .then(response => {
          setTransactions(response.data.matchedSongs.reverse());
        })
        .catch(error => {
          console.error('Error fetching transaction data:', error);
        });
      }
      getData()
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
  <TableRow key={transaction.SongReqList._id}>
    <TableCell>{new Date(transaction.date).toLocaleString()}</TableCell>
    <TableCell>₹{transaction.SongReqList.bookingPrice}</TableCell>
    <TableCell>{transaction.SongReqList.userMobile}</TableCell>
    <TableCell>{transaction.SongReqList.transactionId}</TableCell>
    <TableCell>{transaction.SongReqList.songname === '' ? "N/A" : transaction.SongReqList.songname}</TableCell>
    <TableCell>{transaction.SongReqList.announcement === '' ? "N/A" : transaction.SongReqList.announcement}</TableCell>
    <TableCell>{transaction.SongReqList.optionalurl === '' ? "N/A" : transaction.SongReqList.optionalurl}</TableCell>
    <TableCell>
      {transaction.SongReqList.paymentWaitingstatus ? (
        <CheckCircle style={{ color: 'green' }} />
      ) : (
        <Cancel style={{ color: 'red' }} />
      )}
    </TableCell>
  </TableRow>
))}

            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default RecentTransactions;

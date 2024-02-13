import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button';
import { navigate } from '@reach/router';

const DJAcceptedSongs = () => {
  const [data, setData] = useState(null);
  const { id } = useParams();

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/djportal/getlatestportal/${id}`);
      const acceptedSongs = response.data.latestPortal.AcceptedSongs;

      // Create a map to store unique songs by link and their total booking price
      const uniqueSongs = new Map();
      acceptedSongs.forEach(song => {
        const existingSong = uniqueSongs.get(song.songlink);
        if (existingSong) {
          // If song link already exists, update the total booking price and the number of times repeated
          uniqueSongs.set(song.songlink, { 
            ...existingSong, 
            bookingPrice: existingSong.bookingPrice + song.bookingPrice,
            timesRepeated: existingSong.timesRepeated + 1
          });
        } else {
          // If song link is new, add it to the map with initial values
          uniqueSongs.set(song.songlink, { ...song, timesRepeated: 1 });
        }
      });

      // Convert the map values back to an array
      const uniqueSongsArray = Array.from(uniqueSongs.values());

      // Sort the unique songs by total booking price in descending order
      uniqueSongsArray.sort((a, b) => b.bookingPrice - a.bookingPrice);

      setData(uniqueSongsArray);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData(); // Initial data fetch

    const intervalId = setInterval(() => {
      fetchData(); // Fetch data every 1 minute
    }, 0.5 * 60 * 1000); // 1 minute in milliseconds

    return () => {
      clearInterval(intervalId); // Cleanup on component unmount
    };
  }, []); // Empty dependency array to run effect only once on mount

  const redirectToLink = (link) => {
    window.location.href = link;
  };

  return (
    <div style={{ color: "#ffff", margin: 10 }}>
       <button onClick={()=>{
        window.location.href = "http://localhost:3000/djonboard"
       }} style={{ position: 'fixed', top: '20px', left: '20px' ,height:60, backgroundColor:"rgba(255,255,255,0.02)",borderWidth:1,borderColor:"#ccc",border:"1px solid #ccc"}}>
      <i className="fa fa-home" ></i> <p>Home</p>
    </button>
      <h1 style={{ textAlign: "center", marginTop: 50, fontSize: 25, fontWeight: "bold" }}>
        Club <span style={{ color: "#ff82bf" }}>Nights</span>
      </h1>
      <h2 style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}>Final Song Lists - Play</h2>
      {data && (
        <TableContainer>
          <Table style={{ color: "#fff" }}>
            <TableHead>
              <TableRow>
                <TableCell style={{ color: "#ff82bf", fontSize: 17, fontWeight: "700", minWidth: 200, padding: 10 }}>Song Name</TableCell>
                <TableCell style={{ color: "#fff" }}>Song Link</TableCell>
                <TableCell style={{ color: "#fff" }}>Announcement</TableCell>
                <TableCell style={{ color: "#fff" }}>Optional URL</TableCell>
                <TableCell style={{ color: "#fff" }}>Total Price Received (INR)</TableCell>
                <TableCell style={{ color: "#fff" }}>Times Repeated</TableCell>
                <TableCell style={{ color: "#fff" }}>User Mobile</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell style={{ color: "#ff82bf", fontSize: 17, fontWeight: "700", minWidth: 200, padding: 10 }}> {row.timesRepeated}X times - {row.songname}</TableCell>
                  <TableCell>
                    <Button
                      style={{ width: 120, fontSize: 14 }}
                      onClick={() => redirectToLink(row.songlink)}
                      variant="outlined"
                      color="secondary"
                    >
                      Play Song
                    </Button>
                  </TableCell>
                  <TableCell style={{ color: "#fff" }}>{row.announcement === '' ? 'N/A' : row.announcement}</TableCell>
                  <TableCell style={{ color: "#fff" }}>{row.optionalurl ? row.optionalurl : "N/A"}</TableCell>
                  <TableCell style={{ color: "#fff" }}>{`₹${row.bookingPrice}`}</TableCell>
                  <TableCell style={{ color: "#fff" }}>{row.timesRepeated}</TableCell>
                  <TableCell style={{ color: "#fff" }}>{row.userMobile}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default DJAcceptedSongs;

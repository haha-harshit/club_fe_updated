import React, { useState } from 'react';

const YourComponent = () => {
  const [songsData, setSongsData] = useState([
    {"songname":"New Perspective","songlink":"https://open.spotify.com/track/5psEUJWeJU2BiOYyWdjgxZ","optionalurl":"","announcement":"","bookingPrice":5,"userMobile":"6200720508","_id":"65cf8689022b2f92075f9500"},
    {"songname":"New Perspective","songlink":"https://open.spotify.com/track/5psEUJWeJU2BiOYyWdjgxZ","optionalurl":"","announcement":"","bookingPrice":5,"userMobile":"6200720508","_id":"65cf89c3022b2f92075f9570"},
    {"songname":"My Perspective","songlink":"https://open.spotify.com/track/5psEUJWeJU2BiOYyWdjgxZM","optionalurl":"","announcement":"","bookingPrice":5,"userMobile":"6200720508","_id":"65cf89c6022b2f92075f9578"}
  ]);

  // Function to filter out duplicates and aggregate bookingPrice
  const filterUniqueSongs = (songsData) => {
    const uniqueSongs = {};
    songsData.forEach(song => {
      if (!uniqueSongs[song.songlink]) {
        uniqueSongs[song.songlink] = {
          ...song,
          bookingPrice: song.bookingPrice,
          selected: false
        };
      } else {
        uniqueSongs[song.songlink].bookingPrice += song.bookingPrice;
      }
    });
    return Object.values(uniqueSongs);
  }

  // Apply the filtering function to your songs data
  const uniqueSongsData = filterUniqueSongs(songsData);

  // Function to handle checkbox change
  const handleCheckboxChange = (index) => {
    const updatedSongsData = [...songsData];
    updatedSongsData[index].selected = !updatedSongsData[index].selected;
    setSongsData(updatedSongsData);
    
    const selectedSong = updatedSongsData[index];
    if (selectedSong.selected) {
      const relatedSongs = updatedSongsData.filter(song => song.songlink === selectedSong.songlink);
      console.log("Related Songs:", relatedSongs);
    }
  }

  // Render the unique songs
  return (
    <div>
      <h1>Unique Songs</h1>
      <ul>
        {uniqueSongsData.map((song, index) => (
          <li key={index}>
            <input 
              type="checkbox" 
              checked={song.selected} 
              onChange={() => handleCheckboxChange(index)} 
            />
            <a href={song.songlink}>{song.songname}</a> - Booking Price: ${song.bookingPrice}
          </li>
        ))}
      </ul>
      <button onClick={() => {
        const selectedIndexes = songsData.reduce((acc, song, index) => {
          if (song.selected) acc.push(index);
          return acc;
        }, []);
        const updatedSongsData = songsData.filter((song, index) => !selectedIndexes.includes(index));
        setSongsData(updatedSongsData);
      }}>
        Remove Selected Songs
      </button>
    </div>
  );
}

export default YourComponent;

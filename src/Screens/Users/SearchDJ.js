// SearchDj.jsx

import React, { useState,useEffect } from 'react';
import axios from 'axios';
import '../../Styles/User Styles/SearchDJ.css'; // Import the stylesheet
import { useNavigate } from 'react-router-dom';


const SearchDj = () => {
    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false); // New state for loading
  
    const fetchData = async () => {
      try {
        setLoading(true); // Set loading to true when starting the request
        const response = await axios.get('http://localhost:5000/club/api/getallclubs');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Set loading to false when the request is completed (either success or error)
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []);
  
    const handleSearch = () => {
      const searchQuery = searchInput.toLowerCase();
      const results = data.filter(
        (item) =>
        item.clubId.toString().toLowerCase().includes(searchQuery) ||
        item.clubName.toLowerCase().includes(searchQuery)
      );
      setSearchResults(results);
    };
    const navigate = useNavigate()
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div className="search-dj-container">
          <h1 style={{ textAlign: 'center', fontSize: 20 }}>
            Club <span style={{ color: '#ff82bf' }}>Nights</span> - Club Search
          </h1>
  
          <p>Search Club here </p>
          <input
            type="text"
            placeholder="Enter ClubID or DJ Name"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="search-dj-input"
          />
          <button style={{borderRadius:5}} onClick={handleSearch} className="search-dj-button">
            Search
          </button>
  
          <div className="search-dj-results">
           {searchInput.length>0 && <h2>Search Results:</h2>}
  
            {loading && <i className="fa fa-spinner fa-spin"></i>} {/* Show spinner while loading */}
  
            {searchInput.length>0 && !loading && (
              <ul className='search-dj-ul' >
                {searchResults.map((result) => (
                  <li onClick={()=>{
                    navigate(`/opendj/${result.clubId}`)
                  }} className='search-dj-li' key={result.id} >
                    {`DJ Name: ${result.clubName} , ClubID: ${result.clubId}`}
                  </li>
                ))}
                {searchInput.length>0  && searchResults.length === 0 && <h5>No DJ Found</h5>}
              </ul>
            )}
          </div>
        </div>
      </div>
    );
  };
  
  export default SearchDj;
  
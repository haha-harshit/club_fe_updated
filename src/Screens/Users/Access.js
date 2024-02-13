// Access.js
import React, { useEffect } from 'react';
import { getAccessToken } from './AccessToken';

const Access = () => {
  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const accessToken = await getAccessToken();
        // Do something with the access token, e.g., make API requests to Spotify
        console.log(accessToken);
        alert(accessToken)
      } catch (error) {
        // Handle errors
      }
    };

    // Fetch access token when the component mounts
    fetchAccessToken();
    // Set up a timer to fetch a new token every hour (3600000 milliseconds)
    const tokenRefreshInterval = setInterval(fetchAccessToken, 3600000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(tokenRefreshInterval);
  }, []);

  // Rest of your component logic
};

export default Access;

import React, { useState, useEffect } from 'react';
import { Input, List, Avatar, Card, Button } from 'antd';
import '../../Styles/User Styles/SearchBar.css';
import Cookies from 'js-cookie';
import { getAccessToken } from './AccessToken';
const { Search } = Input;
const SearchBar = () => {
  const [accessToke, setaccessToken] = useState('');
  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const accessToken = await getAccessToken();
        // Do something with the access token, e.g., make API requests to Spotify
        setaccessToken(accessToken)
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
  const token = accessToke.length > 0 ? accessToke : "BQC1QA54Pe6QUf8L8HYpJ87ZzroK4Jmb3ige9J-Ihj2Cl-NQcUAFNJqRJum-TnmCmgNPWWQ7acUJzXAfAiB8UAwLwIQZQS2Q99R_AM3U8NsN7nnMbxDkw0Nqs6wiCwcYUEyL1f-9zcWdglqGz20o_Rwuia4ONzZLoP3EysdRVc6h7vNcOLHPOhReB8l1zefzzY6FS3BezP2B4ckS91lzt-HjLcpmPtOIUmdmDyHbjUuKHaeCzp64BvNr16RwMT--pbwIwRdKLTiuHHM9xpgnvKY2";
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isInputDisabled, setIsInputDisabled] = useState(false);

  useEffect(() => {
    const spotifyUrl = Cookies.get('spotifyUrl');
    if (spotifyUrl) {
      setIsInputDisabled(true);
    }
  }, []);

  const openSpotifySong = (uri, name) => {
    const trackId = uri.split(':')[2];
    const spotifyUrl = `https://open.spotify.com/track/${trackId}`;

    Cookies.set('spotifyUrl', spotifyUrl);
    Cookies.set('spotifyName', name);
    setIsInputDisabled(true);
    getSearchResults('');
  };

  const clearCookies = () => {
    Cookies.remove('spotifyUrl');
    Cookies.remove('spotifyName');
    setIsInputDisabled(false);
    setSearchQuery('');
  };

  const getSearchResults = (query) => {
    const access_token = token;
    setSearchQuery(query);

    fetch(`https://api.spotify.com/v1/search?q=${query}&type=track`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw Error('Response Not Ok');
        }
        return response;
      })
      .then((response) => response.json())
      .then(({ tracks }) => {
        const results = tracks.items.map((element) => {
          const artists = element.artists.map((artist) => artist.name);
          return (
            <List.Item
              key={element.uri}
              onClick={() => openSpotifySong(element.uri, element.name)}
              style={{ cursor: 'pointer' }}
            >
              <List.Item.Meta
                avatar={<Avatar shape="square" size="large" src={element.album.images[0].url} />}
                title={<p href="https://ant.design">{element.name}</p>}
                description={artists.join(', ')}
              />
            </List.Item>
          );
        });
        setSearchResults(results);
      })
      .catch((error) => setSearchResults([]));
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Input
        
        className='searchbarstyle-song'
        placeholder="Search favorite song here💗"
        onChange={(e) => getSearchResults(e.target.value)}
        value={searchQuery}
        disabled={isInputDisabled}
        suffix={
          isInputDisabled && (
            <>
            <p  style={{color:"#fff",padding:5,border:"1px solid rgb(237, 0, 142)"}}>{Cookies.get('spotifyName').slice(0,22)+"..."}</p>
            <Button style={{color:"red"}} type="link" onClick={clearCookies}>
              Clear
            </Button>
            </>

          )
        }
      />
      {searchResults.length > 0 && (
        <Card>
          <List itemLayout="horizontal">{searchResults}</List>
        </Card>
      )}
    </div>
  );
};

export default SearchBar;

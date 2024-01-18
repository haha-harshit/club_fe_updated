import React, { useState, useEffect } from 'react';
import { Input, List, Avatar, Card, Button } from 'antd';
import '../../Styles/User Styles/SearchBar.css';
import Cookies from 'js-cookie';
const { Search } = Input;

const SearchBar = () => {
  const token ="BQCK50fsLKslgg6RJGPDDIqg3qenJH7QYCSCGgQ22h8MnGJC2IuetCwkZABvn4o5Yru2Ei2dOEWIN-3FzSmrExVfxyKLqD38Yu8ZNpIKaqYtMk7ovxKRY5FV4ovgdKJnH9dRNjmi2Yhnefxc4p5sGJiuExAT_wPxF1htTzLIyfOnIPMzy5ejAnjd3ltRxQWIDYPo6Kzizfb2Bby_en0xBUliKEVoN-a9cMJfGwa6n5iLMsHaP8qSWbYpT326S7oSn6rkrHDetT7xhhyUXWNTnXev";
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
            <p style={{color:"#fff"}}>{Cookies.get('spotifyName').slice(0,30)+"..."}</p>
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

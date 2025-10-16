// hooks/useSpotify.js

import { useState, useEffect } from 'react';
import { getAccessToken, searchArtistAlbums } from '../services/spotifyService';

export const useSpotify = () => {

  const [accessToken, setAccessToken] = useState("");
  const [albums, setAlbums] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  // 2. useEffect pour obtenir le token au montage
  useEffect(() => {
    const fetchToken = async () => {
      const token = await getAccessToken();
      setAccessToken(token);
    };
    fetchToken();
  }, []);

  // 3. Fonction search
  const search = async () => {
    const albumsData = await searchArtistAlbums(searchInput, accessToken);
    setAlbums(albumsData);
  };

  // 4. Retourner tout ce dont le composant a besoin
  return {
    accessToken,
    albums,
    searchInput,
    setSearchInput,
    search
  };
};
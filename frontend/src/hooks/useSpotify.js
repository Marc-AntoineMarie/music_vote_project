// hooks/useSpotify.js

import { useState, useEffect } from 'react';
import { getAccessToken, searchArtistAlbums } from '../services/spotifyService';

export const useSpotify = () => {

  const [accessToken, setAccessToken] = useState("");
  const [albums, setAlbums] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // useEffect pour obtenir le token au montage
  useEffect(() => {
    const fetchToken = async () => {
      try {
        setLoading(true);
        setError(null);
        const token = await getAccessToken();
        setAccessToken(token);
      } catch (err) {
        setError("Impossible de se connecter à Spotify. Vérifiez vos clés API.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchToken();
  }, []);

  // Fonction search
  const search = async () => {
    if (!searchInput.trim()) {
      setError("Veuillez entrer un nom d'artiste");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const albumsData = await searchArtistAlbums(searchInput, accessToken);
      setAlbums(albumsData);
      
      if (albumsData.length === 0) {
        setError("Aucun artiste trouvé. Essayez un autre nom.");
      }
    } catch (err) {
      setError("Erreur lors de la recherche. Réessayez plus tard.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Retourner tout ce dont le composant a besoin
  return {
    accessToken,
    albums,
    searchInput,
    setSearchInput,
    search,
    error,
    loading
  };
};
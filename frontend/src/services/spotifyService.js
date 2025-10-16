    const clientId = import.meta.env.VITE_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET;

export const getAccessToken = async () => {
    try {
        let authParams = {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body:
            "grant_type=client_credentials&client_id=" +
            clientId +
            "&client_secret=" +
            clientSecret,
        };
    
        const result = await fetch("https://accounts.spotify.com/api/token", authParams);

        if (!result.ok) {
            throw new Error(`Erreur HTTP: ${result.status}`)
        }
          const data = await result.json();
          return data.access_token;
    } catch (error) {
      console.error('Erreur lors de la récupération du token spotify:', error);
      throw error;
    }
};

export const searchArtistAlbums = async (searchInput, accessToken) => {
    try {
      let artistParams = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      };
  
      // Get Artist
      const artistResponse = await fetch(
        "https://api.spotify.com/v1/search?q=" + searchInput + "&type=artist",
        artistParams
      );
  
      if (!artistResponse.ok) {
        throw new Error(`Erreur recherche artiste: ${artistResponse.status}`);
      }
  
      const artistData = await artistResponse.json();
      
      if (!artistData.artists.items || artistData.artists.items.length === 0) {
        console.warn("⚠️ Aucun artiste trouvé pour:", searchInput);
        return [];
      }
  
      const artistID = artistData.artists.items[0].id;
  
      // Get Artist Albums
      const albumsResponse = await fetch(
        "https://api.spotify.com/v1/artists/" +
          artistID +
          "/albums?include_groups=album&market=US&limit=50",
        artistParams
      );
  
      if (!albumsResponse.ok) {
        throw new Error(`Erreur récupération albums: ${albumsResponse.status}`);
      }
  
      const albumsData = await albumsResponse.json();
      return albumsData.items || [];
    } catch (error) {
      console.error("❌ Erreur lors de la recherche Spotify:", error);
      throw error;
    }
  };

export const formatAlbumForVote = (album) => {

        // Objet track avec infos sur l'album
        const newTrack = {
          trackId: album.id,                                    // ID unique Spotify
          trackName: album.name,                                // Nom de l'album
          artistName: album.artists?.[0]?.name || "Inconnu",   // Premier artiste (ou "Inconnu" si pas d'artiste)
          albumImage: album.images?.[0]?.url || "",            // Image de couverture (ou vide si pas d'image)
          albumUrl: album.external_urls?.spotify || "",        // Lien Spotify (ou vide si pas de lien)
          votes: 1,                                             // Commence avec 1 vote
          addedAt: Date.now()                                   // Timestamp pour savoir quand ajouté
        };
    
    return newTrack;
    
};    
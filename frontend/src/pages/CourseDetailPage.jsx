import "./CourseDetailPage.css";
import { useParams, useLocation, useNavigate } from 'react-router-dom'

import {
  FormControl,
  InputGroup,
  Container,
  Button,
  Card,
  Row,
} from "react-bootstrap";
import { useState, useEffect } from "react";

const clientId = import.meta.env.VITE_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET;

function CourseDetailPage() {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [albums, setAlbums] = useState([]);
  // localStorage charger au démarrage
  // https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
  const [musicVotes, setMusicVotes] = useState(() => { 
    const saved = localStorage.getItem('musicVotes');

    if (saved) {
      console.log("Données chargées depuis localStorage:", JSON.parse(saved));
      return JSON.parse(saved);
    }

    console.log("Aucune données trouvées dans localStorage");
    return {};
  });
  const { courseId } = useParams() // ID depuis l'URL
  const location = useLocation()   // Données passées
  const navigate = useNavigate()   // Pour retourner
  
  const cours = location.state?.cours

  console.log("🎵 Etat actuel de musicVotes:", musicVotes);
  console.log("📚 courseId actuel:", courseId);
  console.log("📖 Cours actuel:", cours);

  useEffect(() => {
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

    fetch("https://accounts.spotify.com/api/token", authParams)
      .then((result) => result.json())
      .then((data) => {
        setAccessToken(data.access_token);
      });
  }, []);

  async function search() {
    let artistParams = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };

    // Get Artist
    const artistID = await fetch(
      "https://api.spotify.com/v1/search?q=" + searchInput + "&type=artist",
      artistParams
    )
      .then((result) => result.json())
      .then((data) => {
        return data.artists.items[0].id;
      });

    // Get Artist Albums
    await fetch(
      "https://api.spotify.com/v1/artists/" +
        artistID +
        "/albums?include_groups=album&market=US&limit=50",
      artistParams
    )
      .then((result) => result.json())
      .then((data) => {
        setAlbums(data.items);
      });
  }

  const addMusicVote = (album) => {

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

    console.log("Ajout de:", newTrack.trackName);

    // Maj state avec callback fonction
    // https://react.dev/reference/react/useState#updating-state-based-on-the-previous-state
    setMusicVotes((prevVotes) => {
      const updatedVotes = { ...prevVotes };

      // Array vide si !cour
      if (!updatedVotes[courseId]) {
        updatedVotes[courseId] = [];
        console.log("Creation de la liste pour le cours:", courseId);
      }

      const existingTrackIndex = updatedVotes[courseId].findIndex(
        (track) => track.trackId === newTrack.trackId
      );

      if (existingTrackIndex >= 0) {
        updatedVotes[courseId][existingTrackIndex].votes += 1;
        console.log("✅ Vote incrémenté ! Total:", updatedVotes[courseId][existingTrackIndex].votes);
      } else {
        updatedVotes[courseId].push(newTrack);
        console.log("🆕 Nouvelle musique ajoutée !");
      }
    

    console.log("Etat complet:", updatedVotes);

    // Sauvegarder dans localStorage
    // https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
    // JSON.stringify convertit l'objet JS en texte
    localStorage.setItem('musicVotes', JSON.stringify(updatedVotes));
    console.log("Donnees sauvegardees dans localStorage");
    
    return updatedVotes;
  });
};

  return (
    
    <>
    <div>
        <button onClick={() => navigate(-1)}>Retour</button>
        <h1>Cours : {cours?.mat}</h1>
        {/* Affichage des musiques votées */}
        {musicVotes[courseId] && musicVotes[courseId].length > 0 && (
          <div style={{ 
            backgroundColor: "#f8f9fa", 
            padding: "20px", 
            borderRadius: "10px", 
            marginBottom: "20px",
            marginTop: "20px"
          }}>
            <h2>🎵 Musiques votées ({musicVotes[courseId].length})</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {musicVotes[courseId]
                .sort((a, b) => b.votes - a.votes)
                .map((track) => (
                  <div 
                    key={track.trackId}
                    style={{
                      backgroundColor: "white",
                      padding: "15px",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      gap: "15px",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                    }}
                  >
                    <img 
                      src={track.albumImage} 
                      alt={track.trackName}
                      style={{ width: "60px", height: "60px", borderRadius: "5px" }}
                    />
                    <div style={{ flex: 1 }}>
                      <strong>{track.trackName}</strong>
                      <br />
                      <span style={{ color: "#666" }}>{track.artistName}</span>
                    </div>
                    <div style={{ 
                      fontSize: "24px", 
                      fontWeight: "bold", 
                      color: "#1DB954",
                      minWidth: "60px",
                      textAlign: "center"
                    }}>
                      ⬆ {track.votes}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      <Container>
        <InputGroup>
          <FormControl
            placeholder="Search For Artist"
            type="input"
            aria-label="Search for an Artist"
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                search();
              }
            }}
            onChange={(event) => setSearchInput(event.target.value)}
            style={{
              width: "300px",
              height: "35px",
              borderWidth: "0px",
              borderStyle: "solid",
              borderRadius: "5px",
              marginRight: "10px",
              paddingLeft: "10px",
            }}
          />
          <Button onClick={search}>Search</Button>
        </InputGroup>
      </Container>

      <Container>
        <Row
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-around",
            alignContent: "center",
          }}
        >
          {albums.map((album) => {
            return (
              <Card
                key={album.id}
                style={{
                  backgroundColor: "white",
                  margin: "10px",
                  borderRadius: "5px",
                  marginBottom: "30px",
                }}
              >
                <Card.Img
                  width={200}
                  src={album.images[0].url}
                  style={{
                    borderRadius: "4%",
                  }}
                />
                <Card.Body>
                  <Card.Title
                    style={{
                      whiteSpace: "wrap",
                      fontWeight: "bold",
                      maxWidth: "200px",
                      fontSize: "18px",
                      marginTop: "10px",
                      color: "black",
                    }}
                  >
                    {album.name}
                  </Card.Title>
                  <Card.Text
                    style={{
                      color: "black",
                    }}
                  >
                    Release Date: <br /> {album.release_date}
                  </Card.Text>
                  <Button
                    href={album.external_urls.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "15px",
                      borderRadius: "5px",
                      padding: "10px",
                    }}
                  >
                    Album Link
                  </Button>
                  <Button
                    onClick={() => addMusicVote(album)}
                    style={{
                      backgroundColor: "#1DB954",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "15px",
                      borderRadius: "5px",
                      padding: "10px",
                      marginTop: "10px",
                      width: "100%"
                    }}
                  >
                    Tester Vote
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </Row>
      </Container>
    </div>
    </>
  );
}

export default CourseDetailPage
import "./CourseDetailPage.css";
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { useMusicVotes } from '../hooks/useMusicVote';
import { useSpotify } from "../hooks/useSpotify";
import { useState, useEffect } from "react";
import {
  FormControl,
  InputGroup,
  Container,
  Button,
  Card,
  Row,
} from "react-bootstrap";

function CourseDetailPage() {
  // localStorage charger au démarrage
  // https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
  const { accessToken, albums, searchInput, setSearchInput, search, error, loading } = useSpotify();
  const { courseId } = useParams() // ID depuis l'URL
  const { musicVotes, addMusicVote, incrementVote, decrementVote } = useMusicVotes(courseId);
  const location = useLocation()   // Données passées
  const navigate = useNavigate()   // Pour retourner
  
  const cours = location.state?.cours

  console.log("🎵 Etat actuel de musicVotes:", musicVotes);
  console.log("📚 courseId actuel:", courseId);
  console.log("📖 Cours actuel:", cours);

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
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "5px"
                    }}>
                      {/* Upvote */}
                      <button onClick={() => incrementVote(track.trackId)}
                      style={{
                        backgroundColor: "#1DB954",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        padding: "5px 10px",
                        fontSize: "18px",
                        cursor: "pointer",
                        fontWeight: "bold"
                      }}
                        onMouseOver={(e) => e.target.style.backgroundColor = "#1ed760"}
                        onMouseOut={(e) => e.target.style.backgroundColor = "#1DB954"}
                        >
                        ⬆
                      </button>
                      {/* Vote counter */}
                      <div style={{ 
                        fontSize: "20px", 
                        fontWeight: "bold", 
                        color: "#333",
                        minWidth: "40px",
                        textAlign: "center"
                      }}>
                        {track.votes}
                      </div>
                      {/* Downvote */}
                      <button onClick={() => decrementVote(track.trackId)}
                      style={{
                        backgroundColor: "#ff4444",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        padding: "5px 10px",
                        fontSize: "18px",
                        cursor: "pointer",
                        fontWeight: "bold"
                      }}
                        onMouseOver={(e) => e.target.style.backgroundColor = "#ff6666"}
                        onMouseOut={(e) => e.target.style.backgroundColor = "#ff4444"}
                        >
                        ⬇
                      </button>
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
          <Button onClick={search} disabled={loading}>{loading ? "🔄 Recherche..." : "Search"}</Button>
        </InputGroup>
           {/* Affichage des erreurs */}
           {error && (
          <div style={{
            backgroundColor: "#f8d7da",
            color: "#721c24",
            padding: "10px",
            borderRadius: "5px",
            marginTop: "10px",
            border: "1px solid #f5c6cb"
          }}>
            ⚠️ {error}
          </div>
        )}

        {/* Indicateur de chargement */}
        {loading && (
          <div style={{
            textAlign: "center",
            padding: "20px",
            fontSize: "18px"
          }}>
            🔄 Chargement...
          </div>
        )}
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
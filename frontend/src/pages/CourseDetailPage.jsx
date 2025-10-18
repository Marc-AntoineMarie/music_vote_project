import "./CourseDetailPage.css";
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { useMusicVotes } from '../hooks/useMusicVote';
import { useSpotify } from "../hooks/useSpotify";
import { useState, useEffect } from "react";
import { ErrorMessage } from "../components/atoms/ErrorMessage";
import { LoadingSpinner } from "../components/atoms/LoadingSpinner";
import { SearchBar } from "../components/molecules/SearchBar";
import { Container, Flex, Grid, Button, Heading } from "@radix-ui/themes";
import { AlbumCard } from "../components/molecules/AlbumCard";
import { MusicVoteList } from "../components/organisms/MusicVoteList";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

function CourseDetailPage() {
  // localStorage charger au démarrage
  // https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
  const { accessToken, albums, searchInput, setSearchInput, search, error, loading } = useSpotify();
  const { courseId } = useParams() // ID depuis l'URL
  const { musicVotes, addMusicVote, incrementVote, decrementVote } = useMusicVotes(courseId);
  const location = useLocation()   // Données passées
  const navigate = useNavigate()   // Pour retourner
  
  const cours = location.state?.cours

  console.log("Etat actuel de musicVotes:", musicVotes);
  console.log("courseId actuel:", courseId);
  console.log("Cours actuel:", cours);

  return (
    
  <Container size="4" p="4">
    <Flex direction="column" gap="4">
      {/* Header */}
      <Flex align="center" gap="3">
        <Button variant="soft" onClick={() => navigate(-1)}>
          <ArrowLeftIcon /> Retour
        </Button>
        <Heading size="7">{cours?.mat}</Heading>
      </Flex>

      {/* Musiques votées */}
      <MusicVoteList 
        tracks={musicVotes[courseId]}
        onUpvote={incrementVote}
        onDownvote={decrementVote}
      />

      {/* Recherche */}
      <Flex direction="column" gap="3">
        <SearchBar 
          value={searchInput}
          onChange={setSearchInput}
          onSearch={search}
          loading={loading}
        />
        <ErrorMessage message={error} />
        {loading && <LoadingSpinner message="Recherche en cours..." />}
      </Flex>

      {/* Albums */}
      <Grid columns="3" gap="4" width="auto">
        {albums.map((album) => (
          <AlbumCard 
            key={album.id}
            album={album}
            onVote={addMusicVote}
          />
        ))}
      </Grid>
    </Flex>
  </Container>
);
}

export default CourseDetailPage
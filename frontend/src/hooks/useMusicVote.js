import { useState } from "react";
import { formatAlbumForVote } from "../services/spotifyService";

export const useMusicVotes = (courseId) => {
    
  const [musicVotes, setMusicVotes] = useState(() => {
    const saved = localStorage.getItem('musicVotes');

    if (saved) {
      console.log("donnees chargees depuis localStorage:", JSON.parse(saved));
      return JSON.parse(saved);
    }

    console.log("Aucune donnees trouvées dans localStorage");
    return {};
  });

  const addMusicVote = (album) => {
    const newTrack = formatAlbumForVote(album);
    
    console.log("Ajout de:", newTrack.trackName);

    setMusicVotes((prevVotes) => {
      const updatedVotes = { ...prevVotes };

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

      localStorage.setItem('musicVotes', JSON.stringify(updatedVotes));
      console.log("Donnees sauvegardees dans localStorage");
      
      return updatedVotes;
    });
  };

  const incrementVote = (trackId) => {
    console.log("⬆ Increment vote pour trackId:", trackId);
    
    setMusicVotes((prevVotes) => {
      const updatedVotes = { ...prevVotes };
      
      if (!updatedVotes[courseId]) {
        console.log("Cours non trouvé");
        return prevVotes;
      }
      
      const trackIndex = updatedVotes[courseId].findIndex(
        (track) => track.trackId === trackId
      );
      
      if (trackIndex >= 0) {
        updatedVotes[courseId][trackIndex].votes += 1;
        console.log("✅ Vote incrémenté ! Total:", updatedVotes[courseId][trackIndex].votes);
        
        localStorage.setItem('musicVotes', JSON.stringify(updatedVotes));
        console.log("💾 Données sauvegardées");
      } else {
        console.log("❌ Musique non trouvée");
      }
      
      return updatedVotes;
    });
  };

  const decrementVote = (trackId) => {
    console.log("⬇ Decrement vote pour trackId:", trackId);
    
    setMusicVotes((prevVotes) => {
      const updatedVotes = { ...prevVotes };
      
      if (!updatedVotes[courseId]) {
        console.log("Cours non trouvé");
        return prevVotes;
      }
      
      const trackIndex = updatedVotes[courseId].findIndex(
        (track) => track.trackId === trackId
      );
      
      if (trackIndex >= 0) {
        updatedVotes[courseId][trackIndex].votes -= 1;
        console.log("⬇ Vote décrémenté ! Total:", updatedVotes[courseId][trackIndex].votes);
        
        if (updatedVotes[courseId][trackIndex].votes <= 0) {
          console.log("Suppression de la musique (votes = 0)");
          updatedVotes[courseId].splice(trackIndex, 1);
        }
        
        localStorage.setItem('musicVotes', JSON.stringify(updatedVotes));
        console.log("Données sauvegardées");
      } else {
        console.log("Musique non trouvée");
      }
      
      return updatedVotes;
    });
  };
    
  return {
    musicVotes,
    setMusicVotes,
    addMusicVote,
    incrementVote,
    decrementVote,
  };
};
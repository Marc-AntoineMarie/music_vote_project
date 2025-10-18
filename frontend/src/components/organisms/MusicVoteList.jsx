import { Box, Flex, Heading } from "@radix-ui/themes";
import { VotedMusicCard } from "../molecules/VotedMusicCard";

export const MusicVoteList = ({ tracks, onUpvote, onDownvote }) => {
  if (!tracks || tracks.length === 0) {
    return null;
  }

  const sortedTracks = [...tracks].sort((a, b) => b.votes - a.votes);

  return (
    <Box style={{ marginTop: "20px", marginBottom: "20px" }}>
      <Heading size="6" mb="4">
        🎵 Musiques votées ({tracks.length})
      </Heading>
      <Flex direction="column" gap="3">
        {sortedTracks.map((track) => (
          <VotedMusicCard
            key={track.trackId}
            track={track}
            onUpvote={onUpvote}
            onDownvote={onDownvote}
          />
        ))}
      </Flex>
    </Box>
  );
};
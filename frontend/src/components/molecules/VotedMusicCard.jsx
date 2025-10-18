import { Card, Flex, Text, IconButton, Badge } from "@radix-ui/themes";
import { ChevronUpIcon, ChevronDownIcon } from "@radix-ui/react-icons";

export const VotedMusicCard = ({ track, onUpvote, onDownvote }) => {
  return (
    <Card>
      <Flex gap="3" align="center" p="2">
        {/* Image de l'album */}
        <img 
          src={track.albumImage} 
          alt={track.trackName}
          style={{ 
            width: "60px", 
            height: "60px", 
            borderRadius: "var(--radius-2)",
            objectFit: "cover"
          }}
        />
        
        {/* Infos de la musique */}
        <Flex direction="column" gap="1" style={{ flex: 1 }}>
          <Text size="3" weight="bold">{track.trackName}</Text>
          <Text size="2" color="gray">{track.artistName}</Text>
        </Flex>
        
        {/* Boutons de vote */}
        <Flex direction="column" align="center" gap="1">
          <IconButton 
            size="2" 
            variant="soft" 
            color="green"
            onClick={() => onUpvote(track.trackId)}
          >
            <ChevronUpIcon />
          </IconButton>
          
          <Badge size="2" color="brown">{track.votes}</Badge>
          
          <IconButton 
            size="2" 
            variant="soft" 
            color="red"
            onClick={() => onDownvote(track.trackId)}
          >
            <ChevronDownIcon />
          </IconButton>
        </Flex>
      </Flex>
    </Card>
  );
};
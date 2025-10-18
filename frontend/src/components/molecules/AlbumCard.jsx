import { Card, Flex, Heading, Text, Button } from "@radix-ui/themes";

export const AlbumCard = ({ album, onVote }) => {
  return (
    <Card>
      <img 
        src={album.images[0].url}
        alt={album.name}
        style={{ width: "100%", height: "200px", objectFit: "cover" }}
      />
      <Flex direction="column" gap="3" p="3">
        <Heading size="3">{album.name}</Heading>
        <Text size="2" color="gray">Release: {album.release_date}</Text>
        
        <Button asChild variant="soft">
          <a 
            href={album.external_urls.spotify} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Album Link
          </a>
        </Button>
        
        <Button onClick={() => onVote(album)} color="green">
          Tester Vote
        </Button>
      </Flex>
    </Card>
  );
};
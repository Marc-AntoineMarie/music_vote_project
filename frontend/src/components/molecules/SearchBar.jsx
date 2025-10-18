import { Flex, TextField, Button } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

export const SearchBar = ({ 
  value, 
  onChange, 
  onSearch, 
  placeholder = "Search For Artist",
  loading = false 
}) => {
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onSearch();
    }
  };

  return (
    <Flex gap="2" align="center" style={{ maxWidth: "600px" }}>
      <TextField.Root
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        size="3"
        style={{ flex: 1 }}
      >
        <TextField.Slot>
          <MagnifyingGlassIcon height="16" width="16" />
        </TextField.Slot>
      </TextField.Root>
      
      <Button 
        onClick={onSearch} 
        disabled={loading}
        size="3"
      >
        {loading ? "🔄 Recherche..." : "Search"}
      </Button>
    </Flex>
  );
};
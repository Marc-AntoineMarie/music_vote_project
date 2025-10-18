import { Flex, Spinner, Text } from "@radix-ui/themes";

export const LoadingSpinner = ({ message = "Chargement" }) => {
  return (
    <Flex direction="column" align="center" gap="3" style={{ padding: "20px" }}>
      <Spinner size="3" />
      <Text size="3">{message}</Text>
    </Flex>
  );
};
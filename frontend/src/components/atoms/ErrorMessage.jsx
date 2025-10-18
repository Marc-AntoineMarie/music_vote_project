import { Callout } from "@radix-ui/themes";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export const ErrorMessage = ({ message }) => {
  if (!message) return null;

  return (
    <Callout.Root 
      color="red" 
      style={{ 
        marginTop: "10px",
        maxWidth: "600px"
      }}
    >
      <Callout.Icon>
        <ExclamationTriangleIcon />
      </Callout.Icon>
      <Callout.Text>{message}</Callout.Text>
    </Callout.Root>
  );
};

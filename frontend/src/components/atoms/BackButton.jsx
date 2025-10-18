// src/components/atoms/BackButton.jsx
import { Button } from "@radix-ui/themes";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

export const BackButton = ({ onClick, children = "Retour" }) => {
  return (
    <Button variant="soft" onClick={onClick}>
      <ArrowLeftIcon />
      {children}
    </Button>
  );
};
import { Button } from "@mantine/core";
import { IconArrowForward } from "@tabler/icons";

const VisitButton = ({ link }) => {
  return (
    <Button
      color="teal"
      component={"a"}
      href={link}
      leftIcon={<IconArrowForward />}
      rel="noopener noreferrer"
      target="_blank"
    >
      Visit
    </Button>
  );
};

export default VisitButton;

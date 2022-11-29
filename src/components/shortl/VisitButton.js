import { Button } from "@mantine/core";
import { IconArrowForward } from "@tabler/icons";
import Link from "next/link";

const VisitButton = ({ link }) => {
  return (
    <Button
      color="teal"
      component={Link}
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

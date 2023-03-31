import Link from "next/link";
import { Button } from "@mantine/core";
import { IconArrowForward } from "@tabler/icons-react";

type VisitButtonProps = {
  slug: string;
};
export default function VisitButton({ slug }: VisitButtonProps) {
  return (
    <Button
      color={"teal"}
      component={Link}
      href={`/${slug}`}
      leftIcon={<IconArrowForward />}
      rel={"noopener noreferrer"}
      target={"_blank"}
    >
      Visit
    </Button>
  );
}

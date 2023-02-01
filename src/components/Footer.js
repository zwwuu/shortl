import { ActionIcon, Anchor, Container, Group, Text } from "@mantine/core";
import { IconBrandGithub, IconMail } from "@tabler/icons-react";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <Container component={"footer"} mt={"auto"} py={"sm"} sx={{ width: "100%" }}>
        <Group position={"apart"}>
          <Text>{`© ${new Date().getFullYear()} ${process.env.NEXT_PUBLIC_APP_TITLE}`}</Text>
          <Group>
            <Anchor component={Link} href="/privacy-policy" mr={"xs"}>
              Privacy Policy
            </Anchor>
            <ActionIcon
              aria-label="View source code on GitHub"
              component="a"
              href={process.env.NEXT_PUBLIC_APP_REPO}
              mr={"xs"}
            >
              <IconBrandGithub />
            </ActionIcon>
            <ActionIcon
              aria-label="Contact"
              component="a"
              href={`mailto:${process.env.NEXT_PUBLIC_APP_EMAIL}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              <IconMail />
            </ActionIcon>
          </Group>
        </Group>
      </Container>
    </>
  );
};

export default Footer;

import Link from "next/link";
import { ActionIcon, Anchor, Box, Container, Group, Text } from "@mantine/core";
import { IconBrandGithub, IconMail } from "@tabler/icons-react";

export default function Footer() {
  return (
    <Box component={"footer"}>
      <Container py={"sm"}>
        <Group position={"apart"}>
          <Text>{`© ${new Date().getFullYear()} ${process.env.NEXT_PUBLIC_APP_TITLE}`}</Text>
          <Group spacing={"sm"}>
            <Anchor component={Link} href={"/privacy-policy"}>
              Privacy Policy
            </Anchor>
            <ActionIcon
              aria-label={"View source code on GitHub"}
              component={"a"}
              href={process.env.NEXT_PUBLIC_APP_REPO}
              rel={"noopener noreferrer"}
              target={"_blank"}
            >
              <IconBrandGithub />
            </ActionIcon>
            <ActionIcon
              aria-label={"Contact"}
              component={"a"}
              href={`mailto:${process.env.NEXT_PUBLIC_APP_EMAIL}`}
              rel={"noopener noreferrer"}
              target={"_blank"}
            >
              <IconMail />
            </ActionIcon>
          </Group>
        </Group>
      </Container>
    </Box>
  );
}

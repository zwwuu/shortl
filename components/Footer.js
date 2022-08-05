import { ActionIcon, Box, Container, Text } from "@mantine/core";
import { IconBrandGithub, IconMail } from "@tabler/icons";

const Footer = () => {
  return (
    <>
      <Container component={"footer"} mt={"auto"} py={"sm"} sx={{ width: "100%" }}>
        <Text size={"sm"} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Text>{`© ${new Date().getFullYear()} ${process.env.NEXT_PUBLIC_APP_TITLE}`}</Text>
          <Box sx={{ display: "flex" }}>
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
          </Box>
        </Text>
      </Container>
    </>
  );
};

export default Footer;

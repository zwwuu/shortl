import { Box, Text, Title } from "@mantine/core";

const Hero = () => {
  return (
    <Box>
      <Text color="dimmed" size="sm">
        <span>Shortl is a link shortener with password protection.</span>
      </Text>
      <Title mb={"sm"} order={1}>
        {"More than just "}
        <Text gradient={{ from: "blue", to: "cyan", deg: 45 }} variant="gradient" inherit span>
          shorter
        </Text>
        {" links"}
      </Title>
      <Text size={"lg"}>Create short, memorable, and encrypted links in seconds.</Text>
    </Box>
  );
};

export default Hero;

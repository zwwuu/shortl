import { Box, Text, Title } from "@mantine/core";

const Hero = () => {
  return (
    <Box>
      <Text color="dimmed" component={"p"} size="sm">
        Shortl is a link shortener with password protection.{" "}
      </Text>
      <Title mb={"sm"} order={1}>
        {"More than just "}
        <Text component={"span"} gradient={{ from: "blue", to: "cyan", deg: 45 }} variant="gradient" inherit>
          shorter
        </Text>
        {" links"}
      </Title>
      <Text component={"p"} my={0} size={"lg"}>
        Create short, memorable, and encrypted links in seconds.
      </Text>
    </Box>
  );
};

export default Hero;

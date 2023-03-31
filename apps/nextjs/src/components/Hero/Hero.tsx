import process from "process";
import { Box, Text, Title } from "@mantine/core";

const Hero = () => {
  return (
    <Box>
      <Title order={1} size={"h4"} weight={400}>
        <Text color={"blue"} weight={700} span>
          {process.env.NEXT_PUBLIC_APP_TITLE}
        </Text>
        {" is a link shortener with password protection"}
      </Title>
      <Title order={1} size={"h1"}>
        {"More than just "}
        <Text gradient={{ from: "blue", to: "cyan", deg: 45 }} variant={"gradient"} inherit span>
          shorter
        </Text>
        {" links"}
      </Title>
      <Text component={"p"} m={0} size={"lg"}>
        Create short, memorable, and encrypted links in seconds.
      </Text>
    </Box>
  );
};

export default Hero;

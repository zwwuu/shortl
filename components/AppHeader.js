import { ActionIcon, Anchor, Box, Container, Header, useMantineColorScheme } from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons";
import Link from "next/link";

const AppHeader = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return (
    <>
      <Header height={64}>
        <Container sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: "100%" }}>
          <Box />
          <Link href={"/"} passHref>
            <Anchor>
              <img
                alt={`${process.env.NEXT_PUBLIC_APP_TITLE} brand logo`}
                height={20}
                src={"/images/brand.svg"}
                width={90}
              />
            </Anchor>
          </Link>
          <ActionIcon variant="outline" onClick={toggleColorScheme}>
            {dark ? <IconSun /> : <IconMoon />}
          </ActionIcon>
        </Container>
      </Header>
    </>
  );
};

export default AppHeader;

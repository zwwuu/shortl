import { ActionIcon, Anchor, Box, Container, Header, useMantineColorScheme } from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/images/brand.svg";

const AppHeader = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return (
    <>
      <Header height={64}>
        <Container sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: "100%" }}>
          <Box />
          <Anchor component={Link} href={"/"}>
            <Image
              alt={`${process.env.NEXT_PUBLIC_APP_TITLE} logo`}
              height={logo.height}
              src={logo}
              width={logo.width}
            />
          </Anchor>
          <ActionIcon variant="outline" onClick={toggleColorScheme}>
            {dark ? <IconSun /> : <IconMoon />}
          </ActionIcon>
        </Container>
      </Header>
    </>
  );
};

export default AppHeader;

import Image from "next/image";
import Link from "next/link";
import { ActionIcon, Anchor, Box, Container, Header, useMantineColorScheme } from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";

export default function AppHeader() {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return (
    <Header height={64}>
      <Container sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: "100%" }}>
        <Box />
        <Anchor component={Link} href={"/"}>
          <Image alt={`${process.env.NEXT_PUBLIC_APP_TITLE} logo`} height={80} src={"/images/logo.png"} width={80} />
        </Anchor>
        <ActionIcon title={"Toggle theme"} variant={"outline"} onClick={() => toggleColorScheme()}>
          {dark ? <IconSun /> : <IconMoon />}
        </ActionIcon>
      </Container>
    </Header>
  );
}

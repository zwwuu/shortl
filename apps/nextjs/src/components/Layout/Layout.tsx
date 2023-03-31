import { ReactNode } from "react";
import { Box } from "@mantine/core";

import AppHeader from "~/components/AppHeader/AppHeader";
import Footer from "~/components/Footer/Footer";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppHeader />
      {children}
      <Footer />
    </Box>
  );
}

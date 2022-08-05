import { Box } from "@mantine/core";
import AppHeader from "./AppHeader";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppHeader />
      <Box my={"xl"}>{children}</Box>
      <Footer />
    </Box>
  );
};

export default Layout;

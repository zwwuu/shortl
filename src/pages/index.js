import { Box, Container, Grid } from "@mantine/core";
import Script from "next/script";
import Hero from "../components/Hero";
import History from "../components/History";
import ShortlForm from "../components/ShortlForm";
import { HistoryProvider } from "../context/HistoryContext";
import Ad from "../components/Ad";

const HomePage = () => {
  return (
    <>
      <Script src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_KEY}`} />
      <HistoryProvider>
        <Container size={"xl"}>
          <Grid gutter="xl">
            <Grid.Col span={12}>
              <Hero />
            </Grid.Col>
            <Grid.Col
              md={5}
              sx={(theme) => ({
                [`@media (min-width: ${theme.breakpoints.md}px)`]: {
                  position: "sticky",
                  top: "1rem",
                },
              })}
              xs={12}
            >
              <Box mb={"md"}>
                <ShortlForm />
              </Box>
              <Ad />
            </Grid.Col>
            <Grid.Col md={7} xs={12}>
              <History />
            </Grid.Col>
          </Grid>
        </Container>
      </HistoryProvider>
    </>
  );
};

export default HomePage;

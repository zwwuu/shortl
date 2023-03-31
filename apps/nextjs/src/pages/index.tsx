import { Box, Container, Grid } from "@mantine/core";

import ShortlForm from "~/components/Forms/ShortlForm";
import Hero from "~/components/Hero/Hero";
import History from "~/components/History/History";
import { HistoryProvider } from "~/context/HistoryContext";

export default function HomePage() {
  return (
    <HistoryProvider>
      <Box mb={"auto"}>
        <Container py={"xl"} size={"xl"}>
          <Box mb={"md"}>
            <Hero />
          </Box>
          <Grid align={"flex-start"} gutter={"xl"}>
            <Grid.Col
              md={5}
              sx={(theme) => ({
                [theme.fn.largerThan("md")]: {
                  position: "sticky",
                  top: "1rem",
                },
              })}
              xs={12}
            >
              <ShortlForm />
            </Grid.Col>
            <Grid.Col md={7} xs={12}>
              <History />
            </Grid.Col>
          </Grid>
        </Container>
      </Box>
    </HistoryProvider>
  );
}

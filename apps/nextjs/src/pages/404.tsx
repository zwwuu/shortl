import { Container, Text, Title } from "@mantine/core";
import { NextSeo } from "next-seo";

export default function NotFoundPage() {
  return (
    <>
      <NextSeo noindex={true} title={"Not Found"} />
      <Container my={"auto"} py={"xl"} size={"xs"}>
        <Title align={"center"} order={1} sx={{ position: "relative" }}>
          <Text
            mb={"md"}
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              opacity: 0.2,
              transform: "scale(10)",
              pointerEvents: "none",
            }}
            span
          >
            404
          </Text>
          Page not found
        </Title>
      </Container>
    </>
  );
}

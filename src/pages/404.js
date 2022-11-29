import { Container, Title } from "@mantine/core";
import { NextSeo } from "next-seo";

// 404 page
const NotFoundPage = () => {
  return (
    <>
      <NextSeo noindex={true} title={"Not Found"} />
      <Container size={"xs"}>
        <Title align={"center"} mb={"md"} order={1}>
          404 Page not found
        </Title>
      </Container>
    </>
  );
};

export default NotFoundPage;

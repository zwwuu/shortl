import { Container, Title } from "@mantine/core";
import Image from "next/image";
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
        <Image alt="Blank canvas" height={568} src={"/images/blank_canvas.svg"} width={551} />
      </Container>
    </>
  );
};

export default NotFoundPage;

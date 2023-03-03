import { Box, Container } from "@mantine/core";
import Script from "next/script";
import PasswordForm from "../components/PasswordForm";
import prisma from "../lib/prisma";
import { NextSeo } from "next-seo";
import Ad from "../components/Ad";

const RedirectPage = ({ slug }) => {
  return (
    <>
      <NextSeo title="Redirect" />
      <Script src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_KEY}`} />
      <Container size={"xs"}>
        <Box mb={"md"}>
          <PasswordForm slug={slug} />
        </Box>
        <Ad />
      </Container>
    </>
  );
};

export default RedirectPage;

export async function getServerSideProps({ params }) {
  const slug = params.slug;
  const shortl = await prisma.shortl.findUnique({
    where: { slug: slug },
    select: {
      slug: true,
    },
  });

  return shortl ? { props: { slug } } : { notFound: true };
}

import { useEffect } from "react";
import { useRouter } from "next/router";
import Script from "next/script";
import { Box, Container, Text } from "@mantine/core";
import { NextSeo } from "next-seo";

import { api } from "~/utils/api";
import PasswordForm from "~/components/Forms/PasswordForm";

export default function RedirectPage() {
  const router = useRouter();
  const slug = router.query.slug as string;
  const shortlQuery = api.shortl.findOne.useQuery(
    { slug },
    {
      retry: false,
      enabled: false,
      async onError() {
        await router.replace("404");
      },
    },
  );

  useEffect(() => {
    void (async () => {
      if (router.isReady) {
        await shortlQuery.refetch();
      }
    })();
  }, [router.isReady, shortlQuery]);

  return (
    <>
      <NextSeo title={"Redirect"} />
      <Script data-cfasync={"false"} src={"//ophoacit.com/1?z=5843059"} async />
      <Box my={"auto"}>
        <Container py={"xl"} size={"xs"}>
          {shortlQuery.isLoading && <Text align={"center"}>Loading...</Text>}
          {shortlQuery.isSuccess && <PasswordForm slug={slug} />}
        </Container>
      </Box>
    </>
  );
}

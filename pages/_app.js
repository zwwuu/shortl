import { ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { useColorScheme, useLocalStorage } from "@mantine/hooks";
import { DefaultSeo } from "next-seo";
import { useRouter } from "next/router";
import Script from "next/script";
import { useEffect } from "react";
import Layout from "../components/Layout";
import { pageview } from "../lib/gtag";
import SEO from "../lib/seo";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useLocalStorage({
    key: "color-scheme",
    defaultValue: preferredColorScheme,
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = () => {
    setColorScheme(colorScheme === "dark" ? "light" : "dark");
  };

  const fontFamily = [
    "Poppins",
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    "Helvetica",
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
  ].join(",");

  useEffect(() => {
    router.events.on("routeChangeComplete", pageview);
    return () => {
      router.events.off("routeChangeComplete", pageview);
    };
  }, [router.events]);

  return (
    <>
      <DefaultSeo {...SEO} />
      <Script
        dangerouslySetInnerHTML={{
          __html: `
          (function(w, d, s, l, i) {
          w[l] = w[l] || [];
          w[l].push({
          "gtm.start":
          new Date().getTime(), event: "gtm.js"
        });
          var f = d.getElementsByTagName(s)[0],
          j = d.createElement(s), dl = l != "dataLayer" ? "&l=" + l : "";
          j.async = true;
          j.src =
          "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
          f.parentNode.insertBefore(j, f);
        })(window, document, "script", "dataLayer", "${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}");
        `,
        }}
        id="google-analytics"
        strategy="afterInteractive"
      />
      <Script
        crossOrigin="anonymous"
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID}`}
        strategy="afterInteractive"
        async
      />
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider
          theme={{
            colorScheme: colorScheme,
            fontFamily: fontFamily,
            headings: {
              fontFamily: fontFamily,
            },
          }}
          withGlobalStyles
          withNormalizeCSS
        >
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}

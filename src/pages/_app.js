import { ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { useColorScheme, useLocalStorage } from "@mantine/hooks";
import { DefaultSeo } from "next-seo";
import Layout from "../components/Layout";
import SEO from "../lib/seo";
import { Poppins } from "next/font/google";
import { RouterTransition } from "../components/RouterTransition";
import { event, GoogleAnalytics } from "nextjs-google-analytics";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function App({ Component, pageProps }) {
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
    poppins.style.fontFamily,
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

  return (
    <>
      <DefaultSeo {...SEO} />
      <GoogleAnalytics trackPageViews />
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
          <RouterTransition />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}

export function reportWebVitals(metric) {
  event(metric.name, {
    event_category: metric.label === "web-vital" ? "Web Vitals" : "custom metric",
    value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value), // values must be integers
    event_label: metric.id, // id unique to current page load
    non_interaction: true, // avoids affecting bounce rate.
  });
}

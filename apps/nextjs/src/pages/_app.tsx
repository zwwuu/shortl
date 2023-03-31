import type { AppType, NextWebVitalsMetric } from "next/app";
import { Poppins } from "next/font/google";
import { ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { useColorScheme, useLocalStorage } from "@mantine/hooks";
import { DefaultSeo } from "next-seo";
import { GoogleAnalytics, event } from "nextjs-google-analytics";

import { api } from "~/utils/api";
import Layout from "~/components/Layout/Layout";
import RouterTransition from "~/components/RouterTransition/RouterTransition";
import SEO from "~/lib/seo";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

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

const App: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useLocalStorage({
    key: "color-scheme",
    defaultValue: preferredColorScheme,
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = () => {
    setColorScheme(colorScheme === "dark" ? "light" : "dark");
  };

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
};

export default api.withTRPC(App);

export function reportWebVitals(metric: NextWebVitalsMetric) {
  event(metric.name, {
    event_category: metric.label === "web-vital" ? "Web Vitals" : "custom metric",
    value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value), // values must be integers
    event_label: metric.id, // id unique to current page load
    non_interaction: true, // avoids affecting bounce rate.
  });
}

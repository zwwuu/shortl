import { createGetInitialProps } from "@mantine/next";
import Document, { Head, Html, Main, NextScript } from "next/document";

export default class _Document extends Document {
  static getInitialProps = createGetInitialProps();

  render() {
    return (
      <Html>
        <Head>
          <link href="/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180" />
          <link href="/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png" />
          <link href="/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png" />
          <link href="/site.webmanifest" rel="manifest" />
          <link color="#228be6" href="/safari-pinned-tab.svg" rel="mask-icon" />
          <meta content="#228be6" name="msapplication-TileColor" />
          <meta content="#ffffff" name="theme-color" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

const seo = {
  defaultTitle: process.env.NEXT_PUBLIC_APP_TITLE,
  titleTemplate: `%s | ${process.env.NEXT_PUBLIC_APP_TITLE}`,
  description: process.env.NEXT_PUBLIC_APP_DESCRIPTION,
  robotsProps: {
    maxSnippet: -1,
    maxVideoPreview: -1,
    maxImagePreview: "large",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    site_name: process.env.NEXT_PUBLIC_APP_TITLE,
    url: process.env.NEXT_PUBLIC_APP_URL,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL}/images/cover.png`,
        width: 1200,
        height: 630,
        alt: `${process.env.NEXT_PUBLIC_APP_TITLE} logo`,
      },
    ],
  },
  twitter: {
    cardType: "summary_large_image",
  },
};

export default seo;

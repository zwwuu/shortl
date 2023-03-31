/** @type {import("next").NextConfig} */
const config = {
  /** Enables hot reloading for local packages without a build step */
  transpilePackages: ["shortl-api", "shortl-auth", "shortl-schema", "shortl-db", "shortl-pretty-time"],
  reactStrictMode: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
};

export default config;

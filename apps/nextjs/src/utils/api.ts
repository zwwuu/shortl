import { httpBatchLink, loggerLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import type { AppRouter } from "shortl-api";
import superjson from "superjson";

const getBaseUrl = () => {
  // browser should use relative url
  if (typeof window !== "undefined") {
    return "";
  }

  // SSR should use vercel url
  return `${process.env.NEXT_PUBLIC_APP_URL}`;
};

export const api = createTRPCNext<AppRouter>({
  config() {
    return {
      transformer: superjson,
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === "development" || (opts.direction === "down" && opts.result instanceof Error),
        }),
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
    };
  },
  ssr: false,
});

export { type RouterInputs, type RouterOutputs } from "shortl-api";

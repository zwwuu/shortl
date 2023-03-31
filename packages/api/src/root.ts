import { shortlRouter } from "./router/shortl";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  shortl: shortlRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

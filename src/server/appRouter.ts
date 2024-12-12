import { createTRPCRouter } from "$server/trpc";

import { postsRouter } from "./posts.router";

export const appRouter = createTRPCRouter({
  posts: postsRouter,
});

export type AppRouter = typeof appRouter;

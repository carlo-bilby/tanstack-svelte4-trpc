import type { AppRouter } from "$server/appRouter";
import {
  createTRPCProxyClient,
  getFetch,
  httpBatchLink,
  httpLink,
} from "@trpc/client";

type FetchEsque = ReturnType<typeof getFetch>;

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [httpLink({ url: "/api/trpc" })],
});

export const trpcServer = (fetch: FetchEsque) =>
  createTRPCProxyClient<AppRouter>({
    links: [httpBatchLink({ fetch, url: "/api/trpc" })],
  });

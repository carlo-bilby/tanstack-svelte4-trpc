import { dehydrate, QueryClient } from "@tanstack/svelte-query";

/**
 * Utility for SSR with TanStack Query.
 * Appraoch was taken from: https://github.com/Blankeos/svelte-launch/blob/main/src/utils/ssr/create-dehydrated-state.ts
 */
export async function createDehydratedState(
  prefetchQueries: { queryKey: string[]; queryFn: () => Promise<any> }[],
) {
  const queryClient = new QueryClient();

  if (prefetchQueries?.length) {
    const queries: Promise<void>[] = [];

    prefetchQueries?.forEach(({ queryKey, queryFn }) => {
      queries.push(
        queryClient.prefetchQuery({
          queryKey,
          queryFn,
        }),
      );
    });

    await Promise.all(queries);
  }

  return dehydrate(queryClient);
}

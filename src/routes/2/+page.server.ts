import { createDehydratedState } from "$src/lib/create-dehydrated-state";
import { trpcServer } from "$src/lib/trpc";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch }) => {
  const dehydratedState = await createDehydratedState([
    {
      queryKey: ["posts"],
      queryFn: async () => {
        return await trpcServer(fetch).posts.getList.query();
      },
    },
  ]);

  return {
    dehydratedState,
  };
};

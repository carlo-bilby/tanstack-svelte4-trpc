import type { RequestEvent } from "@sveltejs/kit";
import { initTRPC } from "@trpc/server";

export const createContext = async (event: RequestEvent) => {
  return {
    /** Request Event from SvelteKit */
    event: event,
  };
};

const t = initTRPC.context<typeof createContext>().create();

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;

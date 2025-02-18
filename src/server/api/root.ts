import {
  createCallerFactory,
  createTRPCRouter, // equivalent t.router
  protectedProcedure,
} from "./trpc";
import { createRouter as createCRUDRouter } from "./routers/generated/routers";

export const appRouter = createCRUDRouter(createTRPCRouter, protectedProcedure);

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);

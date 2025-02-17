import {
  createCallerFactory,
  createTRPCRouter,
  protectedProcedure,
} from "./trpc";
import { createRouter } from "./routers/generated/routers";

export const appRouter = createRouter(createTRPCRouter, protectedProcedure);

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

import { computersRouter } from "./computers";
import { router } from "@/lib/server/trpc";
import { publicRouter } from "./public";
import { protectedRouter } from "./protected";

export const appRouter = router({
  computers: computersRouter,
  public: publicRouter,
  protected : protectedRouter,
});

export type AppRouter = typeof appRouter;

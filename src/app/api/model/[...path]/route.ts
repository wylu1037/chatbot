import { enhance } from "@zenstackhq/runtime";
import { NextRequestHandler } from "@zenstackhq/server/next";
import { db } from "@/server/db";
import { auth } from "@/server/auth";
import type { User } from "@prisma/client";

// create an enhanced Prisma client with user context
async function getPrisma() {
  const session = await auth();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
  return enhance(db, { user: session?.user as User });
}

const handler = NextRequestHandler({ getPrisma, useAppDir: true });

export {
  handler as DELETE,
  handler as GET,
  handler as PATCH,
  handler as POST,
  handler as PUT,
};

import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/server/db";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcryptjs";
import GithubProvider from "next-auth/providers/github";
/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  providers: [
    DiscordProvider,
    GithubProvider,
    CredentialsProvider({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      authorize: authorize(db),
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
  adapter: PrismaAdapter(db),
  pages: {
    signIn: "/signin",
    signOut: "/signout",
  },
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
} satisfies NextAuthConfig;

function authorize(prisma: PrismaClient) {
  return async (
    credentials: Partial<Record<"email" | "password", unknown>> | undefined,
    request: Request,
  ) => {
    if (!credentials) throw new Error("Missing credentials");
    if (!credentials.email)
      throw new Error('"email" is required in credentials');
    if (!credentials.password)
      throw new Error('"password" is required in credentials');
    const maybeUser = await prisma.user.findFirst({
      where: { email: credentials.email },
      select: { id: true, email: true, password: true },
    });
    if (!maybeUser?.password) return null;
    // verify the input password with stored hash
    const isValid = await compare(
      credentials.password as string,
      maybeUser.password,
    );
    if (!isValid) {
      throw new Error("Invalid credentials");
    }
    return { id: maybeUser.id, email: maybeUser.email };
  };
}

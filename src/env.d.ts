declare module "@/env" {
  export const env: {
    NODE_ENV: "development" | "test" | "production";
    NEXTAUTH_SECRET?: string;
    AUTH_DISCORD_ID: string;
    AUTH_DISCORD_SECRET: string;
    DATABASE_URL: string;
  };
}

import { z } from "zod";

export const UserNavSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  image: z.union([z.string().url(), z.string().startsWith("/")]).optional(),
});

export type UserNavProps = z.infer<typeof UserNavSchema>;

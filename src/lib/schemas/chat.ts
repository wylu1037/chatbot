import { z } from "zod";

export const ChatSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
});

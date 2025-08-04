import { z } from "zod";

export const movieSchema = z.object({
  title: z.string().min(1),
  year: z.number().min(1900).max(2025),
  cast: z.array(z.object({ value: z.string() })).min(1),
  genres: z.array(z.object({ value: z.string() })).min(1),
  extract: z.string().min(1),
  thumbnail: z.string().min(1),
});

export type MovieSchemaType = z.infer<typeof movieSchema>;

"use server";

import { MovieSchemaType } from "@/lib/zodSchemas";
import prisma from "@/lib/db";

export async function createMovie(movie: MovieSchemaType) {
  await prisma.movie.create({
    data: {
      title: movie.title,
      year: movie.year,
      cast: movie.cast.map((c) => c.value),
      genres: movie.genres.map((g) => g.value),
      extract: movie.extract,
      thumbnail: movie.thumbnail,
    },
  });
}

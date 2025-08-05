"use server";

import { MovieSchemaType } from "@/lib/zodSchemas";
import prisma from "@/lib/db";
import { Search } from "@upstash/search";

type Movie = {
  title: string;
  year: number;
  cast: string[];
  genres: string[];
  extract: string;
};

type Metadata = {
  id: string;
  thumbnail: string;
  thumbnail_width: number;
  thumbnail_height: number;
};
const ServerSearchClient = new Search({
  url: process.env.NEXT_PUBLIC_UPSTASH_SEARCH_REST_URL,
  token: process.env.UPSTASH_SERVER_SEARCH_TOKEN,
});
// 👇 your search index name
const index = ServerSearchClient.index<Movie, Metadata>("main");

export async function createMovie(movie: MovieSchemaType) {
  const newMovie = await prisma.movie.create({
    data: {
      title: movie.title,
      year: movie.year,
      cast: movie.cast.map((c) => c.value),
      genres: movie.genres.map((g) => g.value),
      extract: movie.extract,
      thumbnail: movie.thumbnail,
    },
  });

  await index.upsert([
    {
      id: crypto.randomUUID(),
      content: {
        title: movie.title,
        year: movie.year,
        cast: movie.cast.map((c) => c.value),
        genres: movie.genres.map((g) => g.value),
        extract: movie.extract,
      },
      metadata: {
        id: newMovie.id,
        thumbnail: movie.thumbnail,
        thumbnail_width: 100,
        thumbnail_height: 100,
      },
    },
  ]);
}

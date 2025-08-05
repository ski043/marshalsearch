import prisma from "@/lib/db";
import moviesData from "../lib/movies-2020s.json";

interface Movie {
  title: string;
  year: number;
  cast: string[];
  genres: string[];
  extract: string;
  thumbnail?: string;
  thumbnail_width?: number;
  thumbnail_height?: number;
}

export async function main() {
  const limitedMovies = moviesData.slice(0, 100);
  console.log(
    `Starting to seed database with ${limitedMovies.length} movies (limited to first 100)...`
  );

  let successCount = 0;
  let skipCount = 0;

  for (const movie of limitedMovies as Movie[]) {
    try {
      // Skip movies without required fields
      if (!movie.title || !movie.extract || !movie.year) {
        console.warn(
          `Skipping movie due to missing required fields:`,
          movie.title || "Unknown"
        );
        skipCount++;
        continue;
      }

      await prisma.movie.create({
        data: {
          title: movie.title,
          year: movie.year,
          cast: movie.cast || [],
          genres: movie.genres || [],
          extract: movie.extract,
          thumbnail: movie.thumbnail || "https://example.com/default.jpg",
          thumbnail_width: movie.thumbnail_width,
          thumbnail_height: movie.thumbnail_height,
        },
      });

      successCount++;

      // Log progress every 100 movies
      if (successCount % 100 === 0) {
        console.log(`Processed ${successCount} movies...`);
      }
    } catch (error) {
      console.error(`Error creating movie "${movie.title}":`, error);
      skipCount++;
    }
  }

  console.log(
    `Seeding completed! Successfully added ${successCount} movies, skipped ${skipCount} movies.`
  );
}

main()
  .catch((e) => {
    console.error("Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

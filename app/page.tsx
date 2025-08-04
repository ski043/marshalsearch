/* eslint-disable @next/next/no-img-element */
import prisma from "@/lib/db";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import Link from "next/link";

export default async function Home() {
  const movies = await prisma.movie.findMany();

  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {movies.map((movie) => (
        <Card key={movie.id} className="!pb-0">
          <CardHeader>
            <CardTitle className="line-clamp-1">
              <Link href={`/movie/${movie.id}`}>{movie.title}</Link>
            </CardTitle>

            <CardDescription>{movie.year}</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <img
              src={movie.thumbnail}
              alt={movie.title}
              className="w-full h-64 object-cover rounded-b-lg"
            />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

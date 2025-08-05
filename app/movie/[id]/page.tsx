/* eslint-disable @next/next/no-img-element */
import prisma from "@/lib/db";
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import Link from "next/link";

const IDPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const movie = await prisma.movie.findUnique({
    where: { id },
  });

  if (!movie) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardContent className="p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-600">
              Movie not found
            </h1>
            <Link
              href="/"
              className="text-blue-600 hover:underline mt-4 inline-block"
            >
              ← Back to movies
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <Link href="/" className=" hover:underline mb-6 inline-block">
        ← Back to movies
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Movie Poster */}
        <div className="lg:col-span-1">
          <Card className="py-0">
            <CardContent className="p-0">
              <img
                src={movie.thumbnail}
                alt={movie.title}
                className="w-full h-auto object-cover rounded-lg"
              />
            </CardContent>
          </Card>
        </div>

        {/* Movie Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold">
                {movie.title}
              </CardTitle>
              <CardDescription className="text-xl">
                {movie.year}
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Genres */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Genres</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Cast */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Cast</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {movie.cast.map((actor, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                  >
                    {actor}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Plot Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Plot Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className=" leading-relaxed">{movie.extract}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default IDPage;

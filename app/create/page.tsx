"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { movieSchema, MovieSchemaType } from "@/lib/zodSchemas";
import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";
import { createMovie } from "../actions";

const CreateNewMovie = () => {
  // 1. Define your form.
  const form = useForm<MovieSchemaType>({
    resolver: zodResolver(movieSchema),
    defaultValues: {
      title: "",
      year: 0,
      cast: [],
      genres: [],
      extract: "",
      thumbnail: "",
    },
  });

  // Field arrays for dynamic cast and genres
  const {
    fields: castFields,
    append: appendCast,
    remove: removeCast,
  } = useFieldArray({
    control: form.control,
    name: "cast",
  });

  const {
    fields: genreFields,
    append: appendGenre,
    remove: removeGenre,
  } = useFieldArray({
    control: form.control,
    name: "genres",
  });

  // 2. Define a submit handler.
  async function onSubmit(values: MovieSchemaType) {
    await createMovie(values);
  }

  return (
    <div className="container mx-auto py-8 px-10">
      <Card>
        <CardHeader>
          <CardTitle>Create New Movie</CardTitle>
          <CardDescription>Add a new movie to the database</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Title Field */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="The Matrix" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Year Field */}
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="2020"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value) || 0)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Cast Fields */}
              <div>
                <FormLabel>Cast</FormLabel>
                <div className="space-y-2 mt-2">
                  {castFields.map((field, index) => (
                    <FormField
                      key={field.id}
                      control={form.control}
                      name={`cast.${index}.value`}
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex gap-2">
                            <FormControl>
                              <Input placeholder="Actor Name" {...field} />
                            </FormControl>
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              onClick={() => removeCast(index)}
                              disabled={castFields.length === 1}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => appendCast({ value: "" })}
                    className="mt-2"
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add Cast Member
                  </Button>
                </div>
              </div>

              {/* Genres Fields */}
              <div>
                <FormLabel>Genres</FormLabel>
                <div className="space-y-2 mt-2">
                  {genreFields.map((field, index) => (
                    <FormField
                      key={field.id}
                      control={form.control}
                      name={`genres.${index}.value`}
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex gap-2">
                            <FormControl>
                              <Input placeholder="Genre" {...field} />
                            </FormControl>
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              onClick={() => removeGenre(index)}
                              disabled={genreFields.length === 1}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => appendGenre({ value: "" })}
                    className="mt-2"
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add Genre
                  </Button>
                </div>
              </div>

              {/* Extract Field */}
              <FormField
                control={form.control}
                name="extract"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter movie description..."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Thumbnail URL Field */}
              <FormField
                control={form.control}
                name="thumbnail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Thumbnail URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://example.com/image.jpg"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Create Movie
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateNewMovie;

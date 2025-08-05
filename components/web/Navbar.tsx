"use client";

import React, { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import Link from "next/link";
// 👇 import package and optimized styles
import { SearchBar } from "@upstash/search-ui";
import "@upstash/search-ui/dist/index.css";

import { FileText } from "lucide-react";
import { useRouter } from "next/navigation";
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

export const SearchClient = new Search({
  url: process.env.NEXT_PUBLIC_UPSTASH_SEARCH_REST_URL,
  token: process.env.NEXT_PUBLIC_UPSTASH_SEARCH_READ_TOKEN,
});

// 👇 your search index name
const index = SearchClient.index<Movie, Metadata>("main");

const Navbar = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);
  return (
    <div className="container mx-auto py-10 flex justify-between items-center">
      <Link href="/">
        <h1 className="text-4xl font-bold">
          Movie<span className="text-primary">Marshal</span>
        </h1>
      </Link>

      <div className="flex items-center gap-4">
        <div className="w-64">
          <SearchBar.Dialog open={open} onOpenChange={setOpen}>
            <SearchBar.DialogTrigger placeholder="Search movies..." />

            <SearchBar.DialogContent>
              <SearchBar.Input placeholder="Type to search movies..." />
              <SearchBar.Results
                searchFn={(query) => {
                  // 👇 100% type-safe: whatever you return here is
                  // automatically typed as `result` below
                  return index.search({ query, limit: 10, reranking: true });
                }}
              >
                {(result) => (
                  <SearchBar.Result
                    onSelect={() => {
                      router.push(`/movie/${result.metadata?.id}`);
                      setOpen(false);
                    }}
                    value={result.id}
                    key={result.id}
                  >
                    <SearchBar.ResultIcon>
                      <FileText className="text-gray-600" />
                    </SearchBar.ResultIcon>

                    <SearchBar.ResultContent>
                      <SearchBar.ResultTitle>
                        {result.content.title}
                      </SearchBar.ResultTitle>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {result.score}
                      </p>
                    </SearchBar.ResultContent>
                  </SearchBar.Result>
                )}
              </SearchBar.Results>
            </SearchBar.DialogContent>
          </SearchBar.Dialog>
        </div>

        <ThemeToggle />
      </div>
    </div>
  );
};

export default Navbar;

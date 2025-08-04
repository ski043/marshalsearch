"use client";

import React from "react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

import Link from "next/link";

const Navbar = () => {
  return (
    <div className="container mx-auto py-10 flex justify-between items-center">
      <Link href="/">
        <h1 className="text-4xl font-bold">
          Movie<span className="text-primary">Marshal</span>
        </h1>
      </Link>

      <div className="flex items-center gap-4">
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Navbar;

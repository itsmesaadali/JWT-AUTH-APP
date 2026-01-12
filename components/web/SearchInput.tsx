"use client";

import { Loader2, Search } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";

export function SearchInput() {
  const [term, setTerm] = useState("");
  const [open, setOpen] = useState(false);

  const results = useQuery(
    api.posts.searchPosts,
    term.length >= 2 ? { limit: 5, term } : "skip"
  );

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTerm(event.target.value);
    setOpen(true);
  }

  return (
    <div className="relative w-full max-w-sm z-10">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
        <Input
          type="search"
          placeholder="Search Blogs..."
          className="w-full pl-8 bg-background"
          value={term}
          onChange={handleChange}
        />
      </div>

      {open && term.length >= 2 && (
        <div className="absolute z-10 mt-1 w-full max-h-60 overflow-y-auto border bg-popover p-2 shadow-lg">

          {/* Loading */}
          {results === undefined && (
            <div className="flex items-center justify-center p-4 text-sm text-muted-foreground">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Searching...
            </div>
          )}

          {/* No results */}
          {results && results.length === 0 && (
            <p className="p-4 text-sm text-muted-foreground">No results found.</p>
          )}

          {/* Results list */}
          {results && results.length > 0 && (
            <div className="flex flex-col">
              {results.map((post) => (
                <Link
                  href={`/blog/${post._id}`}
                  key={post._id}
                  onClick={() => setOpen(false)}
                  className="block p-2 hover:bg-accent hover:text-accent-foreground rounded"
                >
                  <p className="truncate font-medium text-white">{post.title}</p>
                  <p className="text-xs text-muted-foreground pt-1">
                    {post.content.substring(0, 60)}
                  </p>
                </Link>
              ))}
            </div>
          )}

        </div>
      )}
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-6"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            Build your thoughts with{" "}
            <span className="text-primary">NextBlog</span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            A modern blogging platform built with{" "}
            <span className="text-foreground font-medium">Next.js</span>,{" "}
            <span className="text-foreground font-medium">Convex</span>, and{" "}
            <span className="text-foreground font-medium">shadcn/ui</span>.  
            Fast, scalable, and beautifully designed for creators.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Button size="lg" asChild>
              <Link href="/blog">Read Blog</Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/create">Start Writing</Link>
            </Button>
          </div>

          <div className="pt-8 text-sm text-muted-foreground">
            <p>Open source & maintained by</p>
            <div className="flex justify-center gap-6 mt-2">
              <Link
                href="https://github.com/itsmesaadali"
                target="_blank"
                className="hover:text-primary transition-colors"
              >
                itsmesaadali
              </Link>
              <Link
                href="https://github.com/0X1Saad"
                target="_blank"
                className="hover:text-primary transition-colors"
              >
                0X1Saad
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative blur */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 1 }}
        className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center"
      >
        <div className="h-125 w-125 rounded-full bg-primary/20 blur-[140px]" />
      </motion.div>
    </section>
  );
}

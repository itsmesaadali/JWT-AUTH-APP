"use client";

import { motion } from "framer-motion";
import { Zap, Database, Palette } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Next.js",
    description: "Blazing fast rendering with server components and routing.",
  },
  {
    icon: Database,
    title: "Convex",
    description: "Real-time backend with reactive data and auth built-in.",
  },
  {
    icon: Palette,
    title: "shadcn/ui",
    description: "Accessible, themeable UI powered by Tailwind CSS.",
  },
];

export function Features() {
  return (
    <section className="py-24 border-t border-border">
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.15 }}
          className="grid gap-8 md:grid-cols-3"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5 }}
              className=" border border-border bg-card p-8 shadow-sm hover:shadow-md transition"
            >
              <feature.icon className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

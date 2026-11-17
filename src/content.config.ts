import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    eyebrow: z.string(),
    summary: z.string(),
    year: z.coerce.string(),
    order: z.number(),
    featured: z.boolean().default(false),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    hue: z.number().default(160),
    stack: z.array(z.string()),
    facts: z.array(z.object({ label: z.string(), value: z.string() })),
    links: z.array(z.object({ label: z.string(), href: z.string() })).default([]),
    gallery: z.array(z.object({ src: z.string(), alt: z.string() })).default([]),
  }),
});

export const collections = { projects };

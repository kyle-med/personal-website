import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const notesCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    tags: z.array(z.string()),
    journal: z.string(),
    authors: z.string(),
    year: z.number(),
    abstract: z.string(),
    rating: z.number().min(1).max(5).optional(),
    draft: z.boolean().default(false),
  }),
});

const achievementsCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/achievements' }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    type: z.enum(['footprints', 'contributions', 'milestone', 'breakthrough', 'tool', 'article']),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  notes: notesCollection,
  achievements: achievementsCollection,
};

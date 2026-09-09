import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const notesCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    tags: z.array(z.string()),
    // Existing entries default to paper notes. Essays can omit paper-specific metadata.
    type: z.enum(['paper', 'essay']).default('paper'),
    label: z.string().optional(),
    journal: z.string().optional(),
    authors: z.string().optional(),
    year: z.number().optional(),
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

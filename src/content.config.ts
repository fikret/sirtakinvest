import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const CATEGORIES = [
  'vize-kolayligi',
  'yatirim-firsati',
  'ikinci-ev',
  'adalarda-yazlik',
  'aile-ve-haklar',
] as const;

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    cardTitle: z.string(),
    category: z.enum(CATEGORIES),
    spot: z.string(),
    order: z.number().default(99),
    featured: z.boolean().default(false),
    placeholderLabel: z.string().default(''),
    heroTag: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    projectCode: z.string(),
    location: z.string(),
    priceFrom: z.string(),
    status: z.string().default('Aktif'),
    order: z.number().default(99),
    summary: z.string(),
    placeholderLabel: z.string().default(''),
    draft: z.boolean().default(false),
  }),
});

export const collections = { articles, projects };

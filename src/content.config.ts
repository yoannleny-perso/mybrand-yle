import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const conceptsCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: "./src/content/concepts" }),
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    cluster: z.enum(['data-architecture', 'data-engineering', 'bi-analytics', 'agentic-ai']).optional(),
    depth: z.enum(['core', 'intermediate', 'advanced', 'foundational']).optional(),
    definition: z.string().optional(),
    readingTime: z.union([z.string(), z.number()]).optional(),
    lastReviewed: z.string().optional(),
    relatedConcepts: z.array(z.string()).optional(),
    relatedCaseStudies: z.array(z.string()).optional(),
  })
});

const caseStudiesCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: "./src/content/case-studies" }),
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    client: z.string().optional(),
    sector: z.string().optional(),
    yearStart: z.number().optional(),
    yearEnd: z.number().optional(),
    metrics: z.array(z.object({ label: z.string(), value: z.string() })).optional(),
    relatedConcepts: z.array(z.string()).optional(),
    heroImage: z.string().optional(),
  })
});

const insightsCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: "./src/content/insights" }),
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    publishedAt: z.string().optional(),
    readingTime: z.union([z.string(), z.number()]).optional(),
    tags: z.array(z.string()).optional(),
    heroImage: z.string().optional(),
  })
});

export const collections = {
  'concepts': conceptsCollection,
  'case-studies': caseStudiesCollection,
  'insights': insightsCollection,
};

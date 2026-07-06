import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Clement Daguet-Schott'),
    lang: z.enum(['en', 'fr']),
    // Shared key linking an article to its translation in the other language
    // (used to build hreflang alternates). Omit for articles without a translation.
    translationKey: z.string().optional(),
    tags: z.array(z.string()),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
  }),
});

export const collections = { blog };

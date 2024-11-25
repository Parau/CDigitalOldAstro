import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	type: 'content',
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		type: z.string().default('text'),
		duration: z.string().optional(),
		author: z.string(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
		socialImage: z.string().optional(),
		tags: z.array(z.string()).optional(),  // Define tags as an array of strings
	}),
});

export const collections = { 'blog': blog };

import { z } from 'zod';

export const DocumentValidator = z.object({
  title: z.string(),
  isArchived: z.boolean().optional(),
  isPublished: z.boolean().optional(),
  parentDocument: z.string().optional(),
  content: z.string().optional(),
  coverImage: z.string().optional(),
});

export type DocumentFormData = z.infer<typeof DocumentValidator>;

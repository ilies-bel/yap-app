import { z } from "zod"

// Reusable schema for paginated API response
export function createPageSchema<T extends z.ZodTypeAny>(contentSchema: T) {
  return z.object({
    content: z.array(contentSchema),
    page: z.object({
      size: z.number(),
      number: z.number(),
      totalElements: z.number(),
      totalPages: z.number()
    })
  })
}

export type PageImpl<T> = {
  content: T[]
  page: {
    size: number
    number: number
    totalElements: number
    totalPages: number
  }
}
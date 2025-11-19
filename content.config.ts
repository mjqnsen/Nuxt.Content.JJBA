import { defineCollection, defineContentConfig } from '@nuxt/content'
import { z } from 'zod'

export default defineContentConfig({
  collections: {
    nieuws: defineCollection({
      type: 'page',
      source: 'nieuws/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.string(),
        thumbnail: z.string().optional(),
        image: z.string().optional(),
        gallery: z.array(z.object({
          src: z.string(),
          alt: z.string(),
          caption: z.string().optional()
        })).optional()
      })
    }),
    content: defineCollection({
      type: 'page',
      source: '*.md',
      schema: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        navigation: z.boolean().default(true)
      })
    })
  }
})

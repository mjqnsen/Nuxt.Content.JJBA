import { defineCollection, defineContentConfig } from '@nuxt/content'
import { z } from 'zod'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: {
        include: '**/*.md',
        exclude: ['nieuws/**']
      }
    }),
    nieuws: defineCollection({
      type: 'page',
      source: 'nieuws/**',
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
    })
  }
})

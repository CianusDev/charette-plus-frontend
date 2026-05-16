import type z from 'zod'
import type { LoginSchema } from './auth.schemas'

export type LoginDto = z.infer<typeof LoginSchema>

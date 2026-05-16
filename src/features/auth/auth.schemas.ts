import { z } from 'zod'

export const LoginSchema = z.object({
  email: z.email({
    message: "L'e-mail doit être une adresse e-mail valide",
  }),
  password: z.string({
    message: 'Le mot de passe est requis',
  }),
})

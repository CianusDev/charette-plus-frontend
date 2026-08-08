import { z } from 'zod'

export const LoginSchema = z.object({
  username: z
    .string({ message: "Le nom d'utilisateur est requis" })
    .min(1, { message: "Le nom d'utilisateur est requis" }),
  password: z
    .string({ message: 'Le mot de passe est requis' })
    .min(1, { message: 'Le mot de passe est requis' }),
})

import { z } from 'zod';


export const regSchema = z.object({
    username: z.string().min(2, "Name must be at least 2 characters").max(12),
    password: z.string().min(6, "Password must be at least 6 symbols").max(14),
    email: z.email("Invalid email address!")
})

export type RegistrationFormData = z.infer<typeof regSchema>
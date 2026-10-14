import { z } from 'zod';

export const loginSchema = z.object({
    email: z.email("Invalid email address!"),
    password: z.string().min(6, "Password must be at least 6 symbols").max(14)
})

export type LoginFormData = z.infer<typeof loginSchema>;
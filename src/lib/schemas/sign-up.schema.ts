import { z } from 'zod';

export const signUpSchema = z
  .object({
    name: z.string().trim().min(1, 'Name is required'),
    email: z.string().trim().email('Invalid e-mail'),
    password: z.string().min(8, 'The password must be at least 8 characters long.'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "The passwords don't match.",
    path: ['confirmPassword'],
  });

export type SignUpFormData = z.infer<typeof signUpSchema>;

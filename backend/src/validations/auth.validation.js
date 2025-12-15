import { z } from 'zod'

export const loginSchema = z.object({
  staffId: z
    .string({ required_error: 'Staff ID is required' })
    .min(3, 'Staff ID must be at least 3 characters'),
  password: z
    .string({ required_error: 'Password is required' })
    .min(6, 'Password must be at least 6 characters long'),
})

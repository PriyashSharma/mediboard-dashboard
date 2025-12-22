import { z } from 'zod'

export const createStaffSchema = z.object({
  staffId: z
    .string({ required_error: 'Staff ID is required' })
    .min(3, 'Staff ID must be at least 3 characters'),
  name: z
    .string({ required_error: 'Name is required' })
    .min(3, 'Name must be at least 3 characters long'),
  role: z.enum(['doctor', 'receptionist'], {
    required_error: 'Role must be doctor or receptionist',
  }),
  department: z
    .string({ required_error: 'Department is required' })
    .min(2, 'Department must be at least 2 characters long'),
  password: z
    .string({ required_error: 'Password is required' })
    .min(6, 'Password must be at least 6 characters long'),
})

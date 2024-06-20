import { z } from 'zod';

export const RegisterSchema = z.object({
  email: z.string()
   .regex(/^[A-Z0-9._%+-]+@gmail+\.com$/i, {
      message: 'Invalid email format',
    }).nonempty({ message: 'Email is required' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }).nonempty({ message: 'Password is required' }),
  confirmPassword: z.string().nonempty({ message: 'Confirm password is required' }),
});

export const LoginSchema = z.object({
    email: z.string()
     .regex(/^[A-Z0-9._%+-]+@gmail+\.com$/i, {
        message: 'Invalid email format',
      }).nonempty({ message: 'Email is required' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long' }).nonempty({ message: 'Password is required' })
  });
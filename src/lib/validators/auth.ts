import { z } from 'zod';

export const SigninValidator = z.object({
  email: z.string().email({ message: 'Please enter valid email!' }).min(1, {
    message: 'Please enter your email!',
  }),
  password: z.string().min(1, {
    message: 'Please enter your password!',
  }),
});
export type SigninFormData = z.infer<typeof SigninValidator>;

export const SignupValidator = z.object({
  name: z.string().min(1, {
    message: 'Please enter your name!',
  }),
  email: z.string().email().min(1, {
    message: 'Please enter your email!',
  }),
  password: z.string().min(1, {
    message: 'Please enter your password!',
  }),
});
export type SignupFormData = z.infer<typeof SignupValidator>;

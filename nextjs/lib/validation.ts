import { z } from 'zod'

export const loginFormSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .min(8, { message: "Password must contain at least 8 character(s)" }),
});


export const signupFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must contain at least 3 character(s)" }),
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .min(8, { message: "Password must contain at least 8 character(s)" }),
});


export const forgotPassFormSchema = z.object({
  email: z.string().email("Invalid email"),

});


export const resetPassFormSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 character(s)"),
    confirmPassword: z.string().min(8, "Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

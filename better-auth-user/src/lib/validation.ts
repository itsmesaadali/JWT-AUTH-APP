import { z } from "zod";

export const emailSchema = z
  .string()
  .trim()
  .email("Please enter a valid email");

const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters" });

const currentPassSchema = z.string().min(1, "Current password is required.");

const confirmPassSchema = z.string().min(8, "Confirm Password is required");

export const loginFormSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

const usernameSchema = z
  .string()
  .min(3, { message: "Username must contain at least 3 character(s)" });

export const signupFormSchema = z.object({
  username: usernameSchema,
  email: emailSchema,
  password: passwordSchema,
});

export const forgotPassFormSchema = z.object({
  email: emailSchema,
});

export const resetPassFormSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: confirmPassSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const personalInfoSchema = z.object({
  name: usernameSchema,
});

export const changeEmailSchema = z.object({
  email: emailSchema,
});

export const changePasswordSchema = z
  .object({
    currentPassword: currentPassSchema,
    newPassword: passwordSchema,
    confirmPassword: confirmPassSchema,
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

import { z } from "zod";

export const recaptchaSchema = z.object({
  token: z.string(),
  action: z.string(),
});

export const createShortlSchema = z.object({
  url: z.string().trim().url("Invalid URL"),
  password: z.string().max(128, "Password cannot exceed 128 characters"),
  expiresAt: z.string().datetime().optional(),
});

export const findOneShortlSchema = z.object({
  slug: z.string(),
});

export const unlockShortlSchema = z.object({
  slug: z.string(),
  password: z.string(),
});

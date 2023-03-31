import crypto from "crypto";
import { TRPCError } from "@trpc/server";
import axios from "axios";
import { nanoid } from "nanoid";
import { createShortlSchema, findOneShortlSchema, recaptchaSchema, unlockShortlSchema } from "shortl-schema";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const shortlRouter = createTRPCRouter({
  findOne: publicProcedure.input(findOneShortlSchema).query(async ({ ctx, input }) => {
    const { slug } = input;
    const shortl = await ctx.prisma.shortl.findFirst({
      where: { slug: slug, expired: false },
      select: {
        id: true,
        slug: true,
      },
    });

    if (shortl) {
      return shortl;
    }

    throw new TRPCError({ code: "BAD_REQUEST" });
  }),
  unlock: publicProcedure.input(unlockShortlSchema.merge(recaptchaSchema)).mutation(async ({ ctx, input }) => {
    const { password, action, token } = input;
    if (await isBot(token, action)) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Bot detected.",
      });
    }
    const shortl = await ctx.prisma.shortl.findFirst({ where: { slug: input.slug, expired: false } });
    if (shortl === null) {
      throw new TRPCError({
        code: "BAD_REQUEST",
      });
    }

    if (isPassword(shortl.password, password)) {
      return {
        id: shortl.id,
        url: shortl.url,
        slug: shortl.slug,
        createdAt: shortl.createdAt,
        expiresAt: shortl.expiresAt,
      };
    }

    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Wrong password or link expired.",
    });
  }),
  create: publicProcedure.input(createShortlSchema.merge(recaptchaSchema)).mutation(async ({ ctx, input }) => {
    const { url, password, expiresAt, action, token } = input;
    if (await isBot(token, action)) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Bot detected.",
      });
    }

    let slug = nanoid(Number(process.env.APP_SLUG_LENGTH));
    let maxRetries = Number(process.env.APP_SLUG_MAX_RETRY);
    let shortl = await ctx.prisma.shortl.findUnique({ where: { slug: slug } });

    while (shortl && maxRetries > 0) {
      slug = nanoid(Number(process.env.APP_SLUG_LENGTH));
      shortl = await ctx.prisma.shortl.findUnique({ where: { slug: slug } });
      maxRetries--;
    }

    if (!shortl) {
      return await ctx.prisma.shortl.create({
        data: {
          url: url,
          password: generatePassword(password),
          slug: slug,
          expiresAt: expiresAt,
        },
        select: {
          id: true,
          url: true,
          slug: true,
          createdAt: true,
          expiresAt: true,
        },
      });
    }

    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Unable to create Shortl",
    });
  }),
});

function generatePassword(password: string) {
  const salt = crypto.randomBytes(Number(process.env.APP_SCRYPT_SALT_LENGTH)).toString("hex");
  const hash = crypto.scryptSync(password, salt, Number(process.env.APP_SCRYPT_KEY_LENGTH)).toString("hex");
  return `${salt}:${hash}`;
}

async function isBot(token: string, action: string) {
  const recaptchaUrl = "https://www.google.com/recaptcha/api/siteverify";
  const params = new URLSearchParams({
    secret: `${process.env.GOOGLE_RECAPTCHA_SECRET_KEY}`,
    response: token,
  });
  const response = await axios.post<{ success: boolean; action: string }>(recaptchaUrl, params.toString(), {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return response.data.success === false && response.data.action !== action;
}

function isPassword(hash: string, password: string) {
  const [salt, key] = hash.split(":");
  const keyBuffer = Buffer.from(key, "hex");
  const derivedKey = crypto.scryptSync(password, salt, Number(process.env.APP_SCRYPT_KEY_LENGTH));

  return crypto.timingSafeEqual(keyBuffer, derivedKey);
}

import crypto from "crypto";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { nanoid } from "nanoid";
import prisma from "../../../lib/prisma";
import { isBot, isMaxLength, isUrl } from "../../../utils/validation";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      await handlePost(req, res);
      break;
    default:
      return res.status(StatusCodes.BAD_REQUEST).json({ error: ReasonPhrases.BAD_REQUEST });
  }
}

async function handlePost(req, res) {
  const { body } = req;
  const { url, password, recaptchaResponse, action } = body;
  let errors = {};

  if (await isBot(recaptchaResponse, action)) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: "Bot detected",
    });
  }

  if (!isUrl(url)) {
    errors.url = "Invalid link";
  }

  if (!isMaxLength(password, process.env.NEXT_PUBLIC_APP_LINK_PASSWORD_MAX_LENGTH)) {
    errors.password = `Password must be less than ${process.env.NEXT_PUBLIC_APP_LINK_PASSWORD_MAX_LENGTH} characters`;
  }

  if (Object.keys(errors).length > 0) {
    return res.status(StatusCodes.BAD_REQUEST).json(errors);
  }

  const shortl = await prisma.shortl.create({
    data: {
      url: url.trim(),
      password: generatePassword(password),
      slug: nanoid(parseInt(process.env.APP_SLUG_LENGTH, 10)),
    },
    select: {
      id: true,
      url: true,
      slug: true,
      createdAt: true,
    },
  });

  if (shortl) {
    return res.status(StatusCodes.CREATED).json(shortl);
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: ReasonPhrases.INTERNAL_SERVER_ERROR });
}

function generatePassword(password) {
  const salt = crypto.randomBytes(parseInt(process.env.SCRYPT_SALT_LENGTH, 10)).toString("hex");
  const hash = crypto.scryptSync(password, salt, parseInt(process.env.SCRYPT_KEY_LENGTH, 10)).toString("hex");
  return `${salt}:${hash}`;
}

import { ReasonPhrases, StatusCodes } from "http-status-codes";
import prisma from "../../../lib/prisma";
import { isBot, isPassword } from "../../../utils/validation";

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
  const { body, query } = req;
  const { password, recaptchaResponse, action } = body;

  if (await isBot(recaptchaResponse, action)) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      form: "Bot detected",
    });
  }

  const shortl = await prisma.shortl.findUnique({
    where: { slug: query.slug },
    select: { id: true, url: true, password: true, slug: true, createdAt: true },
  });

  if (shortl && isPassword(shortl.password, password)) {
    return res.status(StatusCodes.OK).json({
      id: shortl.id,
      url: shortl.url,
      slug: shortl.slug,
      createdAt: shortl.createdAt,
    });
  }

  return res.status(StatusCodes.BAD_REQUEST).json({ password: "Wrong password" });
}

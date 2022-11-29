import axios from "axios";
import crypto from "crypto";

export const isUrl = (value) => {
  try {
    new URL(value);
    return value.startsWith("https://") || value.startsWith("http://");
  } catch (_) {
    return false;
  }
};

export const isMinLength = (value, min = 0) => {
  return value.length >= min;
};

export const isMaxLength = (value, max) => {
  return value.length <= max;
};

export const isBot = async (value, action) => {
  const recaptchaUrl = "https://www.google.com/recaptcha/api/siteverify";
  const params = new URLSearchParams({
    secret: process.env.GOOGLE_RECAPTCHA_SECRET_KEY,
    response: value,
  });
  const response = await axios.post(recaptchaUrl, params.toString(), {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return response.data.success === false && response.data.action !== action;
};

export const isPassword = (password, value) => {
  const [salt, key] = password.split(":");
  const keyBuffer = Buffer.from(key, "hex");
  const derivedKey = crypto.scryptSync(value, salt, parseInt(process.env.SCRYPT_KEY_LENGTH, 10));

  return crypto.timingSafeEqual(keyBuffer, derivedKey);
};

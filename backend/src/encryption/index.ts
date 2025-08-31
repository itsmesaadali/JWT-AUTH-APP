import crypto from "crypto";

const key = Buffer.from(process.env.ENCRYPTION_KEY!, "base64");
const iv = crypto.randomBytes(16);
const algorithm = "aes-256-cbc";

export const encryptData = (data: string) => {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(data, "utf8", "hex");
  encrypted += cipher.final("hex");

  return encrypted;
};

const decryptData = (encrypted: string) => {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
};

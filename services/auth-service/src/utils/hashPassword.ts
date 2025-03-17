import { Jwt } from "jsonwebtoken";
import bcrypt from "bcryptjs";
export async function hashPassword(password: string) {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  // Băm mật khẩu với salt
  const hash = await bcrypt.hash(password, salt);
  return hash;
}
export async function comparePassword(password: string, passwordHash: string) {
  return await bcrypt.compare(password, passwordHash);
}

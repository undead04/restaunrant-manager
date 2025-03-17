import jwt from "jsonwebtoken";
import { IUserToken } from "models/userToken";
export async function createAccessToken(user: IUserToken) {
  return jwt.sign({ id: user.id }, "accessToken", { expiresIn: "60m" });
}

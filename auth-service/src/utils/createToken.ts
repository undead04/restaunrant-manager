import jwt from "jsonwebtoken";
import { IUserToken } from "@shares/models/IUserToken";
export async function createAccessToken(user: IUserToken) {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      roleName: user.roleName,
      permission: user.permission,
    },
    "accessToken",
    { expiresIn: "60m" }
  );
}

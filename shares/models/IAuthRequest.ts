import { Request } from "express";
import { IUserToken } from "./IUserToken";

export interface IAuthRequest extends Request {
  user?: IUserToken;
}

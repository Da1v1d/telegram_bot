import jwt from "jsonwebtoken";
import { ENV_VARIABLES } from "../config/constants";

export const createAccessToken = (payload: object) => {
  return jwt.sign(payload, ENV_VARIABLES.JWT_ACCESS_SECRET, {
    expiresIn: ENV_VARIABLES.ACCESS_TOKEN_EXPIRES_IN,
  });
};
export const createRefreshToken = (payload: object) => {
  return jwt.sign(payload, ENV_VARIABLES.JWT_REFRESH_SECRET, {
    expiresIn: ENV_VARIABLES.REFRESH_TOKEN_EXPIRES_IN as string,
  });
};
export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, ENV_VARIABLES.JWT_ACCESS_SECRET);
};
export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, ENV_VARIABLES.JWT_REFRESH_SECRET);
};

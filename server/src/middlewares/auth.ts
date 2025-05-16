import { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../utils/jwt";

export interface AuthRequest extends Request {
  user?: any;
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }
  const token = auth.split(" ")[1];
  try {
    req.user = verifyAccessToken(token);
    next();
  } catch (e) {
    return res.status(401).json({ message: "Invalid or expired access token" });
  }
};

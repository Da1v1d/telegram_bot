import { NextFunction, Request, Response } from "express";

// Centralized error handler middleware
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status || 500;
  const message = err.message || "Internal server error";

  res.status(status).json({ message });
};

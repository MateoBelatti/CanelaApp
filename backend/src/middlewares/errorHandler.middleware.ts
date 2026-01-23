import { Request, Response, NextFunction } from "express";
import HttpError from "../utils/httpError";

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof HttpError) {
    return res.status(err.status).json({
      success: false,
      message: err.message,
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
}

import { Request, Response, NextFunction } from "express";
import { CustomError } from "../lib/CustomError";

export const errorMiddleware = (
  err: Error | CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  // Default error response for unexpected errors
  res.status(500).json({
    message: "Something went wrong. Please try again later.",
  });
};

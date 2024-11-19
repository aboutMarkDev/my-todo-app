import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";
import { CustomError } from "../lib/CustomError";
import jwt from "jsonwebtoken";

export interface SecuredRequest extends Request {
  user?: any;
}

export const secure = asyncHandler(
  async (req: SecuredRequest, res: Response, next: NextFunction) => {
    const { token } = req.cookies;

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);

        req.user = decoded;

        next();
      } catch (error) {
        throw new CustomError("Invalid token", 400);
      }
    } else {
      throw new CustomError("No token", 400);
    }
  }
);

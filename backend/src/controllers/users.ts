import User from "../model/users";
import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { CustomError } from "../lib/CustomError";
import { generateToken } from "../utils/generateToken";
import { SecuredRequest } from "../middlewares/userAuth";

export const registerUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;

    try {
      const userExists = await User.findOne({ username });

      if (userExists) {
        throw new CustomError("User already exists", 400);
      }

      const newUser = await User.create({ username, password });

      generateToken(res, newUser._id);

      res.status(201).json({ message: "User created." });
    } catch (error) {
      next(error);
    }
  }
);

export const loginUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;

    try {
      const user = await User.findOne({ username });

      if (user && (await user.comparePassword(password))) {
        generateToken(res, user._id);
        res.status(200).json({ message: `Welcome ${user.username}!` });
      } else {
        // This means user enter invalid credentials
        throw new CustomError("Something went wrong. Try again!", 401);
      }
    } catch (error) {
      next(error);
    }
  }
);

export const logoutUser = (req: Request, res: Response) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logout user" });
};

export const getCurrentUser = asyncHandler(
  async (req: SecuredRequest, res: Response) => {
    const { userId } = req.user;

    try {
      const currentUser = await User.findById(userId).select("-password");

      res.status(200).json(currentUser);
    } catch (error) {
      console.log(error);
    }
  }
);

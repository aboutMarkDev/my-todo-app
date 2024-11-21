import asyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";
import Todo from "../model/todos";
import { SecuredRequest } from "../middlewares/userAuth";
import { CustomError } from "../lib/CustomError";

export const getTodosByUser = asyncHandler(
  async (req: SecuredRequest, res: Response, next: NextFunction) => {
    const { userId } = req.user;

    try {
      const userTodos = await Todo.find({ userId });

      res.status(200).json(userTodos);
    } catch (error) {
      next(error);
    }
  }
);

export const addTodo = asyncHandler(
  async (req: SecuredRequest, res: Response, next: NextFunction) => {
    const { todo } = req.body;
    const { userId } = req.user;

    try {
      const newTodo = await Todo.create({
        userId,
        todo,
        isDone: false,
      });

      if (!newTodo) {
        throw new CustomError("Something went wrong.", 400);
      }

      res.status(201).json({ message: "New todo added!" });
    } catch (error) {
      next(error);
    }
  }
);

export const editTodo = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { updatedTodo } = req.body;
    const { todoId } = req.params;

    try {
      const todoToBeUpdate = await Todo.findById(todoId);

      if (!todoToBeUpdate) {
        throw new CustomError("Todo not found", 500);
      }

      todoToBeUpdate.todo = updatedTodo || todoToBeUpdate.todo;

      await todoToBeUpdate.save();

      res.status(200).json({ message: "Todo updated!" });
    } catch (error) {
      next(error);
    }
  }
);

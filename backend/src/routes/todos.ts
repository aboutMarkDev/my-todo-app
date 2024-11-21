import express from "express";
import { secure } from "../middlewares/userAuth";
import {
  addTodo,
  deleteTodo,
  editTodo,
  getTodosByUser,
  toggleDone,
} from "../controllers/todos";

const router = express.Router();

// THIS IS NEXT
// WHEN ADDING SOME TODO YOU'LL NEED TO LOGIN FIRST AND USE THE USERID TO ADD IN TODO SCHEMA

router.get("/getTodoByUser", secure, getTodosByUser);

router.post("/add", secure, addTodo);

router.patch("/edit/:todoId", editTodo);

router.delete("/delete/:todoId", deleteTodo);

router.patch("/toggleDone/:todoId", toggleDone);

export default router;

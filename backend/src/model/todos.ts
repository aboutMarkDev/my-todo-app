import mongoose, { Schema, Document } from "mongoose";

interface ITodo extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  isDone: boolean;
  todo: string;
}

const todoSchema = new Schema<ITodo>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  isDone: {
    type: Boolean,
    required: true,
  },
  todo: {
    type: String,
    required: true,
  },
});

const Todo = mongoose.model<ITodo>("Todo", todoSchema);
export default Todo;

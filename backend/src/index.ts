import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
configDotenv();
import connectionDB from "./config/db";
import userRoutes from "./routes/users";
import todosRoutes from "./routes/todos";
import { errorMiddleware } from "./middlewares/error";
import cookieParser from "cookie-parser";

const app = express();
const PORT = 5000;

connectionDB();

app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_LOCAL_URL,
    credentials: true,
  })
);
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.use("/user", userRoutes);
app.use("/todo", todosRoutes);

app.use(errorMiddleware);

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

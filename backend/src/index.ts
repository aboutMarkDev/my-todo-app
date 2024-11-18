import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
configDotenv();

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

import express from "express";
import { authRouter } from "./routes/auth.routes";
import cors from "cors";

const app = express();
const port: number = 3000;

app.use(express.json());
app.use(cors());
app.use(authRouter);

app.listen(port, () => {
  console.log("Running on http://localhost:3000");
});

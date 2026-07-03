import cors from "cors";
import express from "express";
import { authRouter } from "./routes/auth.routes";
import { channelRouter } from "./routes/channel.routes";
import { streamRouter } from "./routes/stream.routes";

const app = express();
const port: number = 3000;

app.use(express.json());
app.use(cors());

app.use(authRouter);
app.use(channelRouter);
app.use(streamRouter);

app.listen(port, () => {
  console.log("Running on http://localhost:3000");
});

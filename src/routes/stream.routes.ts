import StreamController from "@/controllers/StreamController";
import { authorize } from "@/middlewares/authorize";
import { Router } from "express";

export const streamRouter = Router();

streamRouter.get(
  "/streams/:infohash/playback",
  authorize,
  StreamController.getPlayback,
);

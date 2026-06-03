import ChannelController from "@/controllers/ChannelController";
import { authorize } from "@/middlewares/authorize";
import { validate } from "@/middlewares/validate";
import { channelSchema } from "@/schemas/channel.schema";
import { Router } from "express";

export const channelRouter = Router();

channelRouter.post(
  "/channels",
  authorize,
  validate(channelSchema),
  ChannelController.create,
);

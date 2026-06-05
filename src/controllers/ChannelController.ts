import { Channel } from "@/generated/prisma/client";
import { Provider } from "@/generated/prisma/enums";
import ChannelService from "@/services/ChannelService";
import ResponseHandler from "@/utils/ResponseHandler";
import { Request, Response } from "express";

type Body = {
  name: string;
  link: string;
  provider: Provider;
};

class ChannelController {
  // arrow fn to keep "this" context
  public create = async (req: Request<{}, {}, Body>, res: Response) => {
    try {
      const { name, link, provider } = req.body;
      const userId = req.user.id;

      const existingChannel = await ChannelService.findByUserIdAndLink(
        userId,
        link,
      );
      if (existingChannel) {
        return ResponseHandler.fail(res, {
          type: "channel_already_exists",
          message: "Channel already exists",
          statusCode: 409,
        });
      }

      const channel = await ChannelService.create({
        name,
        link,
        provider,
        userId,
      });

      return ResponseHandler.success(
        res,
        { type: "new_channel", channel: this.toChannelDTO(channel) },
        201,
      );
    } catch (error) {
      return ResponseHandler.fail(res, {
        type: "channel_creation_error",
        message: (error as Error).message,
        statusCode: 500,
      });
    }
  };

  public getUserChannels = async (req: Request, res: Response) => {
    try {
      const channels: Channel[] = await ChannelService.findChannelsByUserId(
        req.user.id,
      );
      if (!channels) {
        return ResponseHandler.fail(res, { message: "", type: "" });
      }

      return ResponseHandler.success(res, {
        channels,
      });
    } catch (error) {
      return ResponseHandler.fail(res, {
        message: "",
        type: "",
      });
    }
  };

  private toChannelDTO(channel: Channel) {
    return {
      name: channel.name,
      link: channel.link,
      provider: channel.provider,
    };
  }
}

export default new ChannelController();

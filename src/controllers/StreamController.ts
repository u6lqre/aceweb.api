import StreamService from "@/services/StreamService";
import ResponseHandler from "@/utils/ResponseHandler";
import { Request, Response } from "express";

type Params = {
  infohash: string;
};

class StreamController {
  public async getPlayback(req: Request<Params>, res: Response) {
    try {
      const infohash = req.params.infohash;
      const playbackUrl = await StreamService.getPlaybackUrl(infohash);

      return ResponseHandler.success(res, {
        type: "playback_url",
        playbackUrl,
      });
    } catch (error) {
      return ResponseHandler.fail(res, {
        type: "stream_error",
        message: (error as Error).message,
        statusCode: 500,
      });
    }
  }
}

export default new StreamController();

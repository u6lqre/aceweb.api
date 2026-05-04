import { Response } from "express";

type SuccessResponse<T> = {
  data: T;
};

type FailResponse = {
  error: FailOptions;
};

type FailOptions = {
  message: string;
  type?: string;
  statusCode?: number;
  object?: unknown;
};

class ResponseHandler {
  public success<T>(res: Response, data: T, statusCode = 200) {
    return res.status(statusCode).json({ data });
  }

  public fail(
    res: Response,
    { message, type = "app_error", statusCode = 400, object }: FailOptions,
  ) {
    return res.status(statusCode).json({
      error: {
        type,
        message,
        object,
      },
    });
  }
}

export default new ResponseHandler();

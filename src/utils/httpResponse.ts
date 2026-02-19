import { Response } from "express";

type SuccessResponse<T> = {
  data: T;
};

type FailResponse = {
  error: {
    type: number;
    message: string;
  };
};

export function success<T>(
  res: Response,
  data: T,
  statusCode = 200,
): Response<SuccessResponse<T>> {
  return res.status(statusCode).json({ data });
}

export function fail(
  res: Response,
  message: string,
  type = "app_error",
  statusCode = 400,
): Response<FailResponse> {
  return res.status(statusCode).json({
    error: {
      type,
      message,
    },
  });
}

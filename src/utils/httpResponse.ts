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

export function success<T>(
  res: Response,
  data: T,
  statusCode = 200,
): Response<SuccessResponse<T>> {
  return res.status(statusCode).json({ data });
}

export function fail(
  res: Response,
  { message, type = "app_error", statusCode = 400, object }: FailOptions,
): Response<FailResponse> {
  return res.status(statusCode).json({
    error: {
      type,
      message,
      object,
    },
  });
}

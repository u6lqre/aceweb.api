import AuthService from "@/services/AuthService";
import ResponseHandler from "@/utils/ResponseHandler";
import "dotenv/config";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

type AuthPayload = {
  userId: number;
};

export const authorize = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const unauthorizedObject = (message: string) => ({
    message,
    statusCode: 401,
    type: "auth_middleware_error",
  });

  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return ResponseHandler.fail(res, unauthorizedObject("Unauthorized"));
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return ResponseHandler.fail(res, unauthorizedObject("Missing token"));
    }

    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as JwtPayload & AuthPayload;

    if (!payload.userId) {
      return ResponseHandler.fail(
        res,
        unauthorizedObject("Invalid token payload"),
      );
    }

    const user = await AuthService.getUserById(payload.userId);
    if (!user) {
      return ResponseHandler.fail(res, unauthorizedObject("Unauthorized"));
    }

    req.user = { id: user.id };
    next();
  } catch (error) {
    return ResponseHandler.fail(
      res,
      unauthorizedObject("Invalid or expired token"),
    );
  }
};

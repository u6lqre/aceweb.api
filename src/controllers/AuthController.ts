import AuthService from "@/services/AuthService";
import ResponseHandler from "@/utils/ResponseHandler";
import { Request, Response } from "express";

type AuthBody = {
  username: string;
  password: string;
};

class AuthController {
  public async onboarding(req: Request<{}, {}, AuthBody>, res: Response) {
    try {
      const { username, password } = req.body;
      const user = await AuthService.getUserByUsername(username);

      if (!user) {
        await AuthService.createUser(username, password);
        return ResponseHandler.success(res, { type: "new_user" }, 201);
      }

      const isPasswordCorrect = await AuthService.checkPassword(password, user);

      if (!isPasswordCorrect) {
        return ResponseHandler.fail(res, {
          type: "auth_error",
          message: "Incorrect password",
          statusCode: 401,
        });
      }

      const token = user.isAccepted
        ? await AuthService.generateToken(user.id)
        : null;

      return ResponseHandler.success(res, {
        type: "user_request_status",
        userId: user.id,
        isAccepted: user.isAccepted,
        token,
      });
    } catch (error) {
      return ResponseHandler.fail(res, {
        type: "auth_error",
        message: (error as Error).message,
      });
    }
  }
}

export default new AuthController();

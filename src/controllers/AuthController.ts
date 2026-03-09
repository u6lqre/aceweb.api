import AuthService from "@/services/AuthService";
import { fail, success } from "@/utils/httpResponse";
import { Request, Response } from "express";

type AuthBody = {
  username: string;
  password: string;
};

class AuthController {
  public async onboarding(req: Request<{}, {}, AuthBody>, res: Response) {
    try {
      const { username, password } = req.body;
      const user = await AuthService.getUserBy(username);

      if (!user) {
        await AuthService.createUser(username, password);
        return success(res, { type: "new_user" }, 201);
      }

      const isPasswordCorrect = await AuthService.checkPassword(password, user);

      if (!isPasswordCorrect) {
        return fail(res, {
          type: "auth_error",
          message: "Incorrect password",
          statusCode: 401,
        });
      }

      const token = user.isAccepted
        ? await AuthService.generateToken(user.id)
        : null;

      return success(res, {
        type: "user_request_status",
        userId: user.id,
        isAccepted: user.isAccepted,
        token,
      });
    } catch (error) {
      return fail(res, {
        type: "auth_error",
        message: (error as Error).message,
      });
    }
  }
}

export default new AuthController();

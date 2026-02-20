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

      if (user) {
        return success(res, {
          object: "user_request_status",
          id: user.id,
          isAccepted: user.isAccepted,
        });
      }

      await AuthService.createUser(username, password);
      return success(res, { object: "new_user" }, 201);
    } catch (error) {
      return fail(res, {
        type: "auth_error",
        message: `${error as Error}.message`,
      });
    }
  }
}

export default new AuthController();

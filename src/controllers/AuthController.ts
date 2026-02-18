import AuthService from "@/services/AuthService";
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
        res.status(200).json({
          success: true,
          data: {
            isAccepted: user.isAccepted,
            message: `User request is ${user.isAccepted ? "accepted" : "pending"}`,
          },
        });
      } else {
        await AuthService.createUser(username, password);

        res.status(201).json({
          success: true,
          data: {
            message: "User created successfully",
          },
        });
      }
    } catch (error) {
      res.status(400).json({
        success: false,
        error: { name: "App Error", message: `${(error as Error).message}` },
      });
    }
  }
}

export default new AuthController();

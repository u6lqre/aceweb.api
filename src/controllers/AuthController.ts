import AuthService from "@/services/AuthService";
import { Request, Response } from "express";

type AuthBody = {
  name: string;
  password: string;
};

class AuthController {
  public async register(req: Request<{}, {}, AuthBody>, res: Response) {
    try {
      const { name: username, password } = req.body;

      const userExists = await AuthService.checkIfUserExists(username);
      if (userExists) throw new Error("User already exist");

      const hashedPassword = await AuthService.hashPassword(password);

      await AuthService.addUserToDB(username, hashedPassword);

      res.status(201).json({
        success: true,
        message: "User created successfully",
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: { name: "App Error", message: `${(error as Error).message}` },
      });
    }
  }
}

export default new AuthController();

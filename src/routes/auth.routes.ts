import AuthController from "@/controllers/AuthController";
import { validate } from "@/middlewares/validate";
import { registerSchema } from "@/schemas/auth.schema";
import { Router } from "express";

export const authRouter = Router();

authRouter.post("/register", validate(registerSchema), AuthController.register);

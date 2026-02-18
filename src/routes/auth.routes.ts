import AuthController from "@/controllers/AuthController";
import { validate } from "@/middlewares/validate";
import { onboardingSchema } from "@/schemas/auth.schema";
import { Router } from "express";

export const authRouter = Router();

authRouter.post(
  "/onboarding",
  validate(onboardingSchema),
  AuthController.onboarding,
);

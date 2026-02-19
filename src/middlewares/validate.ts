import { fail } from "@/utils/httpResponse";
import { Request, Response, NextFunction } from "express";
import z, { ZodObject } from "zod";

export const validate =
  (schema: ZodObject) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errorMessage = z.prettifyError(result.error);
      return fail(res, errorMessage, "validation_error");
    }

    req.body = result.data;
    next();
  };

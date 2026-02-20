import { fail } from "@/utils/httpResponse";
import { NextFunction, Request, Response } from "express";
import z, { ZodObject } from "zod";

export const validate =
  (schema: ZodObject) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errorObject = z.flattenError(result.error);
      return fail(res, {
        message: "Zod error",
        type: "validation_error",
        object: errorObject,
      });
    }

    req.body = result.data;
    next();
  };

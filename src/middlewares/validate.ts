import { Request, Response, NextFunction } from "express";
import z, { ZodObject } from "zod";

export const validate =
  (schema: ZodObject) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errorMessage = z.prettifyError(result.error);
      return res.status(400).json({ success: false, error: errorMessage });
    }

    req.body = result.data;
    next();
  };

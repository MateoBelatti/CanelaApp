import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const validateBody =
    <T>(schema: ZodSchema<T>) =>
    (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
        message: "Datos inválidos",
        errors: result.error.issues.map(err => ({
            path: err.path.join("."),
            message: err.message
        }))
        });
    }

    // 🔥 body validado y tipado
    req.body = result.data;

    next();
    };

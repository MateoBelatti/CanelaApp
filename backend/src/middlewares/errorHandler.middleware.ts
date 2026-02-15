import { Request, Response, NextFunction } from "express";
import HttpError from "../utils/httpError";
import { ZodError } from "zod";

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // 1. Errores personalizados
  if (err instanceof HttpError) {
    return res.status(err.status).json({
      success: false,
      message: err.message,
    });
  }
  // 2. Errores de validación de Zod 
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Error de validación",
      // Usamos .issues que es la propiedad estándar de ZodError
      errors: err.issues.map((e) => ({ 
        field: e.path.join("."), 
        message: e.message 
      })),
    });
  }

  // 3. Errores de base de datos / campos duplicados
  if (err && typeof err === "object" && "name" in err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        success: false,
        message: "El registro ya existe en la base de datos",
      });
    }
  }
  // 4. Errores no controlados
  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
}

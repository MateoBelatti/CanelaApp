import { z } from "zod";

export const createUsuarioSchema = z.object({
  id: z.number().int().positive(),
  nombre: z.string().min(2),
  email: z.string().email(),
  passwordHash: z.string(),
  rol: z.enum(["ADMIN" , "VENDEDOR" , "USER"]),
  direccion: z.string().min(5),
  telefono: z.string().min(8),
});
export const updateUsuarioSchema = z.object({
  nombre: z.string().min(2).optional(),
  direccion: z.string().min(5).optional(),
  telefono: z.string().min(8).optional(),
});

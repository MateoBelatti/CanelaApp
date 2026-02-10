import { z } from "zod";

export const createUsuarioSchema = z.object({
    nombre: z
        .string()
        .min(1, "El nombre es obligatorio"),

    email: z
        .string()
        .email("Email inválido"),

    passwordHash: z
        .string()
        .min(8, "La contraseña debe tener al menos 8 caracteres"),

    rol: z
        .enum(["USER", "ADMIN"])
        .optional(),

    direccion: z
        .string()
        .nullable()
        .optional(),

    telefono: z
        .string()
        .nullable()
        .optional(),
});
export const updateUsuarioSchema = z.object({
  nombre: z.string().min(2).optional(),
  direccion: z.string().min(5).optional(),
  telefono: z.string().min(8).optional(),
});

import { z } from "zod";

export const createCategoriaZod = z.object({
    nombre: z.string().nonempty({ message: "El nombre es obligatorio" })
});

export const updateCategoriaZod = z.object({
    nombre: z.string().nonempty({ message: "El nombre no puede estar vacío" }).optional()
});

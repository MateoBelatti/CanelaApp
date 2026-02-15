import { z } from "zod";

export const createProductoSchema = z.object({
    imagen_producto: z.string().nullable().optional(),
    nombre: z.string().min(1, "El nombre es obligatorio"),
    descripcion: z.string().min(1, "La descripción es obligatoria"),
    precio: z.number().positive("El precio debe ser mayor a 0"),
    stock: z.number().int().nonnegative("El stock no puede ser negativo"),
    id_categoria: z.number().int().positive("La categoría es inválida"),
});

export const updateProductoSchema = z.object({
    imagen_producto: z.string().nullable().optional(),
    nombre: z.string().min(1).optional(),
    descripcion: z.string().min(1).optional(),
    precio: z.number().positive().optional(),
    stock: z.number().int().nonnegative().optional(),
    activo: z.boolean().optional(),
    id_categoria: z.number().int().positive().optional(),
});

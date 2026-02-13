import { z } from "zod";

// Schema para validar createDetalleCarritoDTO
export const createDetalleCarritoSchema = z.object({
    id_carrito: z.number({
        error: "El id del carrito es obligatorio",
    }).int().positive(),
    
    id_producto: z.number({
        error: "El id del producto es obligatorio",
    }).int().positive(),
    
    cantidad: z.number({
        error: "La cantidad es obligatoria"
    }).int().positive()
});

import { Router } from "express";
import DetalleCarritoController from "../controllers/carrito.controller";
import { authenticate } from "../middlewares/authenticate";
// Middleware validador de body
import { validateBody } from "../middlewares/validate";
// Schema para validar body
import { createDetalleCarritoSchema } from "../validate/detalleCarrito.validator";

const routerDetalleCarrito = Router();

// DETALLE CARRITO
// ==========================

routerDetalleCarrito.post(
    "/",
    [authenticate, validateBody(createDetalleCarritoSchema)],
    DetalleCarritoController.createDetalleCarrito
);

routerDetalleCarrito.delete(
    "/:idDetalle",
    [authenticate],
    DetalleCarritoController.deleteDetalleCarrito
);

routerDetalleCarrito.get(
    "/:idCarrito",
    [authenticate],
    DetalleCarritoController.getDetallesByCarrito
);

export default routerDetalleCarrito;

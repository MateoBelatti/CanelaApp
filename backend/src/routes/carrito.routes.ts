import { Router } from "express";
import DetalleCarritoController from "../controllers/carrito.controller";
import { authenticate } from "../middlewares/authenticate";
// Middleware validador de body
import { validateBody } from "../middlewares/validate";
// Schema para validar body
import { createDetalleCarritoSchema } from "../validate/detalleCarrito.validator";

const routerCarrito = Router();

// CARRITO
// ==========================

routerCarrito.post(
    "/:idUsuario",
    [authenticate],
    DetalleCarritoController.createCarrito
);

routerCarrito.get(
    "/:idUsuario",
    [authenticate],
    DetalleCarritoController.getCarrito
);

// DETALLE CARRITO
// ==========================

routerCarrito.post(
    "/detalle",
    [authenticate],
    DetalleCarritoController.createDetalleCarrito
);

routerCarrito.delete(
    "/detalle/:idDetalle",
    [authenticate],
    DetalleCarritoController.deleteDetalleCarrito
);

routerCarrito.get(
    "/:idCarrito/detalles",
    [authenticate, validateBody(createDetalleCarritoSchema)],
    DetalleCarritoController.getDetallesByCarrito
);

export default routerCarrito;

import { Router } from "express";
// Controller de producto
import ProductoController from "../controllers/producto.controller";
// Validaciones de Body
import { validateBody } from "../middlewares/validate";
import { createProductoSchema, updateProductoSchema } from "../validate/producto.validator";
// Middlewares de autenticacion
import { authenticate } from "../middlewares/authenticate";
import { authorizeRole } from "../middlewares/authorizeRole";

const routerProducto = Router();

routerProducto.get("/", ProductoController.getAll);
routerProducto.get("/:id", ProductoController.getById);
routerProducto.get("/:idCategoria", ProductoController.getProductosByCategoria);

routerProducto.post(
    "/",
    [authenticate, authorizeRole("ADMIN", "VENDEDOR"), validateBody(createProductoSchema)],
    ProductoController.create
);

routerProducto.put(
    "/:id",
    [authenticate, authorizeRole("ADMIN", "VENDEDOR"), validateBody(updateProductoSchema)],
    ProductoController.update
);

routerProducto.delete(
    "/:id",
    [authenticate, authorizeRole("ADMIN", "VENDEDOR")],
    ProductoController.delete
);

export default routerProducto;

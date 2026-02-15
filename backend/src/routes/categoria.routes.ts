import { Router } from "express";
// Cntroller de categorias
import  CategoriaController  from "../controllers/categoria.controller";
// validacion de req.body
import { validateBody } from "../middlewares/validate"; //middleware
import { createCategoriaZod, updateCategoriaZod } from "../validate/categoria.validator";//schemas
// midelewares de autenticacion
import { authenticate } from "../middlewares/authenticate";
import { authorizeRole } from "../middlewares/authorizeRole";

const routerCategoria = Router();

// endpoint ------> /api/categoria
routerCategoria.get("/", CategoriaController.getAll);
routerCategoria.get("/:id", CategoriaController.getById);

routerCategoria.post(
    "/",
    [authenticate, authorizeRole("ADMIN","VENDEDOR"), validateBody(createCategoriaZod)],
    CategoriaController.create
);

routerCategoria.put(
    "/:id",
    [authenticate, authorizeRole("ADMIN","VENDEDOR"), validateBody(updateCategoriaZod)],
    CategoriaController.update
);

routerCategoria.delete(
    "/:id",
    [authenticate, authorizeRole("ADMIN","VENDEDOR")],
    CategoriaController.delete
);

// BODY DE UPDATE Y CREATE SOLO CAMPO NOMBRE
export default routerCategoria;

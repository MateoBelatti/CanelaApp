import { Router } from "express";
// Controller de Usuario
import UsuarioController from "../controllers/usuario.controller";
// Middlewares de autenticacion
import { authorizeRole } from "../middlewares/authorizeRole";
import { authenticate } from "../middlewares/authenticate";
// Validacion de Body
import { validateBody } from "../middlewares/validate"; // Middleware
import { createUsuarioSchema, updateUsuarioSchema } from "../validate/usuario.validate"; // Schema

const routerUsuario = Router();

// endpont ----> /api/usuarios
routerUsuario.get("/", UsuarioController.getAllUsers);
routerUsuario.get("/:id", UsuarioController.getUserById);

routerUsuario.post(
    "/",
    [validateBody(updateUsuarioSchema)],
    UsuarioController.createUser
);

routerUsuario.put(
    "/:id",
    [authenticate, authorizeRole("ADMIN"), validateBody(createUsuarioSchema)],
    UsuarioController.updateUser

);
routerUsuario.delete(
    "/:id",
    [authenticate, authorizeRole("ADMIN", "VENDEDOR")],
    UsuarioController.deleteUser
);

export default routerUsuario;
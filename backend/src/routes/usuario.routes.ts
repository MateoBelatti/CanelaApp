import { Router } from "express";
import UsuarioController from "../controllers/usuario.controller";
import { authorizeRole } from "../middlewares/authorizeRole";
import { authenticate } from "../middlewares/authenticate";

const routerUsuario = Router();

routerUsuario.get("/usuarios", UsuarioController.getAllUsers);
routerUsuario.get("/usuarios/:id", UsuarioController.getUserById); 
routerUsuario.post("/usuarios", UsuarioController.createUser);
routerUsuario.put("/usuarios/:id", authenticate, authorizeRole("ADMIN"), UsuarioController.updateUser);
routerUsuario.delete("/usuarios/:id", authenticate, authorizeRole("ADMIN", "VENDEDOR"), UsuarioController.deleteUser);

export default routerUsuario;
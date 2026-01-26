import { Router } from "express";
import UsuarioController from "../controllers/usuario.controller";

const routerUsuario = Router();

routerUsuario.get("/usuarios", UsuarioController.getAllUsers);
routerUsuario.get("/usuarios/:id", UsuarioController.getUserById); 
routerUsuario.post("/usuarios", UsuarioController.createUser);
routerUsuario.put("/usuarios/:id", UsuarioController.updateUser);
routerUsuario.delete("/usuarios/:id", UsuarioController.deleteUser);

export default routerUsuario;
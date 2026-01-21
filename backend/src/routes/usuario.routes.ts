import { Router } from "express";
import UsuarioController from "../controllers/usuario.controller";

const usuarioRouter = Router();

usuarioRouter.get("/usuario/getAll", UsuarioController.getAllUsers);
usuarioRouter.get("/usuario/getById/:idUser");
usuarioRouter.post("/usuario/create");
usuarioRouter.put("/usuariuo/put/:idUser");
usuarioRouter.delete("/usuario/delete/:idUser");

export default usuarioRouter;
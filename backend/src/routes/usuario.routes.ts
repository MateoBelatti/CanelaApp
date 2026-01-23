import { Router } from "express";
import UsuarioController from "../controllers/usuario.controller";

const router = Router();

router.get("/usuarios", UsuarioController.getAllUsers);
router.get("/usuarios/:id", UsuarioController.getUserById);
router.post("/usuarios", UsuarioController.createUser);
router.put("/usuarios/:id", UsuarioController.updateUser);
router.delete("/usuarios/:id", UsuarioController.deleteUser);

export default router;
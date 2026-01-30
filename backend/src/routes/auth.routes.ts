import { Router } from "express";
import authController from "../controllers/auth.controller";

const routeAuth = Router();

routeAuth.post("/auth", authController);

export default routeAuth; 
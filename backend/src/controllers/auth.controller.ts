import { Request, Response } from 'express';
import Jwt from "jsonwebtoken";
import { config } from 'dotenv';
import loginService from '../services/auth.service';
import HttpError from '../utils/httpError';

config();
const secret_Api = process.env.SECRET_API;

async function authController(req: Request, res: Response) {
    try {
        if (!secret_Api) {
            throw new HttpError("Secret de la api no proporcionado", 404)
        }
        const { email, password } = req.body;
        if (!email || !password) {
            throw new HttpError("clave o email no proporcionado", 404)
        }
        const result = await loginService(email, password);
        if (!result) {
            return res.status(401).json({ message: 'No se pudo Iniciar Sesion' });
        }

        const token = Jwt.sign(
            { id: result.id, rol: result.rol },
            secret_Api,
            { expiresIn: 3600 }
        ); //1HS

        res.status(200).json({ message: 'Inicio Sesion Correctamente', token: token });
        } catch (error) {
        if (error instanceof HttpError) {
            return res.status(error.status).json({ message: error.message });
        }
        console.error(error);
        res.status(400).json(error);
    }
}

export default authController;
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { config } from 'dotenv';
import HttpError from '../utils/httpError';

export interface AuthUser {
    id: string;
    rol: string;
}

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Express {
    interface Request {
        user?: AuthUser;
    }
    }
}

config();
const secret_Api = process.env.SECRET_API;

export const authenticate = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        if (!secret_Api) {
            throw new HttpError("Secret de la api no proporcionado", 404)
        }
        const authHeader = req.header('authorization');
        const token = authHeader?.replace(/Bearer\s?/i, '');

        if (!token) {
            return res.status(401).json({ message: 'Token no proporcionado' });
        }

        const decoded = jwt.verify(token, secret_Api) as AuthUser;
        req.user = decoded;

        next();
    } catch {
    return res.status(401).json({ message: 'Token inválido o expirado' });
    }
};
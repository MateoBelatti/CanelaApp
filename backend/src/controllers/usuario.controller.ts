import { Request, Response, NextFunction } from "express";
import UsuarioService from "../services/usuario.service";
import HttpError from "../utils/httpError";
import { CreateUsuarioDTO, UpdateUsuarioDTO, UsuarioDTO } from "../DTOs/usuario.dto";

class UsuarioController {
    async getAllUsers(req : Request, res : Response, next : NextFunction ) {
        try {
            const usuarios : UsuarioDTO[] = await UsuarioService.findAll();
            res.status(200).json({ success : true, data : usuarios})
        } catch (error) {
            next(error);
        }
    }

    async getUserById(req : Request, res : Response, next : NextFunction ) {
        try {
            const { id } = req.params;
            if (!id) {
                throw new HttpError("Parametro id requerido", 400);
            }
            const usuario : UsuarioDTO | null = await UsuarioService.findById(Number(id));
            res.status(200).json({success : true, data : usuario})
        } catch (error) {
            next(error);
        }
    }

    async createUser(req : Request, res : Response,next : NextFunction ) {
        try {
            const data : CreateUsuarioDTO = req.body;
            const usuarioCreado = await UsuarioService.create(data);
            if (!usuarioCreado) {
                throw new HttpError("No se pudo crear usuario", 400)
            }
            res.json(201).json({
                success : true,
                data : usuarioCreado
            });
        } catch (error) {
            next(error);
        }
    }

    async updateUser(req : Request, res : Response, next : NextFunction ) {
        try {
            const { id } = req.params;
            if (!id) {
                throw new HttpError("Parametro id requerido", 400);
            }
            const data : UpdateUsuarioDTO = req.body;
            const userUpdate = await UsuarioService.update(data, Number(id));
            if (!userUpdate) {
                throw new HttpError("No se pudo actualizar usuario", 400)
            }
            res.status(200).json({success : true, data : userUpdate});
        } catch (error) {
            next(error);
        }
    }

    async deleteUser(req : Request, res : Response, next : NextFunction ) {
        try {
            const { id } = req.params;
            if (!id) {
                throw new HttpError("Parametro id requerido", 400);
            }
            const destroy = await UsuarioService.delete(Number(id));
            res.status(200).json({success : true, data : "Usuario Eliminado"})
        } catch (error) {
            next(error);
        }
    }
}

export default new UsuarioController();
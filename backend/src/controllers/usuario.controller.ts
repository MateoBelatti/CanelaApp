import { Request, Response } from "express";
import UsuarioService from "../services/usuario.service";
import { IUsuario } from "../model/interfaces/usuario.interface";
import HttpError from "../utils/httpError";
import { CreateUsuarioDTO, UpdateUsuarioDTO} from "../DTOs/usuario.dto";
import { success } from "zod";

class UsuarioController {
    async getAllUsers(req : Request, res : Response ) {
        try {
            const usuarios : IUsuario[] = await UsuarioService.findAll();
            if (usuarios.length === 0) {
                return res.status(404).json({ success : true, data : []});
            }
            res.status(200).json({ success : true, data : usuarios})
        } catch (error) {
            if (error instanceof HttpError) {
                return res.status(400).json({error : error.message})
            }
        }
    }

    async getUserById(req : Request, res : Response ) {
        try {
            const { idUser } = req.body;
            if (!idUser) {
                throw new HttpError("Body sin parametro idUser", 400);
            }
            const usuario = await UsuarioService.findById(Number(idUser));
            res.status(200).json({success : true, data : usuario})
        } catch (error) {
            if (error instanceof HttpError) {
                return res.status(400).json({error : error.message});
            }
        }
    }

    async createUser(req : Request, res : Response ) {
        try {
            const data : CreateUsuarioDTO = {
                nombre : req.body.nombre,
                email : req.body.email,
                passwordHash : req.body.passwordHash,
                rol : req.body.rol ?? "USER",
                direccion : req.body.direccion ?? null,
                telefono : req.body.telefono ?? null
            }
            const usuarioCreado = await UsuarioService.create(data);
            if (!usuarioCreado) {
                throw new HttpError("No se pudo crear usuario", 400)
            }
            res.json(201).json({success : true, data : usuarioCreado});
        } catch (error) {
            if (error instanceof HttpError) {
                return res.status(400).json({error : error.message});
            }
        }
    }

    updateUser(req : Request, res : Response ) {
        try {
            const data : UpdateUsuarioDTO = {
                nombre : req.body.nombre,
                email : req.body.email,
                direccion : req.body.direccion ?? null,
                telefono : req.body.telefono ?? null
            }
            const userUpdate = UsuarioService.update(data, Number(req.params.idUser));
            if (!userUpdate) {
                throw new HttpError("No se pudo actualizar usuario", 400)
            }
        } catch (error) {
            if (error instanceof HttpError) {
                return res.status(400).json({error : error.message});
            }
        }
    }

    async deleteUser(req : Request, res : Response ) {
        try {
            const destroy = await UsuarioService.delete(Number(req.params.idUser));
            res.status(200).json({success : true, data : "Usuario Eliminado"})
        } catch (error) {
            if (error instanceof HttpError) {
                return res.status(400).json({error : error.message});
            }
        }
    }
}

export default new UsuarioController();
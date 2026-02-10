import { NextFunction, Request, Response } from "express";
import  CategoriaService  from "../services/categoria.service";
import {
    CreateCategoriaDTO,
    UpdateCategoriaDTO
} from "../DTOs/categoria.dto";
export class CategoriaController {
    // GET /categorias
    async getAll(req: Request, res: Response, next : NextFunction) {
        try {
            const categorias = await CategoriaService.getAll();
            res.status(200).json(categorias);
        } catch (error) {
            next(error);
        }
    }

    // GET /categorias/:id
    async getById(req: Request, res: Response, next : NextFunction) {
        try {
            // Validacion de ID
            const { id } = req.params;
            if (!id || isNaN(Number(id))) {
                return res.status(400).json({ message: "El ID proporcionado no es válido" });
            }

            const categoria = await CategoriaService.getById(Number(id));
            res.status(200).json(categoria);
        } catch (error) {
            next(error);
        }
    }

    // POST /categorias
    async create(req: Request, res: Response, next : NextFunction) {
        try {
            // Body validado en middleware
            const data: CreateCategoriaDTO = req.body;
            const categoria = await CategoriaService.create(data);
            res.status(201).json(categoria);
        } catch (error) {
            next(error);
        }
    }

    // PUT /categorias/:id
    async update(req: Request, res: Response, next : NextFunction) {
        try {
            // Validacion de ID
            const { id } = req.params;
            if (!id || isNaN(Number(id))) {
                return res.status(400).json({ message: "El ID proporcionado no es válido" });
            }

            // Body validado en Middleware
            const data: UpdateCategoriaDTO = req.body;
            const updated = await CategoriaService.update(Number(id), data);
            res.status(200).json(updated);
        } catch (error) {
            next(error);
        }
    }

    // DELETE /categorias/:id
    async delete(req: Request, res: Response, next : NextFunction) {
        try {
            // Validacion de ID
            const { id } = req.params;
            if (!id || isNaN(Number(id))) {
                return res.status(400).json({ message: "El ID proporcionado no es válido" });
            }
            const deleted = await CategoriaService.delete(Number(id));
            res.status(204).json({"eliminado" : deleted});
        } catch (error) {
            next(error);
        }
    }
}

export default new CategoriaController();
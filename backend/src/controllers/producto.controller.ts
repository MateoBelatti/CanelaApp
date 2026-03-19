import { Request, Response, NextFunction } from "express";
import ProductoService from "../services/producto.service";
import { CreateProductoDTO, UpdateProductoDTO } from "../DTOs/producto.dto";

class ProductoController {
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const productos = await ProductoService.getAll();
            res.status(200).json(productos);
        } catch (error) {
            next(error);
        }
    }

    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            // Validación básica antes de llamar al service
            if (!id || isNaN(Number(id))) {
                return res.status(400).json({ message: "El ID proporcionado no es válido getById" });
            }
            const producto = await ProductoService.getById(Number(id));
            res.status(200).json(producto);
        } catch (error) {
            next(error);
        }
    }

    async getProductosByCategoria(req: Request, res: Response, next: NextFunction) {
        try {
            const { idCategoria } = req.params;
            if (!idCategoria || isNaN(Number(idCategoria))) {
                return res.status(400).json({ message: "El ID proporcionado no es válido productosCategoria" });
            }
            const productos = await ProductoService.getProductosByCategoria(Number(idCategoria));
            return res.status(200).json(productos);
        } catch (error) {
            next(error);
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const data: CreateProductoDTO = req.body;
            const producto = await ProductoService.create(data);
            res.status(201).json(producto);
        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            // Validación básica antes de llamar al service
            if (!id || isNaN(Number(id))) {
                return res.status(400).json({ message: "El ID proporcionado no es válido update" });
            }
            const data: UpdateProductoDTO = req.body;
            const producto = await ProductoService.update(Number(id), data);
            res.status(200).json(producto);
        } catch (error) {
            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            // Validación básica antes de llamar al service
            if (!id || isNaN(Number(id))) {
                return res.status(400).json({ message: "El ID proporcionado no es válido delte" });
            }
            await ProductoService.delete(Number(id));
            return res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}
export default new ProductoController();

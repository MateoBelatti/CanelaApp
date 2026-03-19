import { Request, Response, NextFunction } from "express";
import ServiceCarrito from "../services/carrito.service";
import { createDetalleCarritoDTO } from "../DTOs/detalleCarrito.dto";
import { createCarritoDTO } from "../DTOs/carrito.dto";

class DetalleCarritoController {
    // crea un carrito
    async createCarrito(req: Request, res: Response, next: NextFunction){
        try {
            const { idUsuario } = req.params;
            if (!idUsuario || isNaN(Number(idUsuario))) {
                return res.status(400).json({ message: "El ID proporcionado no es válido (Carrito  createCarrito)" });
            }
            const carrito = await ServiceCarrito.findCarritoByUser(Number(idUsuario));
            if (carrito != null) {
                return res.status(200).json({menssage : "Este usuario ya tiene carrito"})
            }
            const data : createCarritoDTO = {
                "id_usuario" : Number(idUsuario)
            }
            const createCarrito = await ServiceCarrito.creteCarrito(data);
            res.status(201).json({createCarrito});
        } catch (error) {
            next(error)
        }
    }
    async getCarrito(req: Request, res: Response, next: NextFunction){
        try {
            const { idUsuario } = req.params;
            if (!idUsuario || isNaN(Number(idUsuario))) {
                return res.status(400).json({ message: "El ID proporcionado no es válido (Carrito  getCarrito)" });
            }
            const carrito = await ServiceCarrito.findCarritoByUser(Number(idUsuario));
            res.status(200).json(carrito);
        } catch (error) {
            next(error);
        }
    }

    // Crear un detalle de carrito
    async createDetalleCarrito(req: Request, res: Response, next: NextFunction) {
        try {
            const data: createDetalleCarritoDTO = req.body;
            console.log('prueba1');
            const detalle = await ServiceCarrito.createDetalleCarrito(data);
            console.log('prueba1');
            res.status(201).json(detalle);
        } catch (error) {
            next(error);
        }
    }

    // Eliminar un detalle por id
    async deleteDetalleCarrito(req: Request, res: Response, next: NextFunction) {
        try {
            const idDetalle = Number(req.params.idDetalle);
            if (!idDetalle || isNaN(Number(idDetalle))) {
                return res.status(400).json({ message: "El ID proporcionado no es válido (Carrito  deleteDetalle)" });
            }
            const deleted = await ServiceCarrito.deteleDetalleCarrito(idDetalle);
            if (!deleted) {
                return res.status(404).json({ message: "Detalle no encontrado" });
            }
            res.status(200).json({ message: "Detalle eliminado correctamente" });
        } catch (error) {
            next(error);
        }
    }

    // Obtener todos los detalles de un carrito
    async getDetallesByCarrito(req: Request, res: Response, next: NextFunction) {
        try {
            const idCarrito = Number(req.params.idCarrito);
            if (!idCarrito || isNaN(Number(idCarrito))) {
                return res.status(400).json({ message: "El ID proporcionado no es válido (Carrito detDetallesByCarrito)" });
            }
            const detalles = await ServiceCarrito.findAllDetallesByCarrito(idCarrito);
            res.status(200).json(detalles);
        } catch (error) {
            next(error);
        }
    }
}

export default new DetalleCarritoController();

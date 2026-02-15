import { createDetalleCarritoDTO } from "../DTOs/detalleCarrito.dto";
import { DetalleCarritoModel } from "../model/detalleCarrito.model";
import { IDetalleCarrito } from "../model/interfaces/interfaces";
import { IDetalleCarritoRepository } from "./interfaces/IDetalleCarrito";

class DetalleCarritoRepository implements IDetalleCarritoRepository{
    async createDetalle(data: createDetalleCarritoDTO): Promise<IDetalleCarrito> {
        return await DetalleCarritoModel.create(data);
    }
    async deleteDetalle(idDetalle: number): Promise<boolean> {
        const deleted = await DetalleCarritoModel.findByPk(idDetalle);
        if (!deleted) return false;
        await deleted.destroy()
        return true;
    }
    async findByCarritoId(carritoID : number): Promise<IDetalleCarrito[]> {
        const detalle = await DetalleCarritoModel.findAll({
            where : {
                id_carrito: carritoID
            }
        });
        const detalleArray = detalle.map((det) => ({
            id_detalle_carrito: det.id_detalle_carrito,
            id_carrito: det.id_carrito,
            id_producto: det.id_producto,
            cantidad: det.cantidad
        }))
        return detalleArray;
    }
}
export default new DetalleCarritoRepository();
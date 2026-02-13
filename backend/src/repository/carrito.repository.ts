import { createCarritoDTO } from "../DTOs/carrito.dto";
import { CarritoModel } from "../model/carrito.model";
import { ICarrito } from "../model/interfaces/interfaces";
import { ICarritoRepository } from "./interfaces/iCarritoRepository";

class CarritoRepository implements ICarritoRepository{
    async findByUser(idUsuario: number): Promise<ICarrito | null> {
        const carrito = await CarritoModel.findOne({
            where : {
                id_usuario :idUsuario
            }
        })
        if (!carrito) return null;

        return {
            id_carrito : carrito.id_carrito,
            id_usuario : carrito.id_usuario 
        }
    }
    async create( data : createCarritoDTO): Promise<ICarrito> {
        return await CarritoModel.create(data);
    }
}
export default new CarritoRepository();
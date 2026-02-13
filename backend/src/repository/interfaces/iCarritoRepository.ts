import { createCarritoDTO } from "../../DTOs/carrito.dto";
import { ICarrito } from "../../model/interfaces/interfaces";

export interface ICarritoRepository {
    create(data : createCarritoDTO) : Promise<ICarrito>;
    findByUser(idUsuario : number) : Promise<ICarrito | null>;
}
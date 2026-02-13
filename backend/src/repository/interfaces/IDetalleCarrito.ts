import { createDetalleCarritoDTO } from "../../DTOs/detalleCarrito.dto";
import { IDetalleCarrito } from "../../model/interfaces/interfaces";

export interface IDetalleCarritoRepository {
    createDetalle( data : createDetalleCarritoDTO) : Promise<IDetalleCarrito>;
    deleteDetalle( idDetalle : number ) : Promise<boolean>;
    findByCarritoId( carritoID : number) : Promise<IDetalleCarrito[]>;
}
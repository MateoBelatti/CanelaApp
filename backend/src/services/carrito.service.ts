import { carritoDTO, createCarritoDTO } from "../DTOs/carrito.dto";
import { createDetalleCarritoDTO, resDetalleCarritoDTO } from "../DTOs/detalleCarrito.dto";
import { ICarrito, IDetalleCarrito } from "../model/interfaces/interfaces";
import carritoRepository from "../repository/carrito.repository";
import detalleCarritoRepository from "../repository/detalleCarrito.repository";
import HttpError from "../utils/httpError";


class ServiceCarrito {
    async createDetalleCarrito ( data : createDetalleCarritoDTO ) : Promise<IDetalleCarrito>{
        // crea un DetalleCarrito, si no crea lanza un error
        const detalle = await detalleCarritoRepository.createDetalle(data);
        if( !detalle ) throw new HttpError("Error al crear DetalleCarrito", 500);
        return detalle;
    }
    async deteleDetalleCarrito( idDetalle : number ) : Promise<boolean>{
        // Elimina un detalle carrito, retorna true o flase depende del exito
        const deleted = await detalleCarritoRepository.deleteDetalle(idDetalle);
        return deleted;
    }
    async findAllDetallesByCarrito ( IDcarrito : number ) : Promise<resDetalleCarritoDTO[]>{
        // busca todos los detalles de un carrito
        const detalle = await detalleCarritoRepository.findByCarritoId(IDcarrito);
        //los tranforma a DTO
        const detalleArray : resDetalleCarritoDTO[] = detalle.map((det) => ({
            id_detalle_carrito : det.id_detalle_carrito,
            id_carrito : det.id_carrito,
            id_producto : det.id_producto,
            cantidad : det.cantidad
        }));
        return detalleArray;
    }
    async creteCarrito( data : createCarritoDTO ) : Promise<ICarrito>{
        // verifica que no exista, si existe lanza un error
        const exist = await this.findCarritoByUser(data.id_usuario);
        if ( exist ) throw new HttpError("El usuario ya tiene un carrito asociado", 500);
        // crea el carrito 
        const carrito = await carritoRepository.create(data);
        if (!carrito) throw new HttpError("Error al crear Carrito", 401);
        return carrito;

    }
    async findCarritoByUser( idUsuario : number) : Promise<carritoDTO | null>{
        // busca carrito de un usuario
        const carrito = await carritoRepository.findByUser(idUsuario);
        // si no encuentra retorna null
        if (!carrito) return null;
        const carritoDto : carritoDTO = {
            id_carrito : carrito.id_carrito,
            id_usuario : carrito.id_usuario
        }
        return carritoDto;
    }
}
export default new ServiceCarrito();
export interface createDetalleCarritoDTO {
    id_carrito : number;
    id_producto : number;
    cantidad : number;
}
export interface resDetalleCarritoDTO {
    id_detalle_carrito : number,
    id_carrito : number,
    id_producto : number;
    cantidad : number;
}
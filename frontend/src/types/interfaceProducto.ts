export interface IProductoCard {
    id_producto: number;
    imagen_producto: string;
    nombre: string;
    descripcion: string;
    precio: number;
    stock: number;
    activo: boolean;
    categoria: Promise<string>;
}
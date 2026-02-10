export interface CreateProductoDTO {
    imagen_producto?: string | null;
    nombre: string;
    descripcion: string;
    precio: number;
    stock: number;
    activo : boolean,
    id_categoria: number;
}
export interface UpdateProductoDTO {
    imagen_producto?: string | null;
    nombre?: string;
    descripcion?: string;
    precio?: number;
    stock?: number;
    activo?: boolean;
    id_categoria?: number;
}

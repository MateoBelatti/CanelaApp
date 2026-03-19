export interface IUsuario {
    id: number;
    nombre: string;
    email: string;
    passwordHash: string;
    rol: "ADMIN" | "VENDEDOR" | "USER";
    direccion: string | null;
    telefono: string | null;
}

/* ================= CATEGORIA ================= */

export interface ICategoria {
    id_categoria?: number;
    nombre: string;
}

/* ================= PRODUCTO ================= */

export interface IProducto {
    id_producto: number;
    imagen_producto: string | null;
    nombre: string;
    descripcion: string;
    precio: number;
    stock: number;
    activo: boolean;
    id_categoria: number;
}

/* ================= CARRITO ================= */

export interface ICarrito {
    id_carrito: number;
    id_usuario: number;
}

/* ============ DETALLE CARRITO ============ */

export interface IDetalleCarrito {
    id_detalle_carrito: number;
    id_carrito: number;
    id_producto: number;
    cantidad: number;
}

/* ================= COMPRA ================= */

export interface ICompra {
    id_compra?: number;
    id_usuario: number;
    fecha?: string;
    total: number;
    metodo_pago: "MercadoPago" | "Efectivo";

    // include
    detalles?: IDetalleCompra[];
}

/* ============ DETALLE COMPRA ============ */

export interface IDetalleCompra {
    id_detalle_compra?: number;
    id_compra: number;
    id_producto: number;
    cantidad: number;

    // include
    producto?: IProducto;
}

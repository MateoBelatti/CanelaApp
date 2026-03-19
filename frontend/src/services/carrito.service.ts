import * as interfacesType from "../types/interfaces";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

type ICarrito = interfacesType.ICarrito;
type IDetalleCarrito = interfacesType.IDetalleCarrito;

const getHeaders = () => ({
  "Content-Type": "application/json",
  "Authorization": `Bearer ${localStorage.getItem("token")}`,
});


// ==========================
// CARRITO
// ==========================

export const getCarrito = async ( idUsuario: string | number): Promise<ICarrito> => {

    const res = await fetch(`${API_URL}/api/carrito/${idUsuario}`, {
        method: "GET",
        headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });

    if (!res.ok) throw new Error("Error al obtener carrito");
    return res.json();
};


// ==========================
// DETALLE CARRITO
// ==========================

export const createDetalleCarrito = async ( data: Partial<IDetalleCarrito> ): Promise<Partial<IDetalleCarrito>> => {
    const res = await fetch(`${API_URL}/api/detalleCarrito`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Error al agregar producto al carrito");
    return res.json();
};


export const deleteDetalleCarrito = async ( idDetalle: string | number ): Promise<Partial<IDetalleCarrito>> => {
    const res = await fetch(`${API_URL}/api/detalleCarrito/${idDetalle}`, {
        method: "DELETE",
        headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });

    if (!res.ok) throw new Error("Error al eliminar producto del carrito");
    return res.json();
};


export const getDetallesByCarrito = async ( idCarrito: string | number ): Promise<IDetalleCarrito[]> => {
    const res = await fetch(`${API_URL}/api/detalleCarrito/${idCarrito}`, {
        method: "GET",
        headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });

    if (!res.ok) throw new Error("Error al obtener detalles del carrito");
    return res.json();
};
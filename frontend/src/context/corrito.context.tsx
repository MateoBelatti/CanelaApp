import { createContext, useEffect } from "react";
import {  useState, type ReactNode } from "react";
import * as CarritoService from "../services/carrito.service";
import * as interfacesType from "../types/interfaces";
import { AuthContext } from "./auth.context";
import { useContext } from "react";

type ICarrito = interfacesType.ICarrito;
type IDetalleCarrito = interfacesType.IDetalleCarrito;

interface ICarritoContext {
    carrito : ICarrito | null,
    detalleCarrito : IDetalleCarrito[],
    addProductCarrito : (idProducto : number) => Promise<void>,
    removeProductoCarrito : (idDetalle : number) => Promise<void>
}

const CarritoContext = createContext<ICarritoContext | null>(null);

export const CarritoProvider = ( { children }: { children: ReactNode }) =>{
    const [ carrito, setCarrito ] = useState<ICarrito | null>(null);
    const [ detalleCarrito, setDetalleCarrito ] = useState<IDetalleCarrito[]>([])
    const auth = useContext(AuthContext);

    const actualizarCarrito = async ( ) => {
        try {
            if (!carrito?.id_carrito) return;
            const detalles = await CarritoService.getDetallesByCarrito(carrito?.id_carrito);
            setDetalleCarrito(detalles);
            console.log(detalleCarrito);
        } catch (error) {
            console.error("Error al obtener detalles del carrito", error);
        }
    }

    const addProductCarrito = async ( idProducto : number ) : Promise<void> => {
        try {
            if (!carrito) return;
            //const existe = detalleCarrito.find( det => det.id_producto === idProducto);
            // if (existe) {
            //     // ACTUALIZAR API CREAR UPDATE DETALLE
            // } else {
            // //     await CarritoService.createDetalleCarrito({
            // //     id_carrito : carrito.id_carrito,
            // //     id_producto : idProducto,
            // //     cantidad : 1
            // // });
            // }
            await CarritoService.createDetalleCarrito({
            id_carrito : carrito.id_carrito,
            id_producto : idProducto,
            cantidad : 1
            });
            actualizarCarrito();
        } catch (error) {
            console.error("Error al añadir producto al carrito", error)
        }
    }

    const removeProductoCarrito = async ( idDetalle: string | number ) => {
        try {
            await CarritoService.deleteDetalleCarrito(idDetalle);
            if (carrito) {
                await actualizarCarrito();
            }
        } catch (error) {
            console.error("Error al eliminar producto del carrito", error)
        }
    }
    
    useEffect(() => {
        const cargar = async () => {
            if (!auth?.user?.id) return;

            const newCarrito = await CarritoService.getCarrito(auth?.user?.id);
            setCarrito(newCarrito);

            const detalles = await CarritoService.getDetallesByCarrito(newCarrito.id_carrito);
            setDetalleCarrito(detalles);
        }
        cargar();
    },[auth])

    return (
        <CarritoContext.Provider value={{ carrito, detalleCarrito, addProductCarrito, removeProductoCarrito }}>
            {children}
        </CarritoContext.Provider>
    )
}

export const useCarrito = ( ) => {
    const context = useContext(CarritoContext);
    if (!context) { 
        throw new Error("useCarrito debe usarse dentro de CarritoProvider"); 
    }
    return context;
}
import { useCarrito } from "../context/corrito.context";
import imgProd from "../utils/homePage/perfilImg.webp";
import { useEffect, useState } from "react";
import "../styles/carritoPage.css";
import type { IProducto } from "../types/interfaces";
import { getProductoById } from "../services/producto.service";


interface ProductoCarrito{
  producto: IProducto
  cantidad: number
  id_detalle: number
};
export default function CarritoPage() {
    const [productosCargados, setProductosCargados] = useState<ProductoCarrito[]>([])
    const carrito = useCarrito();

    const handleRestarProducto = (item : ProductoCarrito) => {
        if (item.cantidad === 1) {
          carrito.removeProductoCarrito(item.id_detalle);
          setProductosCargados( prev => prev.filter( p => p.producto.id_producto !== item.producto.id_producto));
        }else{
          setProductosCargados(prev => 
            prev.map( p => p.id_detalle === item.id_detalle
            ? { ...p, cantidad : p.cantidad - 1} : p
          ));
        }
    }
    const handleSumarProducto = ( item : ProductoCarrito) => {
      setProductosCargados( prev => prev.map( p =>
        p.id_detalle === item.id_detalle ? { ...p , cantidad : p.cantidad + 1 } : p
      ))
    }

    useEffect(()=>{
        const cargarProductos = async ( ) => {
            if (!carrito.detalleCarrito) return;

        const productos = await Promise.all(
              carrito.detalleCarrito.map(async (detalle) => {
                const producto = await getProductoById(detalle.id_producto);

                return {
                  producto,
                  cantidad: detalle.cantidad,
                  id_detalle: detalle.id_detalle_carrito
                };
              })
            );

            setProductosCargados(productos);
        }
        cargarProductos();
    }, [ carrito.detalleCarrito ])

    

  return (
    <div className="container py-5 carrito-page">
      <h2 className="mb-4">Tu carrito</h2>

      <div className="carrito-list">
        {productosCargados.map((item) => (
          <div key={item.producto.id_producto} className="carrito-item row align-items-center">

            {/* Imagen */}
            <div className="col-md-2 col-3">
              <img
                src={imgProd}
                alt={item.producto.nombre}
                className="img-fluid carrito-img"
              />
            </div>

            {/* Nombre */}
            <div className="col-md-4 col-9">
              <h5 className="mb-0">{item.producto.nombre}</h5>
            </div>

            {/* Precio */}
            <div className="col-md-2 text-center">
              ${item.producto.precio.toLocaleString()}
            </div>

            {/* Cantidad */}
            <div className="col-md-2 d-flex justify-content-center align-items-center gap-2">

              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => handleRestarProducto(item)}
              >
                -
              </button>

              <span>{item.cantidad}</span>

              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => handleSumarProducto(item)}
              >
                +
              </button>

            </div>

            {/* Subtotal */}
            <div className="col-md-2 text-end fw-bold">
              ${(item.producto.precio * item.cantidad).toLocaleString()}
            </div>

          </div>
        ))}
      </div>

      {/* Total */}
      <div className="carrito-total mt-4 d-flex justify-content-end">
        <h4>Total: ${}</h4>
      </div>

      {/* Botón comprar */}
      <div className="d-flex justify-content-end mt-3">
        <button className="btn btn-dark">
          Finalizar compra
        </button>
      </div>
    </div>
  );
}
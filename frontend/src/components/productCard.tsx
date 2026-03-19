import { ShoppingBag } from "lucide-react";
import imgProd from "../utils/homePage/perfilImg.webp"
import type { IProducto } from "../types/interfaces";
import { useEffect, useState } from "react";
import { getCategoriaById } from "../services/categoria.service";
import { useCarrito } from "../context/corrito.context";

// Importacion CSS
import "../styles/home/productCard.css";

export function ProductCard( product : IProducto) {
  const [categoria, setCategoria] = useState<string>();
  const carrito = useCarrito();

  useEffect(()=>{
    const buscarCategoria = async ()=> {
      const categoria = await getCategoriaById(product.id_categoria);
      setCategoria(categoria.nombre);
    }
    buscarCategoria();
  }, [])
  const HandleAddCarrito = ( idProduct : number ) => {
    try {
      carrito.addProductCarrito(Number(idProduct));
    } catch (error) {
      console.error("Error al añadir producto al carrito", error);
    }
  }
  return (
    <article className="product-card card h-100">
      <div className="card-img-wrapper position-relative">
        <img
          src={imgProd}
          alt={product.nombre}
          className="card-img-top"
        />
      </div>
      <div className="card-body d-flex flex-column">
        <h3 className="product-name fs-5">{product.nombre}</h3>
        <div className="product-footer d-flex justify-content-between align-items-center mt-2">
          <span className="product-price fw-bold">${product.precio.toLocaleString()}</span>
          <button
            className="btn btn-outline-accent btn-sm d-inline-flex align-items-center gap-1"
            onClick={() =>HandleAddCarrito(product.id_producto)}
          >
            <ShoppingBag size={14}  />
            Añadir
          </button>
        </div>
      </div>
    </article>
  )
}

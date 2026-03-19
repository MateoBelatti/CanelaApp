import { ProductCard } from '../productCard';
import { useEffect, useState } from 'react';
// SERVICE
import  * as productoService from "../../services/producto.service";
// INTERFACE
import type { IProducto } from '../../types/interfaces';
// STYLE
import '../../styles/home/productSeccion.css';




const ProductsSeccion = () => {
  // Datos de ejemplo basados en tu imagen
  const [ todosLosProductos, setTodosLosProducto ] = useState<IProducto[]>()
  
  useEffect(()=>{
      const cargarProducto = async () => {
        try {
          const productos = await productoService.getProductos();
          const productosFormat = Promise.all ( 
            productos.map( (pro)  => { 
              //cada categoria formateada
              const format : IProducto = {
                id_producto: pro.id_producto,
                imagen_producto: pro.imagen_producto,
                nombre: pro.nombre,
                descripcion: pro.descripcion,
                precio: pro.precio,
                stock: pro.stock,
                activo: pro.activo,
                id_categoria: pro.id_categoria
              }
            return format;
            })); // aca termina el map
            
            setTodosLosProducto( await productosFormat);
          } catch (error) {
            console.error("Error al cargar los cursos", error)
          }
      }
      cargarProducto();
  }, [])
  return (
    <section className="featured-products py-5">
      <div className="container text-center">
        <header className="mb-5">
          <span className="text-uppercase tracking-wider selection-text">Selección Curada</span>
          <h2 className="display-5 fw-bold section-title">Productos Destacados</h2>
          <p className="mx-auto section-subtitle" style={{ maxWidth: '600px' }}>
            Piezas seleccionadas por nuestro equipo de diseño, pensadas para elevar cada rincón de tu hogar.
          </p>
        </header>

        <div className="row g-4">
          {todosLosProductos?.map((product) => (
            <div key={product.id_producto} className="col-6 col-md-4 col-lg-3">
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSeccion;
import React, { useEffect, useState } from 'react';
import CategoryFilter from '../components/store/categoryFilter';
import { ProductCard } from '../components/productCard';
import '../styles/productPage.css';
// SERVICE
import * as CategoriasService from "../services/categoria.service";
import * as ProductoService from "../services/producto.service";
import { type ICategoria, type IProducto } from '../types/interfaces';

// Simulamos los datos que vendrían de tu base de datos o API
//const img_mockeada : string = 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=600&auto=format&fit=crop';


const StorePage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [categorias, setCategorias] = useState<ICategoria[]>();
  const [productos, setProductos] = useState<IProducto[]>();

  useEffect(()=>{
      const cargarCategorias = async () => {
        const categorias = await CategoriasService.getAllCategorias();
        const categoriasArray : ICategoria[] = categorias.map((cat) => {
          return cat
        })
        setCategorias(categoriasArray);
      }
      const cargarProducto = async () => {
        const producto = await ProductoService.getProductos();
        setProductos(producto);
      }
      cargarCategorias();
      cargarProducto();
  },[])

  const FiltrosActivados = 
      activeCategory === 0
      ? productos
      : productos?.filter((prod) => prod.id_categoria === activeCategory);
  return (
    <div className="page-container py-5">
      <div className="container">
        
        <header className="text-center mb-5">
          <p className="section-subtitle text-uppercase">Colección 2024</p>
          <h1 className="section-title">Catálogo de Muebles</h1>
        </header>

        <CategoryFilter 
          categories={categorias ?? []} 
          selected={activeCategory} 
          onSelect={setActiveCategory} 
        />

        {/* g-2: espacio pequeño en móvil 
          g-md-4: espacio normal en desktop
        */}
        <div className="row g-2 g-md-4 product-grid">
          {FiltrosActivados?.map((producto) => (
            /* col-6: FUERZA 2 columnas en móvil
              col-lg-3: mantiene 4 columnas en desktop
            */
            <div key={producto.id_producto} className="col-6 col-lg-3 d-flex justify-content-center">
              <ProductCard {...producto} />
            </div>
          ))}
        </div>

        {productos?.length === 0 && (
          <div className="text-center py-5">
            <p className="text-muted">No hay productos disponibles en {activeCategory}.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StorePage;
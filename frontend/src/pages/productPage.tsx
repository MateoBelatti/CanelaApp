import React, { useState } from 'react';
import CategoryFilter from '../components/store/categoryFilter';
import ProductCard from '../components/store/productCard';
import '../styles/productPage.css';

// Simulamos los datos que vendrían de tu base de datos o API
const img_mockeada : string = 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=600&auto=format&fit=crop';
const MOCK_DATA = [
  {
    id_producto: 1,
    imagen_producto: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=600&auto=format&fit=crop',
    nombre: 'Sillón Atelier',
    descripcion: 'Sillón de cuero premium con estructura de madera maciza. Diseño contemporáneo.',
    precio: 1890,
    stock: 5,
    activo: true,
    categoria: 'ASIENTOS'
  },
  {
    id_producto: 2,
    imagen_producto: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=600&auto=format&fit=crop',
    nombre: 'Lámpara Modern',
    descripcion: 'Iluminación tenue y cálida con diseño minimalista para espacios de lectura.',
    precio: 450,
    stock: 10,
    activo: true,
    categoria: 'ILUMINACION'
  },
  {
    id_producto: 3,
    imagen_producto: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=600&auto=format&fit=crop',
    nombre: 'Mesa Eames',
    descripcion: 'Mesa de centro con tope de vidrio templado y patas de madera clara.',
    precio: 1200,
    stock: 2,
    activo: true,
    categoria: 'MESAS'
  }
];

const CATEGORIES = ['TODOS', 'ASIENTOS', 'ILUMINACION', 'DECORACION', 'MESAS'];

const ProductPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('TODOS');

  const filteredProducts = activeCategory === 'TODOS'
    ? MOCK_DATA
    : MOCK_DATA.filter(p => p.categoria === activeCategory);

  return (
    <div className="page-container py-5">
      <div className="container">
        
        <header className="text-center mb-5">
          <p className="section-subtitle text-uppercase">Colección 2024</p>
          <h1 className="section-title">Catálogo de Muebles</h1>
        </header>

        <CategoryFilter 
          categories={CATEGORIES} 
          selected={activeCategory} 
          onSelect={setActiveCategory} 
        />

        {/* g-2: espacio pequeño en móvil 
          g-md-4: espacio normal en desktop
        */}
        <div className="row g-2 g-md-4 product-grid">
          {filteredProducts.map((producto) => (
            /* col-6: FUERZA 2 columnas en móvil
               col-lg-3: mantiene 4 columnas en desktop
            */
            <div key={producto.id_producto} className="col-6 col-lg-3 d-flex justify-content-center">
              <ProductCard {...producto} />
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-5">
            <p className="text-muted">No hay productos disponibles en {activeCategory}.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
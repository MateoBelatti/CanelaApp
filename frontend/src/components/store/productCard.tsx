import React from 'react';
import '../../styles/home/productCard.css'; // Importamos el CSS que definiremos abajo

interface ProductCardProps {
    id_producto : number,
    imagen_producto: string;
    nombre: string;
    descripcion: string;
    precio: number;
    stock: number;
    activo: boolean;
    categoria : string;
}

const ProductCard: React.FC<ProductCardProps> = ({
    id_producto,
    imagen_producto,
    nombre,
    descripcion,
    precio,
    stock,
    activo,
    categoria
}) => {
    return (
        <div className="card product-card border-0 shadow-sm">
            {/* Contenedor de Imagen con fondo gris claro */}
            <div className="card-img-container d-flex align-items-center justify-content-center">
                <img 
                src={imagen_producto} 
                className="img-fluid" 
                alt={nombre} 
                />
            </div>

            <div className="card-body p-4">
                <p className="category-text text-uppercase mb-1">{categoria}</p>
                <h5 className="card-title product-title mb-2">{nombre}</h5>
                <p className="card-text description-text mb-4">
                {descripcion}
                </p>

                <div className="d-flex justify-content-between align-items-center mt-auto">
                    <span className="price-tag">${precio.toLocaleString()}</span>
                    <button className="btn btn-outline-custom d-flex align-items-center gap-2">
                        <i className="bi bi-cart-plus"></i> {/* Asumiendo Bootstrap Icons */}
                        Añadir
                    </button>
                </div>
            </div>
    </div>
  );
};

export default ProductCard;
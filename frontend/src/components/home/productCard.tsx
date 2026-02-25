import { ShoppingBag } from "lucide-react"
import type { Product } from "@/src/types"
import "@/src/styles/productCard.css"

interface ProductCardProps {
  product: Product
  onAdd: (product: Product) => void
}

export function ProductCard({ product, onAdd }: ProductCardProps) {
  return (
    <article className="product-card card h-100">
      <div className="card-img-wrapper position-relative">
        <img
          src={product.image}
          alt={product.name}
          className="card-img-top"
        />
      </div>
      <div className="card-body d-flex flex-column">
        <span className="product-category text-muted">{product.category}</span>
        <h3 className="product-name fs-5">{product.name}</h3>
        <p className="product-desc flex-grow-1">{product.description}</p>
        <div className="product-footer d-flex justify-content-between align-items-center mt-2">
          <span className="product-price fw-bold">${product.price.toLocaleString()}</span>
          <button
            className="btn btn-outline-accent btn-sm d-inline-flex align-items-center gap-1"
            onClick={() => onAdd(product)}
          >
            <ShoppingBag size={14} />
            Añadir
          </button>
        </div>
      </div>
    </article>
  )
}

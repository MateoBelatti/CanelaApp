import { products } from "@/src/lib/data"
import { useAuth } from "@/src/context/AuthContext"
import { useCart } from "@/src/context/CartContext"
import { useToast } from "@/src/context/ToastContext"
import type { Product } from "@/src/types"
import { ProductCard } from "./ProductCard"
import "@/src/styles/products.css"

export function FeaturedProducts() {
  const featured = products.filter((p) => p.featured)
  const { isAuthenticated } = useAuth()
  const { addItem } = useCart()
  const toast = useToast()

  function handleAdd(product: Product) {
    if (!isAuthenticated) {
      toast.error("Inicia sesión para agregar productos al carrito")
      return
    }
    addItem(product)
    toast.success(`${product.name} agregado al carrito`)
  }

  return (
    <section className="featured-section py-5">
      <div className="container">
        <div className="section-header text-center mb-4">
          <span className="section-label text-uppercase fw-bold">Selección Curada</span>
          <h2 className="section-title fs-2 mt-2">Productos Destacados</h2>
          <p className="section-description text-muted">
            Piezas seleccionadas por nuestro equipo de diseño, pensadas para
            elevar cada rincón de tu hogar.
          </p>
        </div>

        <div className="row g-4">
          {featured.map((product) => (
            <div key={product.id} className="col-12 col-sm-6 col-lg-3">
              <ProductCard product={product} onAdd={handleAdd} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

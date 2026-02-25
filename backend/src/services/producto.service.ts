import  ProductoRepository  from "../repository/producto.repository";
import { CreateProductoDTO, ResProducto, UpdateProductoDTO } from "../DTOs/producto.dto";

class ProductoService {

    async getAll(): Promise<ResProducto[]> {
        const productosArray = await ProductoRepository.findAll();
        const dtoProductosArray : ResProducto[] = productosArray.map((producto) => ({
            id_producto : producto.id_producto,
            imagen_producto: producto.imagen_producto,
            nombre: producto.nombre,
            descripcion : producto.descripcion,
            precio: producto.precio,
            stock: producto.stock,
            activo: producto.activo,
            id_categoria: producto.id_categoria
        }))
        return dtoProductosArray;
    }

    async getById(id: number): Promise<ResProducto>{
        const producto = await ProductoRepository.findById(id);
        if (!producto) {
        throw new Error("Producto no encontrado");
        }
        const dtoProducto : ResProducto = {
            id_producto : producto.id_producto,
            imagen_producto: producto.imagen_producto,
            nombre: producto.nombre,
            descripcion : producto.descripcion,
            precio: producto.precio,
            stock: producto.stock,
            activo: producto.activo,
            id_categoria: producto.id_categoria
        }
        return dtoProducto;
    }

    async getProductosByCategoria(idCategoria: number): Promise<ResProducto[]> {
        const productosArray = await ProductoRepository.findByCategoria(idCategoria);

        if (!productosArray || productosArray.length === 0) {
            return [];
        }
        const dtoProductosArray : ResProducto[] = productosArray.map((producto) => ({
            id_producto : producto.id_producto,
            imagen_producto: producto.imagen_producto,
            nombre: producto.nombre,
            descripcion : producto.descripcion,
            precio: producto.precio,
            stock: producto.stock,
            activo: producto.activo,
            id_categoria: producto.id_categoria
        }))
        return dtoProductosArray;
    }

    async create(data: CreateProductoDTO) {
        return ProductoRepository.create(data);
    }

    async update(id: number, data: UpdateProductoDTO) {
        const producto = await ProductoRepository.findById(id);
        if (!producto) {
        throw new Error("Producto no encontrado");
        }

        return ProductoRepository.update(id, data);
    }

    async delete(id: number) {
        const producto = await ProductoRepository.findById(id);
        if (!producto) {
        throw new Error("Producto no encontrado");
        }

        // borrado lógico
        return ProductoRepository.delete(id);
    }
}
export default new ProductoService();
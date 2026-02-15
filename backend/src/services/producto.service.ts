import  ProductoRepository  from "../repository/producto.repository";
import { CreateProductoDTO, UpdateProductoDTO } from "../DTOs/producto.dto";

class ProductoService {

    async getAll() {
        return ProductoRepository.findAll();
    }

    async getById(id: number) {
        const producto = await ProductoRepository.findById(id);
        if (!producto) {
        throw new Error("Producto no encontrado");
        }
        return producto;
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
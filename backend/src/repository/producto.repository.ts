import { CreateProductoDTO, UpdateProductoDTO } from "../DTOs/producto.dto";
import { IProducto } from "../model/interfaces/interfaces";
import { ProductoModel } from "../model/producto.model";
import { IProductoRepository } from "./interfaces/IProductoRepository";

class ProductoRepository implements IProductoRepository {

    async findAll(): Promise<IProducto[]> {
        const producto = await ProductoModel.findAll();
        const productoArray : IProducto[] = producto.map((pro) => ({
            id_producto: pro.id_producto,
            imagen_producto: pro.imagen_producto,
            nombre: pro.nombre,
            descripcion: pro.descripcion,
            precio: pro.precio,
            stock: pro.stock,
            activo: pro.activo,
            id_categoria: pro.id_categoria
        }));
        return productoArray;
    }

    async findById(id: number): Promise<ProductoModel | null>{
        const categoria = await ProductoModel.findByPk(id);
        if (!categoria) return null 
        return categoria;
    }

    async findByCategoria(idCategoria: number): Promise<IProducto[]> {
        const producto =  await ProductoModel.findAll({
            where: { id_categoria: idCategoria }
            });
            const productoArray : IProducto[] = producto.map((pro) => ({
            id_producto: pro.id_producto,
            imagen_producto: pro.imagen_producto,
            nombre: pro.nombre,
            descripcion: pro.descripcion,
            precio: pro.precio,
            stock: pro.stock,
            activo: pro.activo,
            id_categoria: pro.id_categoria
        }));
        return productoArray;
        
    }

    async create(data: CreateProductoDTO): Promise<IProducto> {
        return await ProductoModel.create(data);
    }

    async update(id: number, data: UpdateProductoDTO): Promise<IProducto | null> {
        const producto = await ProductoModel.findByPk(id);
        if (!producto) return null;
        return producto.update(data);
    }

    async delete(id: number) : Promise<boolean> {
        const deleted = await ProductoModel.findByPk(id);
        if (!deleted) return false;
        await deleted.destroy();
        return true;
    }
}

export default new ProductoRepository();

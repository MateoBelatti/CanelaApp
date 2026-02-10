import { CreateProductoDTO, UpdateProductoDTO } from "../../DTOs/producto.dto";
import { IProducto } from "../../model/interfaces/interfaces";

export interface IProductoRepository {
    findAll(): Promise<IProducto[]>;
    findById(id: number): Promise<IProducto | null>;
    findByCategoria(idCategoria: number): Promise<IProducto[]>;
    create(data: CreateProductoDTO): Promise<IProducto>;
    update(id: number, data: UpdateProductoDTO): Promise<IProducto | null>;
    delete(id: number): Promise<boolean>;
}

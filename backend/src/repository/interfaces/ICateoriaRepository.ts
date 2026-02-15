import { CreateCategoriaDTO } from "../../DTOs/categoria.dto";
import { ICategoria } from "../../model/interfaces/interfaces";

export interface ICategoriaRepository {
    findAll(): Promise<ICategoria[]>;
    findById(id: number): Promise<ICategoria | null>;
    create(data: CreateCategoriaDTO): Promise<ICategoria>;
    update(id: number, data: ICategoria): Promise<ICategoria | null>;
    delete(id: number): Promise<boolean>;
}

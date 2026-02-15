import { CreateCategoriaDTO, UpdateCategoriaDTO } from "../DTOs/categoria.dto";
import { CategoriaModel } from "../model/categoria.model";
import { ICategoria } from "../model/interfaces/interfaces";
import { ICategoriaRepository } from "./interfaces/ICateoriaRepository";

export class CategoriaRepository implements ICategoriaRepository {

    async findAll() : Promise<ICategoria[]> {
        const categorias = await CategoriaModel.findAll();
        const categoriasArray : ICategoria[] = categorias.map((cat) => ({
            id_categoria : cat.id_categoria,
            nombre : cat.nombre
        }))
        return categoriasArray;
    }

    async findById(id: number) : Promise<ICategoria | null> {
        return await CategoriaModel.findByPk(id);
    }

    async create(data: CreateCategoriaDTO) : Promise<ICategoria> {
        return await CategoriaModel.create(data);
    }

    async update(id: number, data: UpdateCategoriaDTO) : Promise<ICategoria | null> {
        const categoria = await CategoriaModel.findByPk(id);
        if (!categoria) return null;
        if (!data.nombre) {
            throw new Error("Nombre no proporcionado")
        } 
        categoria.nombre = data.nombre;
        await categoria.save()
        return categoria;
    }

    async delete(id: number) : Promise<boolean>{
        const deleted = await CategoriaModel.findByPk(id);
        if (!deleted) return false;
        await deleted.destroy();
        return true;
    }
}
export default new CategoriaRepository();

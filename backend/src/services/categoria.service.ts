import  CategoriaRepository  from "../repository/categoria.repository";
import {
    CreateCategoriaDTO,
    UpdateCategoriaDTO,
    CategoriaDTO
} from "../DTOs/categoria.dto";
import { ICategoria } from "../model/interfaces/interfaces";

class CategoriaService {
    async getAll() {
        // devuelve todas las categorias guardadas en la base de datos
        return CategoriaRepository.findAll();
    }//

    async getById(id: number) : Promise<ICategoria | null> {
        const categoria = await CategoriaRepository.findById(id);
        return categoria;
    }//

    async create(data: CreateCategoriaDTO) : Promise<CreateCategoriaDTO> {

        const categoriaCreate = await CategoriaRepository.create(data);
        const categoria : CategoriaDTO = {
            nombre : categoriaCreate.nombre
        }
        return categoria;
    }

    async update(id: number, data: UpdateCategoriaDTO) {
        const categoria = await CategoriaRepository.findById(id);
        if (!categoria) { // si no encuentra categoria para editar lanza un error
        throw new Error("Categoría no encontrada");
        }
        return CategoriaRepository.update(id, data);
    }

    async delete(id: number) {
        const categoria = await CategoriaRepository.findById(id);
        if (!categoria) { // si no encuentra categoria lanza un error
        throw new Error("Categoría no encontrada");
        }

        return await CategoriaRepository.delete(id);
    }
}
export default new CategoriaService();

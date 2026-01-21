import usuarioRepository from "../repository/usuario.repository";
import { IUsuario } from "../model/interfaces/usuario.interface";
import { CreateUsuarioDTO, UpdateUsuarioDTO } from "../DTOs/usuario.dto";

class UsuarioService {
    async findAll() : Promise<IUsuario[]>{
        return await usuarioRepository.findAll();
    }
    async findById(idUsuario : number) : Promise<IUsuario | null>{
        return await usuarioRepository.findById(idUsuario)
    }
    async create( data : CreateUsuarioDTO ) : Promise<IUsuario>{
        return await usuarioRepository.create(data);
    }
    async update( data : UpdateUsuarioDTO, idUser : number ) : Promise<IUsuario>{
        return await usuarioRepository.update(data, idUser);
    }
    async delete( idUsuario : number ){
        return await usuarioRepository.delete(idUsuario);
    }
}

export default new UsuarioService();
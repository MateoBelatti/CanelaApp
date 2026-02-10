import usuarioRepository from "../repository/usuario.repository";
import { IUsuario } from "../model/interfaces/interfaces";
import { CreateUsuarioDTO, UpdateUsuarioDTO, UsuarioDTO } from "../DTOs/usuario.dto";
import HttpError from "../utils/httpError";

class UsuarioService {

    async findAll() : Promise<UsuarioDTO[]>{
        const usuariosArray : IUsuario[] =  await usuarioRepository.findAll();
        const usuariosDTOs : UsuarioDTO[] = usuariosArray.map((user) => (
            {
                nombre : user.nombre,
                email : user.email,
                direccion : user.direccion ?? null,
                telefono : user.telefono ?? null,
            }
        ));
        return usuariosDTOs
    }

    async findById(idUsuario : number) : Promise<UsuarioDTO>{
        const usuario = await usuarioRepository.findById(idUsuario);
        if (!usuario) {
            throw new HttpError("Usuario no encontrado", 404);
        }
        return ({
            nombre : usuario.nombre,
            email : usuario.email,
            direccion : usuario.direccion ?? null,
            telefono : usuario.telefono ?? null
        })
    }

    async create( data : CreateUsuarioDTO ) : Promise<UsuarioDTO>{
        const exist = await usuarioRepository.findByEmail(data.email);
        if (exist) {
            throw new HttpError("Email ya registrado", 409);
        }
        const datosCreate : CreateUsuarioDTO = {
                        nombre : data.nombre,
                        email : data.email,
                        passwordHash : data.passwordHash,
                        rol : data.rol ?? "USER",
                        direccion : data.direccion ?? null,
                        telefono : data.telefono ?? null
                    }
        const usuarioCreate : UsuarioDTO = await usuarioRepository.create(datosCreate);
        return usuarioCreate;
    }

    async update( data : UpdateUsuarioDTO, idUser : number ) : Promise<UsuarioDTO>{
        const exist = await usuarioRepository.findById(idUser);
        if (!exist) {
            throw new HttpError("Usuario no encontrado", 404)
        }
        const datosUpdate : UpdateUsuarioDTO = {
                        nombre : data.nombre,
                        email : data.email,
                        direccion : data.direccion ?? null,
                        telefono : data.telefono ?? null
                    }
        return await usuarioRepository.update(datosUpdate, idUser);
    }

    async delete( idUser : number ) : Promise<void> {
        const exist = await usuarioRepository.findById(idUser);
        if (!exist) {
            throw new HttpError("Usuario no encontrado", 404)
        }
        return await usuarioRepository.delete(idUser);
    }
}

export default new UsuarioService();
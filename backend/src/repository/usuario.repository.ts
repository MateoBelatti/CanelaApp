import { UsuarioModel } from "../model/usuario.model";
import UsuarioInterfaceRepo from "./interfaces/IUsuarioRepository";
import { CreateUsuarioDTO, UpdateUsuarioDTO } from "../DTOs/usuario.dto";
import { IUsuario } from "../model/interfaces/usuario.interface";
import HttpError from "../utils/httpError";

class UsuarioRepository implements UsuarioInterfaceRepo {

    async findAll(): Promise<IUsuario[]> {
        try {
            //Busca todos los usuarios de la tabla Usuarios, si existe lanza un error
            //Si no hay usuarios devuelve una lista vacia
            const usuarios = await UsuarioModel.findAll();
            const usuariosArray: IUsuario[] = usuarios.map((user) => ({
                id: user.id,
                nombre: user.nombre,
                email: user.email,
                passwordHash: user.passwordHash,
                rol: user.rol ?? "USER",
                direccion: user.direccion,
                telefono: user.telefono,
            }));
            return usuariosArray;
        } catch (error) {
            if (error instanceof HttpError) throw error;
            throw new HttpError("Error al obtener usuarios", 500);
        }
    }

    async findById(idUsuario: number): Promise<IUsuario | null> {
        try {
            // busca usuario por su ID, si no encuentra lanza un error 404
            const usuario = await UsuarioModel.findByPk(idUsuario);
            if (!usuario) throw new HttpError("Usuario no encontrado", 404);
            return {
                id: usuario.id,
                nombre: usuario.nombre,
                email: usuario.email,
                passwordHash: usuario.passwordHash,
                rol: usuario.rol,
                direccion: usuario.direccion,
                telefono: usuario.telefono,
            };
        } catch (error) {
            if (error instanceof HttpError) throw error;
            throw new HttpError("Error al obtener usuario por ID", 500);
        }
    }

    async create(data: CreateUsuarioDTO): Promise<IUsuario> {
        try {
            //crea usuario con datos pasados por parametros y devuelve el usuario creado
            const newUser = await UsuarioModel.create(data);
            return {
                id: newUser.id,
                nombre: newUser.nombre,
                email: newUser.email,
                passwordHash: newUser.passwordHash,
                rol: newUser.rol,
                direccion: newUser.direccion,
                telefono: newUser.telefono,
            };
        } catch (error) {
            if (error instanceof HttpError) throw error;
            throw new HttpError("Error al crear usuario", 500);
        }
    }

    async update( data: UpdateUsuarioDTO, idUser : number ): Promise<IUsuario> {
        try {
            // busca usuario por id,
            // si no existe lanza un error
            const usuario = await UsuarioModel.findByPk(idUser);
            if (!usuario) throw new HttpError("Usuario no encontrado", 404);
            //Aplico los cambios realizados
            usuario.direccion = data.direccion;
            usuario.email = data.email;
            usuario.nombre = data.nombre;
            usuario.telefono = data.telefono;
            await usuario.save(); // Guarda los cambios 
            
            return { // devuelve usuario actualizado
                id: usuario.id,
                nombre: usuario.nombre,
                email: usuario.email,
                passwordHash: usuario.passwordHash,
                rol: usuario.rol,
                direccion: usuario.direccion,
                telefono: usuario.telefono,
            };
        } catch (error) {
            if (error instanceof HttpError) throw error;
            throw new HttpError("Error al actualizar usuario", 500);
        }
    }

    async delete(idUsuario: number): Promise<void> {
        try {
            // elimina usuario, con id pasado por parametro, si existe lanza 404
            const usuario = await UsuarioModel.findByPk(idUsuario);
            if (!usuario) throw new HttpError("Usuario no encontrado", 404);

            await usuario.destroy();
        } catch (error) {
            if (error instanceof HttpError) throw error;
            throw new HttpError("Error al eliminar usuario", 500);
        }
    }
}

export default new UsuarioRepository();

import { UsuarioModel } from "../model/usuario.model"; // Modelo de sequelize
import UsuarioInterfaceRepo from "./interfaces/IUsuarioRepository"; // interface del repository
import { IUsuario } from "../model/interfaces/usuario.interface"; // interface de usuario
import { CreateUsuarioDTO, UpdateUsuarioDTO, UsuarioDTO } from "../DTOs/usuario.dto"; // importacionies de las DTOs
import HttpError from "../utils/httpError"; // Manejo de errores

class UsuarioRepository implements UsuarioInterfaceRepo {
    async findByEmail(dataEmail: string): Promise<IUsuario | null> {
        try {
            const usuario = await UsuarioModel.findOne({
            where: { 
                email: dataEmail 
            }
            });
            return usuario;
        } catch (error) {
            throw error;
        }
    }

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
            throw error;
        }
    }

    async findById(idUsuario: number): Promise<IUsuario> {
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
            throw error;
        }
    }

    async create(data: CreateUsuarioDTO): Promise<IUsuario> {
        try {
            //crea usuario con datos pasados por parametros y devuelve el usuario creado
            const newUser = await UsuarioModel.create(data);
            return newUser;
        } catch (error) {
            throw error;
        }
    }

    async update( data: UpdateUsuarioDTO, idUser : number ): Promise<UsuarioDTO> {
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
                nombre: usuario.nombre,
                email: usuario.email,
                direccion: usuario.direccion ?? null,
                telefono: usuario.telefono ?? null,
            };
        } catch (error) {
            throw error;
        }
    }

    async delete(idUsuario: number): Promise<void> {
        try {
            // elimina usuario, con id pasado por parametro, si existe lanza 404
            const usuario = await UsuarioModel.findByPk(idUsuario);
            if (!usuario) throw new HttpError("Usuario no encontrado", 404);

            await usuario.destroy();
        } catch (error) {
            throw error;
        }
    }
}

export default new UsuarioRepository();

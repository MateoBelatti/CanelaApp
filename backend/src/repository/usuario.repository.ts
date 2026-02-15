import { UsuarioModel } from "../model/usuario.model"; // Modelo de sequelize
import UsuarioInterfaceRepo from "./interfaces/IUsuarioRepository"; // interface del repository
import { IUsuario } from "../model/interfaces/interfaces"; // interface de usuario
import { CreateUsuarioDTO, UpdateUsuarioDTO, UsuarioDTO } from "../DTOs/usuario.dto"; // importacionies de las DTOs
import HttpError from "../utils/httpError"; // Manejo de errores

class UsuarioRepository implements UsuarioInterfaceRepo {
    async findByEmail(dataEmail: string): Promise<IUsuario | null> {
        const usuario = await UsuarioModel.findOne({
            where: { 
                email: dataEmail 
            }
        });
        return usuario;
    }

    async findAll(): Promise<IUsuario[]> {
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
    }

    async findById(idUsuario: number): Promise<IUsuario> {
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
    }

    async create(data: CreateUsuarioDTO): Promise<IUsuario> {
        //crea usuario con datos pasados por parametros y devuelve el usuario creado
        const newUser = await UsuarioModel.create(data);
        return newUser;
    }

    async update( data: UpdateUsuarioDTO, idUser : number ): Promise<UsuarioDTO> {
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
            direccion: usuario.direccion ?? null,
            telefono: usuario.telefono ?? null,
        };
    }

    async delete(idUsuario: number): Promise<void> {
        // elimina usuario, con id pasado por parametro, si existe lanza 404
        const usuario = await UsuarioModel.findByPk(idUsuario);
        if (!usuario) throw new HttpError("Usuario no encontrado", 404);

        await usuario.destroy();
    }
}

export default new UsuarioRepository();
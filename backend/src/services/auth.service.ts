import bcryptjs from 'bcryptjs';
import usuarioRepository from '../repository/usuario.repository';
import HttpError from '../utils/httpError';
import { UsuarioLoginDTO } from '../DTOs/usuario.dto';

const loginService = async (email: string, password: string) : Promise<UsuarioLoginDTO | null> => {
    try {
    const userVerify = await usuarioRepository.findByEmail(email);
    if (!userVerify) {
        console.log('loginService: user not found for', email);
        return null;
    }
    const comparePassword = userVerify.passwordHash;
    if (!comparePassword) {
        console.log('loginService: user has no passwordHash');
        return null;
    }
    const isValid = await bcryptjs.compare(password, comparePassword);
    if (!isValid) {
        return null;
    }
    const usuario : UsuarioLoginDTO = {
        id : userVerify.id,
        nombre : userVerify.nombre,
        email : userVerify.email,
        rol : userVerify.rol
    }
    return usuario;
    } catch (error) {
    console.error('loginService error', error);
    throw new HttpError('Usuaio o contraseña no identificados', 200);
    }
};

export default loginService;
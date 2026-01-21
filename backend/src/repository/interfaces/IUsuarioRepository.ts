import { IUsuario } from "../../model/interfaces/usuario.interface";
import { CreateUsuarioDTO, UpdateUsuarioDTO } from "../../DTOs/usuario.dto";

interface UsuarioInterfaceRepo {
    findAll(): Promise<IUsuario[]>;
    findById(idUsuario : number) : Promise<IUsuario | null> ;
    create( data : CreateUsuarioDTO) : Promise<IUsuario>;
    update( data : UpdateUsuarioDTO, idUser : number) : Promise<IUsuario>;
    delete( idUsuario : number) : void;
}

export default UsuarioInterfaceRepo;
import { IUsuario } from "../../model/interfaces/usuario.interface";
import { CreateUsuarioDTO, UpdateUsuarioDTO, UsuarioDTO } from "../../DTOs/usuario.dto";
import { promises } from "node:dns";

interface UsuarioInterfaceRepo {
    findAll(): Promise<IUsuario[]>;
    findById( idUsuario : number) : Promise<IUsuario | null> ;
    findByEmail( dataEmail : string) : Promise<IUsuario | null>;
    create( data : CreateUsuarioDTO) : Promise<UsuarioDTO>;
    update( data : UpdateUsuarioDTO, idUser : number) : Promise<UsuarioDTO>;
    delete( idUsuario : number) : void;
    
}

export default UsuarioInterfaceRepo;
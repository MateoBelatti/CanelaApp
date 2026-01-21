interface UsuarioDTO{
    id : number,
    nombre : string,
    email : string,
    direccion : string,
    telefono : string 
}
interface CreateUsuarioDTO{
    nombre : string,
    email : string,
    passwordHash : string,
    rol? : "ADMIN" | "VENDEDOR" | "USER",
    direccion? : string,
    telefono? : string 
}
interface UpdateUsuarioDTO{
    nombre : string,
    email : string,
    direccion : string,
    telefono : string 
}

export  {
    UsuarioDTO,
    CreateUsuarioDTO,
    UpdateUsuarioDTO
}
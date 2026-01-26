interface UsuarioDTO{
    nombre : string,
    email : string,
    direccion : string | null,
    telefono : string | null 
}
interface CreateUsuarioDTO{
    nombre : string,
    email : string,
    passwordHash : string,
    rol : "ADMIN" | "VENDEDOR" | "USER",
    direccion : string | null,
    telefono : string | null 
}
interface UpdateUsuarioDTO{
    nombre : string,
    email : string,
    direccion : string,
    telefono : string 
}
interface UsuarioLoginDTO{
    id: number,
    nombre : string,
    email : string,
    rol : string
}

export  {
    UsuarioDTO,
    CreateUsuarioDTO,
    UpdateUsuarioDTO,
    UsuarioLoginDTO
}
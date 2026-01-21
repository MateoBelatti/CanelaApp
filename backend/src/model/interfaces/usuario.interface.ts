export interface IUsuario {
    id : number,
    nombre : string,
    email : string,
    passwordHash : string,
    rol : "ADMIN" | "VENDEDOR" | "USER",
    direccion : string | null,
    telefono : string | null 
}

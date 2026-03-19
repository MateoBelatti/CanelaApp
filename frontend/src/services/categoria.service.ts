import * as interfacesType  from "../types/interfaces";
type ICategoria = interfacesType.ICategoria;

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const getHeaders = () => ({
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem("token")}`,
});

export const getAllCategorias = async () : Promise<ICategoria[]> => {
    const res = await fetch((`${API_URL}/api/categoria`));
    if (!res.ok) throw new Error("Error al cargar Categorias");
    return res.json();
}

export const getCategoriaById = async (idCategoria : number | string ) : Promise<ICategoria> => {
    const res = await fetch((`${API_URL}/api/categoria/${idCategoria}`));
    console.log(res);
    
    if (!res.ok) throw new Error("Error al cargar Categorias");
    return res.json();
}

export const createCategoria = async (data : Partial<ICategoria>) : Promise<Partial<ICategoria>> => {
    const res = await fetch((`${API_URL}/api/categoria`),{
        method : "POST",
        headers : getHeaders(),
        body :JSON.stringify(data)
    });
    if (!res.ok) throw new Error("Error al crear Categorias");
    return res.json();
}

export const updateCategoria = async (data : Partial<ICategoria>) : Promise<Partial<ICategoria>> => {
    const res = await fetch((`${API_URL}/api/categoria`),{
        method : "PUT",
        headers : getHeaders(),
        body :JSON.stringify(data)
    });
    if (!res.ok) throw new Error("Error al actualizar Categorias");
    return res.json();
}

export const deteleCategoria = async (idCategoria : number | string ) : Promise<ICategoria> => {
    const res = await fetch((`${API_URL}/api/categoria/${idCategoria}`), {
        method: "DELETE",
        cache: "no-store", 
        headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    if (!res.ok) throw new Error("Error al eliminar Categorias");
    return res.json();
}
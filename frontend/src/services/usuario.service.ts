import * as interfacesType from "../types/interfaces";
type IUsuario = interfacesType.IUsuario;

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const getHeaders = () => ({
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem("token")}`,
});

// GET - Obtener todos los usuarios
export const getAllUsuarios = async (): Promise<IUsuario[]> => {
    const res = await fetch(`${API_URL}/api/usuario`);
    if (!res.ok) throw new Error("Error al cargar Usuarios");
    return res.json();
};

// GET - Obtener usuario por ID
export const getUsuarioById = async (id: number | string): Promise<{succes : boolean, data: IUsuario}> => {
    const res = await fetch(`${API_URL}/api/usuario/${id}`);
    if (!res.ok) throw new Error("Error al cargar Usuario");
    return res.json();
};

// POST - Crear usuario
export const createUsuario = async (
    data: Partial<IUsuario>
): Promise<IUsuario> => {
    const res = await fetch(`${API_URL}/api/usuario`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Error al crear Usuario");
    return res.json();
};

// PUT - Actualizar usuario
export const updateUsuario = async (
    id: number | string,
    data: Partial<IUsuario>
): Promise<IUsuario> => {
    const res = await fetch(`${API_URL}/api/usuario/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Error al actualizar Usuario");
    return res.json();
};

// DELETE - Eliminar usuario
export const deleteUsuario = async (
    id: number | string
): Promise<IUsuario> => {
    const res = await fetch(`${API_URL}/api/usuario/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        cache: "no-store",
    });

    if (!res.ok) throw new Error("Error al eliminar Usuario");
    return res.json();
};
import * as interfacesType  from "../types/interfaces";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

type IProducto = interfacesType.IProducto;

const getHeaders = () => ({
  "Content-Type": "application/json",
  "Authorization": `Bearer ${localStorage.getItem("token")}`,
});

export const getProductos = async (): Promise<IProducto[]> => {
  const res = await fetch(`${API_URL}/api/producto`);
  if (!res.ok) throw new Error("Error al obtener productos");
  return res.json();
};

export const getProductoById = async (idProducto: string | number): Promise<IProducto> => {
  const res = await fetch(`${API_URL}/api/producto/${idProducto}`,{
    method: "GET",
    cache: "no-store", 
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (!res.ok) throw new Error("Error al obtener producto");
  return res.json();
};

export const getProductoByCategoria = async (idProducto: string | number): Promise<Partial<IProducto[]>> => {
  const res = await fetch(`${API_URL}/api/producto/${idProducto}`,{
    method: "GET",
    cache: "no-store", 
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (!res.ok) throw new Error("Error al obtener productos");
  return res.json();
};

export const createProducto = async (data : Partial<IProducto>): Promise<Partial<IProducto>>=> {
  const res = await fetch(`${API_URL}/producto`, {
    method : "POST",
    headers : getHeaders(),
    body :JSON.stringify(data)
  })
  if (!res.ok) throw new Error("Error al crear producto");
  return res.json();
}

export const deleteProducto = async (idProducto: string | number): Promise<Partial<IProducto>>=> {
  const res = await fetch(`${API_URL}/producto/${idProducto}`, {
    method : "DELETE",
    headers : {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body : JSON.stringify({message : "Producto Eliminado"})
  })
  if (!res.ok) throw new Error("Error al  producto");
  return res.json();
}


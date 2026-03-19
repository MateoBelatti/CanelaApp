const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const loginService = async (data: { email: string; password: string }) => {
  const res = await fetch(`${API_URL}/api/auth  `, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error en login");
  
  return res.json()  
};

export const registerService = async (data: { nombre: string; email: string; password: string;}) => {
  const res = await fetch(`${API_URL}/api/usuario`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({nombre : data.nombre, email : data.email, passwordHash : data.password}),
  });
  if (!res.ok) throw new Error("Error en registro");
  return res.json();
};
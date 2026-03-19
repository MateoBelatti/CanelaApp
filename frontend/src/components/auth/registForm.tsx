import type React from "react";
import { useState } from "react";
import { registerService } from "../../services/auth.service";
import { registerSchema } from "../../utils/validate/valitades";
import { type Mode } from "../../pages/authPage";

interface Props {
    setMode: React.Dispatch<React.SetStateAction<Mode>>;
}

export const RegisForm : React.FC<Props> = ( { setMode } ) => {
    const [ formData, setFormData ] = useState({nombre : '', email : '', password: "" });
    const [ errorData, setErrorData ] = useState<{nombre? : string, email? : string, password? : string}>({});
    const [ isLoading, setIsLoading] = useState(false);
    const [ serverError , setServerError ] = useState<string>();
    const [ createdSuccess, setCreatedSuccess] = useState(false);

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setFormData({...formData, [e.target.name] : e.target.value});
        setErrorData({});
    };
    const handldeSubmit = async (e : React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const result = registerSchema.safeParse(formData);
                if (!result.success) {
                    const rawErrors = result.error.flatten().fieldErrors;
                    setErrorData({
                        email: rawErrors.email?.[0],
                        password: rawErrors.password?.[0],
                        nombre : rawErrors.nombre?.[0]
                        });
                    return;
                }
        try {
            const res = await registerService(formData);
            const response = res as  { success : boolean, data : string };
            if (!response.success) {
                setServerError("No se pudo crear el usuario");
                setIsLoading(false);
            }setCreatedSuccess(true)
            setTimeout(( ) =>  setMode("Login") , 1600)
            
        } catch (error) {
            setServerError("No se puedo recuperar los datos")
        } finally {
            setIsLoading(false);
        }
    }
    return(
        <form onSubmit={handldeSubmit}>
            <h2 className="text-center mb-4">Registrarse</h2>
            <div className="mb-3">
                <label className="form-label">Ingrese su Nombre</label>
                <input
                    type="text"
                    name="nombre"
                    className="form-control"
                    value={formData.nombre}
                    onChange={handleChange}
                />
                {errorData.email && (
                    <div className="text-danger mt-1">{errorData.nombre}</div>
                )}
            </div>
            <div className="mb-3">
                <label className="form-label">Ingrese su Email</label>
                <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                />
                {errorData.email && (
                    <div className="text-danger mt-1">{errorData.email}</div>
            )}
            </div>

            <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={formData.password}
                    onChange={handleChange}
                />
            </div>

            <button
            type="submit"
            className="btn btn-dark w-100">
            {isLoading ? "Ingresando..." : "Ingresar"}
            </button>
            { createdSuccess && (
                <div className="alert alert-success mt-3" role="alert">
                Registro exitoso
                </div>)
            }
            {serverError && <p style={{ color: 'red' }}>{serverError}</p>}
        </form>
    )
}
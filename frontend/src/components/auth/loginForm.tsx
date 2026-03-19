import type React from "react";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import { loginSchema } from "../../utils/validate/valitades";
import { loginService } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import "../../styles/auth/login.css";

export const LoginForm : React.FC = () => {
    const [ formData, setFormData ] = useState({email : '', password : "" });
    const [ errorData, setErrorData ] = useState<{email? : string, password? : string }>({})
    const [ isLoading, setIsLoading ] = useState(false);
    const [ serverError , setServerError ] = useState<string>();
    const [ loginSuccess, setLoginSuccess] = useState(false);
    const navigate = useNavigate();
    const auth = useContext(AuthContext);

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setFormData({...formData, [e.target.name] : e.target.value});
        setErrorData({});
    }
    const HandleSubmit = async (e : React.FormEvent) => {
        e.preventDefault();
        const result = loginSchema.safeParse(formData);
        if (!result.success) {
            const rawErrors = result.error.flatten().fieldErrors;
            setErrorData({
                email: rawErrors.email?.[0],
                password: rawErrors.password?.[0],
                });
            return;
        }
        try {
            setIsLoading(true);
            const response = await loginService(formData);
            const res = response as { token : string, message : string};
            const token = res.token;
            if (!token) throw new Error("Token no proporcionado");
            
            auth?.login(token);
            setLoginSuccess(true);
            setTimeout(() => navigate("/"), 1800)

        } catch (error) {
            if (error instanceof Error) {
                setServerError("Error al iniciar sesión");
            } else {
                setServerError("Error desconocido");
            }
        }
        finally{
            setIsLoading(false)
        }
        

    }
    return (
        <form onSubmit={HandleSubmit}>
            <h2 className="text-center mb-4">Iniciar Sesión</h2>

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
            { loginSuccess && (
                <div className="alert alert-success mt-3" role="alert">
                Registro exitoso
                </div>)
            }
            {serverError && <p style={{ color: 'red' }}>{serverError}</p>}
        </form>
);
}
import type React from "react";
import { useState } from "react";
import { LoginForm } from "../components/auth/loginForm";
import { RegisForm } from "../components/auth/registForm";
import "../styles/auth/sessionPage.css";
import { useEffect } from "react";
export type Mode = 'Login' | 'Register';


export const AuthPage : React.FC = ( ) => {
    const [ mode, setMode ] = useState<Mode>("Login");
    useEffect(()=>{}, [ mode ])
    return (
  <div className="session-wrapper d-flex justify-content-center align-items-center">
    <div className="card shadow-lg p-4 session-card">

      <div className="d-flex mb-4">
        <button
          className={`btn w-50 ${
            mode === "Login" ? "btn-dark" : "btn-outline-dark"
          }`}
          onClick={() => setMode("Login")}
        >
          Iniciar Sesión
        </button>

        <button
          className={`btn w-50 ${
            mode === "Register" ? "btn-dark" : "btn-outline-dark"
          }`}
          onClick={() => setMode("Register")}
        >
          Registrarse
        </button>
      </div>

      {mode === "Login" ? <LoginForm /> : <RegisForm setMode={setMode} />}

    </div>
  </div>
);
}
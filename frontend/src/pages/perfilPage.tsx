import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";

export const PerfilPage : React.FC = () => {
    const [ isLoged, setIsLoged ] = useState(false);
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(()=>{
        const verificarLoged = () => {
            if (auth?.user) {
                setIsLoged(true);
            } else {
                setIsLoged(false);
            }
        }
        verificarLoged();
    } ,[])
    const handleCick = ( ) => {
        if (isLoged) {
            auth?.logout();
            navigate("/")
        }
    }
    return (

        <button onClick={handleCick}>
            Cerrar Sesion
        </button>
    )
}
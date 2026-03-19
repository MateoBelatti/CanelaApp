import type React from "react";
import { useState, useRef, useEffect } from "react";
import Sidebar from "../components/layouts/sidebar";
import { Dashbord } from "../components/profile/dashbord";


    type TypeCargar = "Inicio" | "Productos" | "Categorias" | "Usuarios"  | "Mensajes" | "Dashbord"
    export type sidebarProps = {
        setCargar : React.Dispatch<React.SetStateAction<TypeCargar>>
    }
export const PerfilAdminPage : React.FC = ( )  => {
    const [ cargar, setCargar ] = useState<TypeCargar>('Dashbord')
    return (
        <div className="perfilPage">
            <Sidebar setCargar={setCargar}/>
            <Dashbord />
        </div>
        
    )
}
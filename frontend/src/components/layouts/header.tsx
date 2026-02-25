import React from "react";
import "../../styles/layouts/header.css"; 
import { LuUser } from "react-icons/lu"; // He cambiado a Lucide React por ser más minimalista, pero FaUser sirve igual

const Header: React.FC = () => {
    return (
    <header className="header py-4">
        <div className="container d-flex justify-content-between align-items-center">
            {/* Logo con estilo Luxe */}
            <div className="logo">
                <h1 className="m-0">CANELA</h1>
            </div>

            {/* Navegación centralizada y limpia */}
            <nav className="d-none d-md-block">
                <ul className="nav">
                    <li className="nav-item">
                        <a className="nav-link" href="/">INICIO</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/producto">PRODUCTOS</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/contacto">CONTACTO</a>
                    </li>
                </ul>
            </nav>

            {/* Icono de usuario */}
            <div className="user-icon-container">
                <LuUser size={24} strokeWidth={1.5} />
            </div>
        </div>
    </header>
    );
};

export default Header;
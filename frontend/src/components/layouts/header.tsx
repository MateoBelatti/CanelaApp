import React, { useEffect } from "react";
import "../../styles/layouts/header.css"; 
import { CiShoppingCart, CiUser } from "react-icons/ci"; // He cambiado a Lucide React por ser más minimalista, pero FaUser sirve igual
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth.context";
import { useState } from "react";
import { getUsuarioById } from "../../services/usuario.service";
import type { IUsuario } from "../../types/interfaces";
import { useCarrito } from "../../context/corrito.context";


const Header: React.FC = () => {
    const [ user, setUser ] = useState< { nombre : string, id : string} | null>(null);
    const [ error, setError] = useState<string | null>(null);
    const [ openBurbuja, setOpenBurbuja ] = useState(false);

    const auth = useAuth();
    const carrito = useCarrito();
    const navigate = useNavigate();

    async function getUsuario( idUsuario: string): Promise<IUsuario | null> {
        try {
            const res = await getUsuarioById(idUsuario);

            if (!res) return null;
            const data : IUsuario = {
                id : res.data.id,
                nombre : res.data.nombre,
                email : res.data.email,
                direccion : res.data.direccion,
                telefono : res.data.telefono
            }
            return data;
        } catch (error) {
            return null;
        }
    }
    const handleOpenPerfil = ( ) => {
        if (auth.user?.rol === 'ADMIN' || auth.user?.rol === 'VENDEDOR') {
            navigate("/admin");
        } else {
            navigate("/perfil");
        }
        setOpenBurbuja(false);
    }

    useEffect(() => {
        const cargarUsuario = async() => {
            if (!auth?.user) {
                setUser(null);
                return
            }
            try {
                const usuario = await getUsuario(auth.user.id);
                if (usuario) {
                    setUser({nombre : usuario.nombre, id : auth.user.id})
                } else {
                    setUser(null);
                }
            } catch (error) {
                setError("Error al cargar usuario")
            }
            }
            
        cargarUsuario();
    }, [auth?.user])
    const handleButtom = () => {
        if (user) {
            setOpenBurbuja(!openBurbuja);
            return
        } else {
            navigate("/login")
        }
    }
    if (error !== null) {
        return (
            <div> ERROR AL CARGAR</div>
        )
    }
    return (
                <header className="header py-3">
            <div className="container d-flex flex-wrap align-items-center justify-content-between">

                {/* Logo */}
                <div className="logo">
                    <h1 className="m-0" >CANELA ARTESANIAS</h1>
                </div>

                {/* Navegación */}
                <nav className="main-nav">
                <ul className="nav-list">
                    <li><a href="/">INICIO</a></li>
                    <li><a href="/producto">PRODUCTOS</a></li>
                    <li><a href="/contacto">CONTACTO</a></li>
                </ul>
                </nav>

                {/* Iconos derecha */}
                <div className="icons-container">

                {/* Usuario */}
                <div className="user-wrapper">
                    <button onClick={handleButtom} className="icon-button">
                        <CiUser color="#8f7889be" size={24} />
                    </button>

                    {user?.nombre && openBurbuja && (
                        <>
                        <div className="overlay" onClick={handleButtom}></div>

                        <div className="user-bubble">
                            <p className="user-name">Hola, {user.nombre}</p>

                            <button
                            className="perfil-btn"
                            onClick={handleOpenPerfil}
                            >
                            Ir a mi perfil
                            </button>
                        </div>
                        </>
                    )}
                </div>

                {/* Carrito */}
                {user?.nombre && carrito && auth.user?.rol !== "VENDEDOR" && (
                    <a href="/carrito" className="cart-wrapper">
                    <CiShoppingCart size={28} color="#8f7889be" />

                    {carrito.detalleCarrito.length > 0 &&(
                        <span className="cart-badge">
                        {carrito.detalleCarrito.length}
                        </span>
                    )}
                    </a>
                )}

                </div>

            </div>
            </header>
    );
};

export default Header;
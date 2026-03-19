import React, { useState, useEffect, useRef } from 'react';
import '../../styles/layouts/sidebar.css';
// Asegúrate de tener bootstrap instalado: npm install bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import type { sidebarProps } from '../../pages/perfilAdminPage';
import logo from '../../../public/logo.png';
// Asegúrate de tener bootstrap-icons: npm install bootstrap-icons

const Sidebar: React.FC<sidebarProps> = ({setCargar}) => {
  const [isOpen, setIsOpen] = useState(false); // Controla si está visible o no
  const sidebarRef = useRef<HTMLDivElement>(null); // Referencia para detectar clics externos

    const alterSidebar = () => {
        setIsOpen(!isOpen);
    };

  // Efecto para manejar el clic fuera
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
        // Si la sidebar está abierta Y el clic NO fue dentro de la sidebarRef
        if (isOpen && sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
            alterSidebar();
        }
        }

    // Agregar el event listener al documento
        document.addEventListener("mousedown", handleClickOutside);
        
        // Limpieza del event listener al desmontar el componente
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
  }, [isOpen]); // Re-ejecutar si cambia el estado isOpen

    return (
        <>
        {/* Botón flotante para abrir la sidebar si está oculta */}
        {!isOpen && (
            <button
            onClick={alterSidebar}
            className="position-fixed z-3 border-0"
            style={{
                top: "80px",      // 👈 lo baja (ajustá según tu header)
                left: "20px",
                background: "white",
                borderRadius: "50%",
                padding: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                cursor: "pointer"
            }}
        >
            <img
                src={logo}
                alt="menu"
                style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%"
                }}
            />
        </button>
        )}

        {/* Overlay opaco (opcional, para oscurecer el fondo cuando está abierta) */}
        {isOpen && <div className="sidebar-overlay z-1" onClick={alterSidebar}></div>}

        {/* SIDEBAR */}
        <aside 
            ref={sidebarRef} // Asignamos la referencia
            className={`sidebar d-flex flex-column z-2 shadow ${isOpen ? 'show' : ''}`}
            >
            {/* Header con Logo */}
            <div className="header d-flex align-items-center p-3 border-bottom">
                <img src={logo} alt="Logo" className="logo me-2" style={{width: '32px'}} />
                <span className="logo-text fw-bold fs-4">Canela</span>
                <button onClick={alterSidebar} className="btn-close ms-auto d-md-none" aria-label="Close"></button>
            </div>

            {/* Navegación Principal */}
            <nav className="nav flex-column flex-grow-1 px-2 pt-3">
                <button className="nav-item-btn active d-flex align-items-center border-0 bg-transparent py-2 px-3 mb-1 w-100"
                            onClick={()=> {setCargar('Inicio'); alterSidebar()}}>
                    <i className="bi bi-house-door-fill fs-5 me-3"></i>
                    <p className="m-0 text-nowrap">Inicio</p>
                </button>
                <button className="nav-item-btn active d-flex align-items-center border-0 bg-transparent py-2 px-3 mb-1 w-100"
                            onClick={()=>{ setCargar('Dashbord'); alterSidebar()}}>
                    <i className="bi bi-house-door-fill fs-5 me-3"></i>
                    <p className="m-0 text-nowrap">Dashbord</p>
                </button>
                <button className="nav-item-btn active d-flex align-items-center border-0 bg-transparent py-2 px-3 mb-1 w-100"
                            onClick={()=> {setCargar('Productos'); alterSidebar()}}>
                    <i className="bi bi-house-door-fill fs-5 me-3"></i>
                    <p className="m-0 text-nowrap">Productos</p>
                </button>
                <button className="nav-item-btn active d-flex align-items-center border-0 bg-transparent py-2 px-3 mb-1 w-100"
                            onClick={()=>{ setCargar('Categorias'); alterSidebar()}}>
                    <i className="bi bi-house-door-fill fs-5 me-3"></i>
                    <p className="m-0 text-nowrap">Categorias</p>
                </button>
                <button className="nav-item-btn active d-flex align-items-center border-0 bg-transparent py-2 px-3 mb-1 w-100"
                            onClick={()=> {setCargar('Usuarios') ; alterSidebar()}}>
                    <i className="bi bi-house-door-fill fs-5 me-3"></i>
                    <p className="m-0 text-nowrap">Usuarios</p>
                </button>
                <button className="nav-item-btn active d-flex align-items-center border-0 bg-transparent py-2 px-3 mb-1 w-100"
                            onClick={()=> {setCargar('Mensajes'); alterSidebar()}}>
                    <i className="bi bi-house-door-fill fs-5 me-3"></i>
                    <p className="m-0 text-nowrap">Mensajes</p>
                </button>
            </nav>

            <hr className="mx-3 my-2" />

            {/* Sección Inferior (Profile) */}
            <nav className="nav flex-column bottom px-2 pb-3">
                <button className="nav-item-btn d-flex align-items-center border-0 bg-transparent py-2 px-3 w-100">
                    <img src="avatar.png" alt="Profile" className="avatar rounded-circle me-3" width="32" height="32" />
                    <p className="m-0 text-nowrap">Profile</p>
                </button>
            </nav>
        </aside>
        </>
    );
};

export default Sidebar;
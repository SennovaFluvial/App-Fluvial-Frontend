import React, { useState } from 'react';
import './assets/css/sidebar.css'; // Importa los estilos CSS
import Logo from './assets/img/LogoSena.png'; // Importa el logo
import Icono from './assets/img/icono.png';
import { useNavigate } from "react-router-dom" // Importa el hook para redirecciones
/* Importaciones de componentes para el menu */
import { Agregar } from './components/menu/Agregar';
import { Actualizar } from './components/menu/Actualizar';
import { Configuraciones } from './components/menu/Configuraciones';
import { Historiales } from './components/menu/Historiales';
import { Informes } from './components/menu/Informes';

/**
 * Componente Sidebar
 * 
 * Este componente muestra una barra lateral con opciones de navegación. Tiene un menú desplegable para agregar vehículos y marineros hasta el momento.
 * 
 * @returns {React.ReactNode} - Renderiza la barra lateral con enlaces de navegación.
 */
export const Sidebar = ({ user, setUser }) => {

    const nav = useNavigate(); // Prepara la función para redirigir

    // Función para cerrar sesión
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user'); // Asegúrate de limpiar también el usuario
        setUser(null); // Limpia el estado del usuario
        console.log('Logout exitosamente'); // Mensaje en la consola
        nav('/Login'); // Redirige a la página de inicio de sesión
    };

    return (
        <>
            <aside className="sidebar">
                <div className="titulo-section">
                    <h1>Transporte Fluvial</h1>
                </div>
                <div className="icono">
                    <div className="row section-account">
                        <div className="col-md-2 section-account-part1 text-center">
                            <img src={Icono} alt="Icono Sidebar" />
                        </div>
                        <div className="col-md-10 text-center">
                            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                                <li className="nav-item dropdown section-account-part2">
                                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        {user.username}
                                    </a>
                                    <ul className="dropdown-menu menu-account">
                                        <li><a className="dropdown-item text-black" href="#">Mi cuenta</a></li>
                                        <li><a className="dropdown-item text-black" href="#">Administracion</a></li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li>
                                            <button onClick={logout} className='btn btn-danger boton-logout ms-2'>
                                                Cerrar sesion <i className="fa-solid fa-door-open"></i>
                                            </button>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <nav className="menu">

                    { /* Componentes que forman las acciones del menu */}

                    <Agregar />
                    <Actualizar />
                    <Configuraciones />
                    <Historiales user={user} />
                    <Informes />

                </nav>
                <div className='logo-sena'>
                    <img src={Logo} alt="Logo SENA" />
                </div>
            </aside>
        </>
    );
}

import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importa el componente para enlaces de navegación
import './assets/css/sidebar.css'; // Importa los estilos CSS
import Logo from './assets/img/LogoSena.png'; // Importa el logo
import Icono from './assets/img/icono.png';

/**
 * Componente Sidebar
 * 
 * Este componente muestra una barra lateral con opciones de navegación. Tiene un menú desplegable para agregar vehículos y marineros hasta el momento.
 * 
 * @returns {React.ReactNode} - Renderiza la barra lateral con enlaces de navegación.
 */
export const Sidebar = () => {
    // Estado para controlar la visibilidad del menú desplegable
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Función para alternar la visibilidad del menú desplegable
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <>
            <aside className="sidebar">
                <div className="titulo-section">
                    <h1>Transporte Fluvial</h1>
                </div>
                <div className="icono">
                    <img src={Icono} alt="Icono Sidebar" />
                </div>
                <nav className="menu">
                    <ul>
                        <li onClick={toggleDropdown} className="dropdown">  {/* Opción de menú desplegable */}
                            <span>Agregar</span>
                            {isDropdownOpen && (
                                <ul className="dropdown-menu"> {/* Menú desplegable */}
                                    <li><Link to={'add-vehicle'}>Agregar Vehículo</Link></li>
                                    <li><Link to={'add-salior'}>Agregar Marinero</Link></li>
                                </ul>
                            )}
                        </li>
                        <li><Link to="/actualizar">Actualizar</Link></li>
                        <li><Link to="/historiales">Historiales</Link></li>
                        <li><Link to="/informe">Informe</Link></li>
                        <li><Link to="/configuracion">Configuración</Link></li>
                    </ul>
                </nav>
                <div className='logo-sena'>
                    <img src={Logo} alt="Logo SENA" />
                </div>
            </aside>
        </>
    );
}

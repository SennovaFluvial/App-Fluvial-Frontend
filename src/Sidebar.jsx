import React, { useEffect, useState } from 'react';
import './assets/css/sidebar.css'; // Importa los estilos CSS
import Logo from './assets/img/LogoSena.png'; // Importa el logo
import Icono from './assets/img/icono.png';
import { useNavigate } from "react-router-dom" // Importa el hook para redirecciones
import { ApiService } from './class/ApiServices';

/* Importaciones de componentes para el menu */
import { Agregar } from './components/menu/Agregar';
import { Inventarios } from './components/menu/Inventarios';
import { Configuraciones } from './components/menu/Configuraciones';
import { Actualizar } from './components/menu/Actualizar';
import { Informes } from './components/menu/Informes';

/* Importaciones nuevas de componentes para el menu */
import { EmployeeSection } from './components/menu/EmployeeSection';
import { CustomerSection } from './components/menu/CustomerSection';
import { CompanySection } from './components/menu/CompanySection';
import { SailorSection } from './components/menu/SailorSection';
import { VehicleSection } from './components/menu/VehicleSection';

/**
 * Componente Sidebar
 * 
 * Este componente muestra una barra lateral con opciones de navegación. Tiene un menú desplegable para agregar vehículos y marineros hasta el momento.
 * 
 * @returns {React.ReactNode} - Renderiza la barra lateral con enlaces de navegación.
 */
export const Sidebar = ({ user, setUser }) => {

    const [users, setUsers] = useState([]);
    const [filteredUser, setFilteredUser] = useState(null);
    const nav = useNavigate(); // Prepara la función para redirigir

    // Función para cerrar sesión
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user'); // Asegúrate de limpiar también el usuario
        setUser(null); // Limpia el estado del usuario
        console.log('Logout exitosamente'); // Mensaje en la consola
        nav('/Login'); // Redirige a la página de inicio de sesión
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {

                const response = await ApiService.get("/api/v1/companie/users");
                setUsers(response);

                const userToView = JSON.parse(localStorage.getItem("user"));
                const username = userToView ? userToView.username : null;

                if (username) {
                    const matchedUser = response.find(user => user.username === username);
                    setFilteredUser(matchedUser);
                }

            } catch (error) {
                console.error('Error al obtener los usuarios:', error);
            }
        }

        fetchUsers();
    }, []);

    return (
        <>
            <aside className="sidebar">
                <div className="titulo-section">
                    <h1>Transporte Fluvial</h1>
                </div>
                <div className="icono">
                    <div className="row section-account">
                        <div className="col-md-12 section-account-part1 text-center">
                            <i className="fa-solid fa-user-gear icono-user mt-2"></i>
                        </div>
                        <div className="col-md-12 text-center">
                            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                                <li className="nav-item dropdown section-account-part2">
                                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <b> {filteredUser ? filteredUser.name : user.username}</b>
                                    </a>
                                    <ul className="dropdown-menu menu-account">
                                        <li><a className="dropdown-item text-black option-menu" href="#">Mi Cuenta</a></li>
                                        <li><a className="dropdown-item text-black option-menu" href="#">Administracion</a></li>
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

                    {user?.rol?.includes('SUPERADMIN') && (
                        <CompanySection />
                    )}

                    <EmployeeSection />

                    {!user?.rol?.includes('SUPERADMIN') && (
                        <>
                            <SailorSection />
                            <VehicleSection />
                            <CustomerSection />
                        </>
                    )}
                    {/* <Agregar /> */}
                    <Actualizar user={user} />
                    <Informes />
                    <Inventarios />
                    <Configuraciones />

                </nav>
                <div className='logo-sena'>
                    <img src={Logo} alt="Logo SENA" />
                </div>
            </aside>
        </>
    );
}

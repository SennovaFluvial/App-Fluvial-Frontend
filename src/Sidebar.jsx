import React, { useEffect, useState } from 'react';
import './assets/css/sidebar.css';
import Logo from './assets/img/LogoSena.png';
import { Link, useNavigate } from "react-router-dom";
import { ApiService } from './class/ApiServices';

/* Importaciones de componentes para el menú */
import { EmployeeSection } from './components/menu/EmployeeSection';
import { CustomerSection } from './components/menu/CustomerSection';
import { CompanySection } from './components/menu/CompanySection';
import { SailorSection } from './components/menu/SailorSection';
import { VehicleSection } from './components/menu/VehicleSection';
import { ShipmentSection } from './components/menu/ShipmentSection';
import { Inventories } from './components/menu/InventoriesSection';
import { BranchSection } from './components/menu/BranchSection';

export const Sidebar = ({ user, setUser }) => {
    const [isCollapsed, setIsCollapsed] = useState(false); // Estado para controlar colapso del sidebar
    const [users, setUsers] = useState([]);
    const [filteredUser, setFilteredUser] = useState(null);
    const nav = useNavigate();

    // Función para cerrar sesión
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        nav('/Login');
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
        };

        fetchUsers();

        // Evento para detectar el tamaño de la ventana
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setIsCollapsed(true); // Colapsar el menú en pantallas pequeñas
            } else {
                setIsCollapsed(false);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Ejecutar cuando se carga la página

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
                <div className="titulo-section">
                    <h1>{!isCollapsed ? 'Transporte Fluvial' : 'TF'}</h1>
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
                                        <b>{filteredUser ? filteredUser.name : user.username}</b>
                                    </a>
                                    <ul className="dropdown-menu menu-account">
                                        <li><a className="dropdown-item text-black option-menu" href="#">Mi Cuenta</a></li>
                                        <li><a className="dropdown-item text-black option-menu" href="#">Administración</a></li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li>
                                            <button onClick={logout} className='btn btn-danger boton-logout ms-2'>
                                                Cerrar sesión <i className="fa-solid fa-door-open"></i>
                                            </button>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <nav className="menu">
                    <ul>
                        <li>
                            <Link to="/adminSection" className="nav-link show">
                                <span>{isCollapsed ? <i className="fa-solid fa-home"></i> : 'Dashboard'}</span>
                            </Link>
                        </li>
                    </ul>

                    {user?.rol?.includes('SUPERADMIN') && <CompanySection isCollapsed={isCollapsed} />}

                    <EmployeeSection isCollapsed={isCollapsed} />

                    {!user?.rol?.includes('SUPERADMIN') && (
                        <>
                            <SailorSection isCollapsed={isCollapsed} />
                            <VehicleSection isCollapsed={isCollapsed} />
                            <CustomerSection isCollapsed={isCollapsed} />
                        </>
                    )}

                    <ShipmentSection isCollapsed={isCollapsed} />

                    <Inventories isCollapsed={isCollapsed} />

                    <BranchSection isCollapsed={isCollapsed} />

                    <ul>
                        <li>
                            <Link to="/adminSection/reports" className="nav-link show">
                                <span>{isCollapsed ? <i className="fa-solid fa-chart-line"></i> : 'Informes'}</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className='logo-sena'>
                    <img src={Logo} alt="Logo SENA" />
                </div>
            </aside>
        </>
    );
}

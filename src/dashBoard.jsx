import { Outlet } from 'react-router-dom' // Importa herramientas para navegación
import React from 'react' // Importa React y useEffect
import { Info } from "../src/Info"
import { useLocation } from 'react-router-dom'
import './assets/css/DashBoard.css'
import { useEffect, useState } from 'react'
import './assets/css/sidebar.css'
import Logo from './assets/img/LogoSena.png'
import { Link, useNavigate } from "react-router-dom"
import { ApiService } from './class/ApiServices'
import styles from './assets/css/section.module.css'

/* Importaciones de componentes para el menú */
import { EmployeeSection } from './components/menu/EmployeeSection'
import { CustomerSection } from './components/menu/CustomerSection'
import { CompanySection } from './components/menu/CompanySection'
import { SailorSection } from './components/menu/SailorSection'
import { VehicleSection } from './components/menu/VehicleSection'
import { ShipmentSection } from './components/menu/ShipmentSection'
import { Inventories } from './components/menu/InventoriesSection'
import { BranchSection } from './components/menu/BranchSection'

/**
 * Componente DashBoard
 * 
 * Este componente muestra la barra lateral y el contenido principal si el usuario está autenticado.
 * Si el usuario no está autenticado o si no existe, no se muestra nada.
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.user - Información del usuario actual. Debe ser un objeto que contiene los datos del usuario autenticado.
 * @param {Function} props.setUser - Función para actualizar el estado del usuario. Se usa para cambiar los datos del usuario en el estado de la aplicación.
 * @returns {React.ReactNode} - Muestra el contenido del tablero si el usuario está autenticado. Si no hay usuario autenticado, no muestra nada.
 */
export const DashBoard = ({ user, setUser }) => {
    const location = useLocation()

    const [filteredUser, setFilteredUser] = useState(null)
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [loading, setLoading] = useState(false)
    const nav = useNavigate()

    // Función para cerrar sesión
    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.removeItem('tokenTimestamp')
        setUser(null)
        nav('/Login')
    }

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);

                const response = await ApiService.get("/api/v1/companie/users");

                const userToView = JSON.parse(localStorage.getItem("user"));
                const username = userToView ? userToView.username : null;

                if (username) {
                    const matchedUser = response.find(user => user.username === username);
                    setFilteredUser(matchedUser);
                }
            } catch (error) {
                console.error('Error al obtener los usuarios:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed)
    }

    return (
        <>
            {user ? (
                <div className="container-fluid d-flex">
                    <div className="eeee">
                        <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
                            <button className="toggle-btn" onClick={toggleSidebar}>
                                {isCollapsed ? '☰' : '✖'}
                            </button>
                            <div className="titulo-section">
                                <h1>{isCollapsed ? 'TF' : 'Transporte Fluvial'}</h1>
                            </div>
                            <div className="icono">
                                <div className="col-md-12 section-account-part1 text-center">
                                    <i className="fa-solid fa-user-gear icono-user mt-2"></i>
                                </div>
                                <div className="col-md-12 text-center">
                                    <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                                        <li className="nav-item dropdown section-account-part2">
                                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                <b>
                                                    {
                                                        loading ? "Cargando..." : (
                                                            <>
                                                                {filteredUser ? filteredUser.name : user.username}
                                                            </>
                                                        )
                                                    }
                                                </b>
                                            </a>
                                            <ul className="dropdown-menu menu-account">
                                                <li><a className="dropdown-item text-black option-menu" href="#">Mi Cuenta</a></li>
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
                            <nav className="menu">
                                <ul>
                                    <li>
                                        <button className={`${styles.navLink}`} onClick={() => nav("/adminSection")}>
                                            <i className={`fa-solid fa-home ${isCollapsed ? styles.iconCentered : ''}`} style={{ marginRight: isCollapsed ? '0' : '8px' }}></i>
                                            {!isCollapsed && <span className="menu-text"> Dashboard</span>}
                                        </button>
                                    </li>
                                </ul>

                                <ul>
                                    <li>
                                        <button className={`${styles.navLink}`} onClick={() => nav("/adminSection/smartChat", { state: { from: "menu" } })}>
                                            <i className={`fa-regular fa-comments ${isCollapsed ? styles.iconCentered : ''}`} style={{ marginRight: isCollapsed ? '0' : '8px' }}></i>
                                            {!isCollapsed && <span className="menu-text"> Asistente Inteligente</span>}
                                        </button>
                                    </li>
                                </ul>

                                {/* SUPERADMIN SECCIONES */}
                                {user.rol === "SUPERADMIN" && (
                                    <>
                                        <CompanySection isCollapsed={isCollapsed} />
                                        <EmployeeSection isCollapsed={isCollapsed} />
                                    </>
                                )}

                                {/* ADMIN SECCIONES */}
                                {user.rol === "ADMIN" && (
                                    <>
                                        <EmployeeSection isCollapsed={isCollapsed} />
                                        <SailorSection isCollapsed={isCollapsed} />
                                        <VehicleSection isCollapsed={isCollapsed} />
                                        <CustomerSection isCollapsed={isCollapsed} />
                                        <ShipmentSection isCollapsed={isCollapsed} />
                                        <Inventories isCollapsed={isCollapsed} />
                                        <BranchSection isCollapsed={isCollapsed} />
                                    </>
                                )}

                                {/* EMPLOYEE SECCIONES */}
                                {user.rol === "EMPLOYEE" && (
                                    <>
                                        <SailorSection isCollapsed={isCollapsed} />
                                        <VehicleSection isCollapsed={isCollapsed} />
                                        <CustomerSection isCollapsed={isCollapsed} />
                                        <ShipmentSection isCollapsed={isCollapsed} />
                                        <Inventories isCollapsed={isCollapsed} />
                                    </>
                                )}

                                <ul>
                                    <li>
                                        <button className={`${styles.navLink}`} onClick={() => nav("/adminSection/reports")}>
                                            <i className={`fa-solid fa-file-alt ${isCollapsed ? styles.iconCentered : ''}`} style={{ marginRight: isCollapsed ? '0' : '8px' }}></i>
                                            {!isCollapsed && <span className="menu-text"> Informes</span>}
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                            {!isCollapsed &&
                                <div className='logo-sena'>
                                    <img src={Logo} alt="Logo SENA" />
                                </div>
                            }
                        </aside>
                    </div>
                    <div className="content flex-grow-1">
                        {location.pathname === "/adminSection" ? (
                            <Info />
                        ) : (
                            <Outlet />
                        )}
                    </div>
                </div>
            ) : null}

        </>
    )
}


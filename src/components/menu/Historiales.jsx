import React from 'react'
import { Link } from 'react-router-dom'; // Importa el componente para enlaces de navegación


export const Historiales = ({ user }) => {
    return (
        <>
            <ul className='navbar-nav me-auto mb-2 mb-lg-0 my-5'>
                <li className="nav-item dropdown section-account-part2">
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Historiales
                    </a>
                    <ul className="dropdown-menu menu-account">
                        {user?.rol?.includes('SUPERADMIN') && (
                            <li className='dropdown-item text-black'>
                                <Link to={'show-companies'}>
                                    <i className="fa-solid fa-building me-2"></i>
                                    Historial de empresas
                                </Link>
                            </li>
                        )}

                        {!user?.rol?.includes('SUPERADMIN') && (
                            <>
                                <li className='dropdown-item text-black'>
                                    <Link to={'show-customers'}>
                                        <i className="fa-solid fa-users me-2"></i>
                                        Historial de Clientes
                                    </Link>
                                </li>
                                <li className='dropdown-item text-black'>
                                    <Link to={'show-crew'}>
                                        <i className="fa-solid fa-users me-2"></i>
                                        Historial de tripulación
                                    </Link>
                                </li>
                            </>

                        )}

                        <li className='dropdown-item text-black' >
                            <Link to={'show-users'}>
                                <i className="fa-solid fa-address-book me-2"></i>
                                Historial de Empleados
                            </Link>
                        </li>
                    </ul>
                </li>
            </ul>
        </>
    )
}


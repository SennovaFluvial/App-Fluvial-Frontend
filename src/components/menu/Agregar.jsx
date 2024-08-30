import { Link } from 'react-router-dom'; // Importa el componente para enlaces de navegación

import React from 'react'

export const Agregar = () => {

    const user = JSON.parse(localStorage.getItem("user"))
    const role = user?.rol;

    return (
        <>
            <ul className='navbar-nav me-auto mb-2 mb-lg-0 my-5'>
                <li className="nav-item dropdown section-account-part2">
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Agregar
                    </a>
                    <ul className="dropdown-menu menu-account">
                        {/* Mostrar "Agregar Empresa" solo si el rol es SUPERADMIN */}
                        {role === "SUPERADMIN" && (
                            <li className='dropdown-item text-black'><Link to={'add-company'}>Agregar Empresa</Link></li>
                        )}

                        {/* Mostrar "Agregar Empleado" si el rol es ADMIN o SUPERADMIN */}
                        {(role === "ADMIN" || role === "SUPERADMIN") && (
                            <li className='dropdown-item text-black'><Link to={'add-employed'}>Agregar Empleado</Link></li>
                        )}

                        {/* Mostrar los demás ítems solo si el rol no es SUPERADMIN */}
                        {role !== "SUPERADMIN" && (
                            <>
                                {/*<li className='dropdown-item text-black'><Link to={'add-captain'}>Agregar Capitán</Link></li>
                                <li className='dropdown-item text-black'><Link to={'add-sailor'}>Agregar Marinero</Link></li>
                                <li className='dropdown-item text-black'><Link to={'add-boat-driver'}>Agregar Motorista</Link></li>*/}
                                <li className='dropdown-item text-black'><Link to={'add-crew'}>Agregar Tripulante</Link></li>
                                <li className='dropdown-item text-black'><Link to={'add-vehicle'}>Agregar Vehículo</Link></li>
                                <li className='dropdown-item text-black'><Link to={'add-customer'}>Agregar Cliente</Link></li>
                            </>
                        )}
                    </ul>
                </li>
            </ul>
        </>
    )
}

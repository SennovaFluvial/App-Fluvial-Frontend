import { Link } from 'react-router-dom'; // Importa el componente para enlaces de navegación

import React from 'react'

export const Agregar = () => {
    return (
        <>
            <ul className='navbar-nav me-auto mb-2 mb-lg-0 my-5'>
                <li className="nav-item dropdown section-account-part2">
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Agregar
                    </a>
                    <ul className="dropdown-menu menu-account">
                        <li className='dropdown-item text-black' ><Link to={'add-company'}>Agregar Empresa</Link></li>
                        <li className='dropdown-item text-blcak'> <Link to={'add-employed'}>Agregar Empleado</Link> </li>
                        <li className='dropdown-item text-black' ><Link to={'add-captain'}>Agregar Capitan</Link></li>
                        <li className='dropdown-item text-black' ><Link to={'add-sailor'}>Agregar Marinero</Link></li>
                        <li className='dropdown-item text-black' ><Link to={'add-boat-driver'}>Agregar Motorista</Link></li>
                        <li className='dropdown-item text-black' ><Link to={'add-vehicle'}>Agregar Vehículo</Link></li>
                        {/* Agregar cliente */}
                    </ul>
                </li>
            </ul>
        </>
    )
}

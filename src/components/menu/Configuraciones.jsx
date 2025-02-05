import React from 'react'
import { Link } from 'react-router-dom'; // Importa el componente para enlaces de navegación

export const Configuraciones = () => {
    return (
        <>
            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                <li className="nav-item dropdown section-account-part2">
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Configuraciones
                    </a>
                    <ul className="dropdown-menu menu-account">
                        <li className='dropdown-item text-black' ><Link to={'add-vehicle'}>Agregar Embarcación</Link></li>
                        <li className='dropdown-item text-black' ><Link to={'add-salior'}>Agregar Marinero</Link></li>
                    </ul>
                </li>
            </ul>
        </>
    )
}

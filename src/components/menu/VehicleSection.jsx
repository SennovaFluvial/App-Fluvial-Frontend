import React from 'react'
import { Link } from 'react-router-dom'

export const VehicleSection = () => {
    return (
        <>
            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                <li className="nav-item dropdown section-account-part2">
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Vehículos
                    </a>
                    <ul className="dropdown-menu menu-account">
                        <>
                            <li className='dropdown-item text-black'>
                                <Link to={'show-vehicles'}>
                                    <i className="fa-solid fa-sailboat me-2"></i>Listado de Vehículos
                                </Link>
                            </li>

                            <li className='dropdown-item text-black'>
                                <Link to={'add-vehicle'} state={{ from: 'menu' }}>
                                    Creación de Vehículos
                                </Link>
                            </li>
                        </>
                    </ul>
                </li>
            </ul>
        </>
    )
}

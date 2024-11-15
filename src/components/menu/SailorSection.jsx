import React from 'react'
import { Link } from 'react-router-dom'

export const SailorSection = ({ isCollapsed }) => {
    return (
        <>
            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                <li className="nav-item dropdown section-account-part2">
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i  className="fas fa-life-ring"></i>
                        {!isCollapsed && <span className="menu-text"> Tripulantes</span>}
                    </a>
                    <ul className="dropdown-menu menu-account">
                        <li className='dropdown-item text-black'>
                            <Link to={'show-crew'}>
                                <i className="fa-solid fa-person-military-pointing me-2"></i>Listado de Tripulantes
                            </Link>
                        </li>

                        <li className='dropdown-item text-black'>
                            <Link to={'add-crew'} state={{ from: 'menu' }}>
                                <i className="fa-solid fa-circle-plus"></i> Creación de Tripulantes
                            </Link>
                        </li>
                    </ul>
                </li>
            </ul>
        </>
    )
}

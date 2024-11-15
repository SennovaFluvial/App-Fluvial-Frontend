import React from 'react'
import { Link } from 'react-router-dom'

export const ShipmentSection = ({ isCollapsed }) => {
    return (
        <>
            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                <li className='nav-item dropdown section-account-part2'>
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i  className="fas fa-dolly"></i>
                        {!isCollapsed && <span className="menu-text"> Envíos</span>}
                    </a>
                    <ul className="dropdown-menu menu-account">
                        <>
                            <li className='dropdown-item text-black'>
                                <Link to={'show-shipment'}>
                                    <i className="fa-solid fa-box"></i> Listado de Envíos
                                </Link>
                            </li>

                            <li className='dropdown-item text-black'>
                                <Link to={'register-shipment'} state={{ from: 'menu' }}>
                                    <i className="fa-solid fa-circle-plus"></i> Creación de Enviós
                                </Link>
                            </li>
                        </>
                    </ul>
                </li>
            </ul>
        </>
    )
}

import React from 'react'
import { Link } from 'react-router-dom'

export const ShipmentSection = () => {
    return (
        <>
            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                <li className='nav-item dropdown section-account-part2'>
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Envíos
                    </a>
                    <ul className="dropdown-menu menu-account">
                        <>
                            <li className='dropdown-item text-black'>
                                <Link to={'#'}>
                                    <i class="fa-solid fa-box"></i> Listado de Envíos
                                </Link>
                            </li>

                            <li className='dropdown-item text-black'>
                                <Link to={'module-Sender'}>
                                    Creación de Enviós
                                </Link>
                            </li>
                        </>
                    </ul>

                </li>

            </ul>
        </>
    )
}

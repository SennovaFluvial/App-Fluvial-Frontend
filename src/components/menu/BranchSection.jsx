import React from 'react'
import { Link } from 'react-router-dom'

export const BranchSection = () => {
    return (
        <>
            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                <li className="nav-item dropdown section-account-part2">
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Sucursales
                    </a>
                    <ul className="dropdown-menu menu-account">
                        <>
                            <li className='dropdown-item text-black'>
                                <Link to={'show-branch'}>
                                    <i className="fa-solid fa-box"></i> Listado de Sucursales
                                </Link>
                            </li>

                            <li className='dropdown-item text-black'>
                                <Link to={'add-branch'} state={{ from: 'menu' }}>Creación de Sucursales
                                </Link>
                            </li>

                        </>
                    </ul>
                </li>
            </ul>
        </>
    )
}

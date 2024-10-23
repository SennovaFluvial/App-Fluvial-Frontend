import React from 'react'
import { Link } from 'react-router-dom'

export const CompanySection = () => {
    return (
        <>
            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                <li className='nav-item dropdown section-account-part2'>
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Empresas
                    </a>
                    <ul className="dropdown-menu menu-account">
                        <>
                            <li className='dropdown-item text-black'>
                                <Link to={'show-companies'}>
                                    <i className="fa-solid fa-building me-2"></i> Listado de Empresas
                                </Link>
                            </li>
                            
                            <li className='dropdown-item text-black'>
                                <Link to={'add-company'} state={{ from: 'menu' }}>
                                    Creación de Empresas
                                </Link>
                            </li>
                        </>
                    </ul>

                </li>

            </ul>
        </>
    )
}

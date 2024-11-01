import React from 'react'
import { Link } from 'react-router-dom'

export const EmployeeSection = () => {
    return (
        <>
            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                <li className="nav-item dropdown section-account-part2">
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Empleados
                    </a>
                    <ul className="dropdown-menu menu-account">
                        <>
                            <li className='dropdown-item text-black'>
                                <Link to={'show-users'}>
                                    <i className="fa-solid fa-address-book me-2"></i>Listado de Empleados
                                </Link>
                            </li>

                            <li className='dropdown-item text-black'>
                                <Link to={'add-employed'} state={{ from: 'menu' }}>
                                    <i className="fa-solid fa-circle-plus"></i> Creación de Empleados
                                </Link>
                            </li>
                        </>
                    </ul>
                </li>
            </ul>
        </>
    )
}

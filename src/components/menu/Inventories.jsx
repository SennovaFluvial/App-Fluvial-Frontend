import React from 'react'
import { Link } from 'react-router-dom'

export const Inventories = () => {
    return (
        <>
            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                <li className="nav-item dropdown section-account-part2">
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Inventario
                    </a>
                    <ul className="dropdown-menu menu-account">
                        <>
                            <li className='dropdown-item text-black'>
                                <Link to={'../show-products'}>
                                    <i className="fa-solid fa-box"></i> Listado de Productos
                                </Link>
                            </li>

                            <li className='dropdown-item text-black'>
                                <Link to={'../add-product'}>Creación de Productos
                                </Link>
                            </li>

                            <li className='dropdown-item text-black'>
                                <Link to={'../show-warehouse'}>
                                    <i className="fa-solid fa-warehouse"></i> Listado de Bodegas
                                </Link>
                            </li>

                            <li className='dropdown-item text-black'>
                                <Link to={'../add-warehouse'}>Creación de Bodegas
                                </Link>
                            </li>
                        </>
                    </ul>
                </li>
            </ul>
        </>
    )
}

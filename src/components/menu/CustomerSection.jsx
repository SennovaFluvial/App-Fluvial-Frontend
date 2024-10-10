import React from 'react'
import { Link } from 'react-router-dom'

export const CustomerSection = () => {
  return (
    <>
      <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
        <li className="nav-item dropdown section-account-part2">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Clientes
          </a>
          <ul className="dropdown-menu menu-account">
            <>
              <li className='dropdown-item text-black'>
                <Link to={'show-customers'}>
                  <i className="fa-solid fa-users me-2"></i>Listado de Clientes
                </Link>
              </li>

              <li className='dropdown-item text-black'>
                <Link to={'add-customer'}>Creación de Clientes</Link>
              </li>
            </>
          </ul>
        </li>
      </ul>
    </>
  )
}

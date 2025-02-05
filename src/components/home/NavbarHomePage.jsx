import React from 'react'

import '../../assets/css/StylesHomePage.css'
import logoSena from '../../assets/img/LogoSena.png'

import { Link } from 'react-router-dom'

const Items = ({ texto, tipo }) => {
    return (
        <button className={tipo == 1 ? 'Btn_inicioSession' : 'btn btn-primary'}>{texto}</button>
    )
}

export const NavbarHomePage = () => {
    return (
        <>

            <header>
                <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
                    <div className="container-fluid barraNavegacion">
                        <a className="navbar-brand" href="#">
                            <img src={logoSena} alt="Logo App" width="60" className="d-inline-block align-text-top" />
                            <label className='nombreApp'>TransFluvial De Carga del Guaviare</label>
                        </a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="nav ms-auto">
                                <li className="nav-item">
                                    <a className="nav-link active enlace" href="#">inicio</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link enlace" href="#">Blog</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link enlace">¿Quiénes somos?</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link enlace">Horarios</a>
                                </li>
                            </ul>
                        </div>


                        <Link to={'/login'}>
                            <Items texto='Iniciar Sesión' tipo={1} id='colorButton' />
                        </Link>

                    </div>
                </nav>
            </header>

        </>
    )
}

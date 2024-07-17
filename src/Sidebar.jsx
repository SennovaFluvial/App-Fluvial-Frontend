import React from 'react'
import { Link } from 'react-router-dom'
import './assets/css/sidebar.css'
import Logo from './assets/img/LogoSena.png'
import Icono from './assets/img/icono.png'
export const Sidebar = () => {
    return (
        <>
            <aside className="sidebar">
                <div className="titulo-section">
                    <h1>Transporte Fluvial</h1>
                </div>
                <div className="icono">
                    <img src={Icono} alt="Icono Sidebar" />
                </div>
                <nav className="menu">
                    <ul>
                        <li><Link to={'/AgregarVehiculo'}>Agregar</Link></li>
                        <li><Link to="/actualizar">Actualizar</Link></li>
                        <li><Link to="/historiales">Historiales</Link></li>
                        <li><Link to="/informe">Informe</Link></li>
                        <li><Link to="/configuracion">Configuración</Link></li>
                    </ul>
                </nav>
                <div className='logo-sena'>
                    <img src={Logo} alt="Logo SENA" />
                </div>
            </aside>
        </>
    )
}

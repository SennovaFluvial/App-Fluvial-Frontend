import { Outlet } from 'react-router-dom'; // Importa herramientas para navegación
import React, { useEffect } from 'react' // Importa React y useEffect
import { Sidebar } from './Sidebar'; // Importa el componente Sidebar
import { useNavigate } from "react-router-dom" // Importa el hook para redirecciones

/**
 * Componente DashBoard
 * 
 * Este componente muestra la barra lateral y el contenido principal si el usuario está autenticado.
 * Redirige a la página de inicio de sesión si el usuario no está autenticado o si no existe.
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.user - Información del usuario.
 * @param {Function} props.setUser - Función para actualizar el estado del usuario.
 * @returns {React.ReactNode} - Muestra el contenido del tablero si el usuario está autenticado.
 */
export const DashBoard = ({ user, setUser }) => {
    const nav = useNavigate(); // Prepara la función para redirigir

    // Efecto para verificar el estado del usuario cuando el componente se muestra
    useEffect(() => {

        // Si el usuario no está activo, redirige a la página de inicio de sesión
        if (!user || user.status !== 'activo') { // Si no existe un usuario lo redireccion a '/Login'
            nav('/Login');
        }
    }, [user, nav]); /// Ejecuta el efecto cuando cambian 'user' o 'nav'


    return (
        <>
            {user ? ( // Si hay un usuario autenticado, muestra el contenido del tablero
                <>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-3">
                                <Sidebar user={user} setUser={setUser} /> {/* Muestra la barra lateral */}
                            </div>
                            <div className="col-md-9">
                                <div className="row">
                                    <div className="col-md-12">
                                        <Outlet /> {/* Muestra el contenido de las rutas hijas */}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </>
            ) :
                null // Si no hay un usuario autenticado, no muestra nada 
            }

        </>
    )
}


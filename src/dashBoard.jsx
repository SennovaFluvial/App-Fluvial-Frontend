import { Outlet } from 'react-router-dom'; // Importa herramientas para navegación
import React from 'react' // Importa React y useEffect
import { Sidebar } from './Sidebar'; // Importa el componente Sidebar


/**
 * Componente DashBoard
 * 
 * Este componente muestra la barra lateral y el contenido principal si el usuario está autenticado.
 * Si el usuario no está autenticado o si no existe, no se muestra nada.
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.user - Información del usuario actual. Debe ser un objeto que contiene los datos del usuario autenticado.
 * @param {Function} props.setUser - Función para actualizar el estado del usuario. Se usa para cambiar los datos del usuario en el estado de la aplicación.
 * @returns {React.ReactNode} - Muestra el contenido del tablero si el usuario está autenticado. Si no hay usuario autenticado, no muestra nada.
 */
export const DashBoard = ({ user, setUser }) => {

    return (
        <>
            {user ? ( // Si hay un usuario autenticado, muestra el contenido del tablero
                <>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-2">
                                <Sidebar user={user} setUser={setUser} /> {/* Muestra la barra lateral */}
                            </div>
                            <div className="col-md-10">
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


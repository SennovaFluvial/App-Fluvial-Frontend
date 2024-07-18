import { Outlet, Link } from 'react-router';
import React, { useEffect } from 'react' // Importacion del UseEffect

import { useNavigate } from "react-router" // Hook para redirecciones de react-router

export const DashBoard = ({ user, setUser }) => {   // ***** ESTE ES UN COMPONENTE DE PRUEBA *****

    const nav = useNavigate(); // Se utiliza el hook de useNavigation para realizar las redirecciones.

    // Se utilza useEffect para cuando el componente se muestra por primera ves en la pantalla.
    useEffect(() => {
        // Verifica si existe un usuario;
        if (!user || user.state !== 'activo') { // Si no existe un usuario lo redireccion a '/Login'
            nav('/Login');
        }
    }, [user, nav]); // Se incluyen estas dependencias cuando el useEffect se ejecute siempre que cambie el estado del usuario o la navegacion.

    const logout = () => { // Funcion para desloguear al usuario.

        setUser(null); // Se setea el estado del usuario

        console.log('Logout exitosamente') // Mensaje de consola.

        nav('/Login'); // Se redirigie a la seccion de login
    };

    return (
        <>
            {user ? ( // Verifica si existe un usuario. SI existe le da acceso al componente.
                <>
                    <div className="container bg-dark text-white">
                        <div className="row">
                            <div className="col-md-12">
                                <h1>
                                    Usuario: {user.username /* Este es el userName del usuario autenticado */}
                                </h1>

                                <ul className="list-group my-4">
                                    <li className="list-group-item list-group-item-action bg-dark text-white">
                                        <Link to ="/">Agregar</Link>
                                    </li>
                                    <li className="list-group-item list-group-item-action bg-dark text-white">
                                        <Link to ="/">Actualizar</Link>
                                    </li>
                                    <li className="list-group-item list-group-item-action bg-dark text-white">
                                        <Link to ="/">Eliminar</Link>
                                    </li>
                                    <li className="list-group-item list-group-item-action bg-dark text-white">
                                        <Link to ="/">Ajustes</Link>
                                    </li>
                                    <li className="list-group-item list-group-item-action bg-dark text-white">
                                        <Link to ="/">Informes</Link>
                                    </li>
                                </ul>

                                <button className="btn btn-danger my-5 ms-5" onClick={logout}>
                                    Cerrar Sesión
                                </button>
                            </div>
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md-12">

                                        <Outlet />

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </>
            ) :
                null // Si no existe un usuario atenticado No muestra nada, no tendra ninguna render.
            }

        </>
    )
}


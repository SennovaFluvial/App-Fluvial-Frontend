import { Outlet, Link } from 'react-router-dom'; // Importaciones de los hooks de la libreria 'react-router-dom'
import React, { useEffect } from 'react' // Importacion del UseEffect
import { Sidebar } from './Sidebar';
import { useNavigate } from "react-router-dom" // Hook para redirecciones de react-router-dom
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

    /*
    import React, { useEffect } from 'react';
    import { useNavigate, Outlet } from 'react-router-dom';
    import { Sidebar } from './Sidebar';
    
    export const DashBoard = ({ user, setUser }) => {
        const nav = useNavigate();
    
        useEffect(() => {
            if (!user || user.state !== 'activo') {
                // nav('/login');
            }
        }, [user, nav]);
    
        const logout = () => {
            setUser(null);
            nav('/login');
        };
    */
    return (
        <>
            {user ? ( // Verifica si existe un usuario. SI existe le da acceso al componente.
                <>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-3">
                                {/*
                                <ul className="list-group my-3">
                                    <li className="list-group-item list-group-item-action bg-dark text-white">
                                        <Link to={"addVehicle"}>Agregar vehiculo</Link>
                                    </li>
                                    <li className="list-group-item list-group-item-action bg-dark text-white">
                                        s
                                    </li>
                                    <li className="list-group-item list-group-item-action bg-dark text-white">
                                        s
                                    </li>
                                    <li className="list-group-item list-group-item-action bg-dark text-white">
                                        s
                                    </li>
                                    <li className="list-group-item list-group-item-action bg-dark text-white">
                                        s
                                    </li>
                                </ul>
                                <button className="btn btn-danger my-5 ms-5" onClick={logout}>
                                    Cerrar Sesión
                                </button>
                                */}

                                <Sidebar />

                            </div>
                            <div className="col-md-9">
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


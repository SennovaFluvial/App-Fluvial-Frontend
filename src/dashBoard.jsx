// import React, { useEffect } from 'react' // Importacion del UseEffect

// import { useNavigate } from "react-router" // Hook para redirecciones de react-router

// export const DashBoard = ({ user, setUser }) => {   // ***** ESTE ES UN COMPONENTE DE PRUEBA *****

//     const nav = useNavigate(); // Se utiliza el hook de useNavigation para realizar las redirecciones.

//     // Se utilza useEffect para cuando el componente se muestra por primera ves en la pantalla.
//     useEffect(() => {
//         // Verifica si existe un usuario;
//         if (!user || user.state !== 'activo') { // Si no existe un usuario lo redireccion a '/Login'
//             nav('/Login');
//         }
//     }, [user, nav]); // Se incluyen estas dependencias cuando el useEffect se ejecute siempre que cambie el estado del usuario o la navegacion.

//     const logout = () => { // Funcion para desloguear al usuario.

//         setUser(null); // Se setea el estado del usuario

//         console.log('Logout exitosamente') // Mensaje de consola.

//         nav('/Login'); // Se redirigie a la seccion de login
//     };

//     return (
//         <>
//             {user ? ( // Verifica si existe un usuario. SI existe le da acceso al componente.
//                 <>
//                     <h1>
//                         Usuario: {user.username /* Este es el userName del usuario autenticado */}
//                     </h1>

//                     <button className="btn btn-danger my-5 ms-5" onClick={logout}>
//                         Cerrar Sesión
//                     </button>

//                 </>
//             ) :
//                 null // Si no existe un usuario atenticado No muestra nada, no tendra ninguna render.
//             }

//         </>
//     )
// }


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

    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="content">
                {/* <header className="dashboard-header">
                    <h1>Usuarios</h1>
                    <button className="btn btn-danger" onClick={logout}>Cerrar Sesión</button>
                </header> */}
                <main className="dashboard-main">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};


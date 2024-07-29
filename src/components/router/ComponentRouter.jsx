import React, { useEffect } from 'react';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom'; // Importa los componentes y funciones para manejar las rutas

import { AgregarVehiculo } from '../menu/agregar/AgregarVehiculo.jsx'; // Importa el componente para agregar vehículos
import { AgregarMarinero } from '../menu/agregar/AgregarMarinero.jsx'; // Importa el componente para agregar marineros
import { ValidationPages } from './validation.jsx'; // Importa el componente que valida el estado del usuario
import { VistaHomePageOff } from '../../vistaHome.jsx'; // Importa el componente para la página de inicio
import { Login } from '../../Login.jsx'; // Importa el componente de inicio de sesión
import { DashBoard } from '../../dashBoard.jsx'; // Importa el componente del panel de administración
import { ShowCompany } from '../menu/history/Show-Company.jsx'; // Importa el componente para mostrar información de empresas
import { ShowCustomers } from '../menu/history/Show-customers.jsx'; // Importa el componente para mostrar información de clientes
import { ShowUsers } from '../menu/history/Show-users.jsx'; // Importa el componente para mostrar información de empleados

import { UpdateUsers } from '../menu/update/Update-users.jsx'; // Importa el componente para actualizar usuarios

/**
 * Componente ComponentRouter
 * 
 * Configura las rutas de la aplicación. Muestra diferentes componentes basados en la URL actual.
 * 
 * @returns {React.ReactNode} - Configuración de rutas para la aplicación.
 */
export const ComponentRouter = () => {

    // Estado para almacenar la información del usuario
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Obtiene el token almacenado en el localStorage
        const token = localStorage.getItem('token');

        // Verifica si el token existe
        if (token) {

            // Si el token existe, intenta obtener la información del usuario desde el localStorage
            const storedUser = JSON.parse(localStorage.getItem('user'));

            // Verifica si la información del usuario existe
            if (storedUser) {

                // Si la información del usuario existe, actualiza el estado del usuario con los datos obtenidos
                setUser(storedUser);
            } else {

                // Si no se encuentra la información del usuario, elimina el token y la información del usuario del localStorage
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            }
        }
    }, [])

    return (

        <Routes> {/* Configura las rutas de la aplicación */}
            <Route exact path="/" element={<VistaHomePageOff />} /> {/* Ruta para la página de inicio */}
            <Route exact path="/Login" element={<Login setUser={setUser} />} /> {/* Ruta para la página de inicio de sesión */}

            <Route element={<ValidationPages user={user} setUser={setUser} />}> {/* Ruta protegida que requiere validación */}
                <Route path="/adminSection" element={<DashBoard user={user} setUser={setUser} />}> {/* Ruta para el panel de administración */}
                    <Route path="add-vehicle" element={< AgregarVehiculo />} /> {/* Ruta para agregar vehículos */}
                    <Route path="add-sailor" element={< AgregarMarinero />} /> {/* Ruta para agregar marinero */}
                    <Route path="show-companies" element={< ShowCompany />} /> {/* Ruta para agregar marinero */}
                    <Route path="show-customers" element={< ShowCustomers />} /> {/* Ruta para agregar marinero */}
                    <Route path="show-users" element={< ShowUsers />} /> {/* Ruta para agregar marinero */}
                    <Route path="update-user/:id" element={< UpdateUsers />} /> {/* Ruta para agregar marinero */}
                    {/* Agregar las rutas protegias aqui */}
                </Route>
            </Route>

        </Routes>
    );
};

export default ComponentRouter;

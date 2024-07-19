import React from 'react';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom'; // Importa los componentes y funciones para manejar las rutas
import { AgregarVehiculo } from './AgregarVehiculo.jsx'; // Importa el componente para agregar vehículos
import { AgregarMarinero } from './AgregarMarinero.jsx'; // Importa el componente para agregar marineros
import { ValidationPages } from './components/validation.jsx'; // Importa el componente que valida el estado del usuario
import { VistaHomePageOff } from './vistaHome.jsx'; // Importa el componente para la página de inicio
import { Login } from './Login.jsx'; // Importa el componente de inicio de sesión
import { DashBoard } from './dashBoard.jsx'; // Importa el componente del panel de administración

/**
 * Componente ComponentRouter
 * 
 * Configura las rutas de la aplicación. Muestra diferentes componentes basados en la URL actual.
 * 
 * @returns {React.ReactNode} - Configuración de rutas para la aplicación.
 */
export const ComponentRouter = () => {

    // Estado para almacenar la información del usuario
    const [user, setUser] = useState({ username: '', state: '' });
    return (
        <Routes> {/* Configura las rutas de la aplicación */}
            <Route exact path="/" element={<VistaHomePageOff />} /> {/* Ruta para la página de inicio */}
            <Route exact path="/Login" element={<Login setUser={setUser} />} /> {/* Ruta para la página de inicio de sesión */}

            <Route element={<ValidationPages user={user} />}> {/* Ruta protegida que requiere validación */}
                <Route path="/adminSection" element={<DashBoard user={user} setUser={setUser} />}> {/* Ruta para el panel de administración */}
                    <Route path="add-vehicle" element={< AgregarVehiculo />} /> {/* Ruta para agregar vehículos */}
                    <Route path="add-salior" element={< AgregarMarinero />} /> {/* Ruta para agregar marinero */}
                </Route>
            </Route>

        </Routes>
    );
};

export default ComponentRouter;

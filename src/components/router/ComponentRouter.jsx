import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AgregarVehiculo } from '../menu/agregar/AgregarVehiculo.jsx';
import { AgregarMarinero } from '../menu/agregar/AgregarMarinero.jsx';
import { ValidationPages } from './validation.jsx';
import { VistaHomePageOff } from '../../vistaHome.jsx';
import { Login } from '../../Login.jsx';
import { DashBoard } from '../../dashBoard.jsx';
import { ShowCompany } from '../menu/history/Show-Company.jsx';
import { ShowCustomers } from '../menu/history/Show-customers.jsx';
import { ShowUsers } from '../menu/history/Show-users.jsx';
import { UpdateUsers } from '../menu/update/Update-users.jsx';
import { NotFound } from './notFound.jsx';
import { AgregarEmpleado } from '../menu/agregar/AgregarEmpleado.jsx';

import { AgregarEmpresa } from '../menu/agregar/AgregarEmpresa.jsx';
import { AgregarCapitan } from '../menu/agregar/AgregarCapitan.jsx';
import { AgregarMotorista } from '../menu/agregar/AgregarMotorista.jsx';
import { AgregarCliente } from '../menu/agregar/AgregarCliente.jsx';
/**
 * Componente ComponentRouter
 * 
 * Configura las rutas de la aplicación. Muestra diferentes componentes basados en la URL actual.
 * 
 * @returns {React.ReactNode} - Configuración de rutas para la aplicación.
 */
export const ComponentRouter = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            const storedUser = JSON.parse(localStorage.getItem('user'));
            if (storedUser) {
                setUser(storedUser);
            } else {
                localStorage.removeItem('token');
                localStorage.removeItem('user');F
            }
        }
    }, []);

    return (

        <Routes>
            {/* Rutas Públicas */}
            <Route path="/" element={<VistaHomePageOff />} />
            <Route path="/Login" element={<Login setUser={setUser} />} />

            <Route element={<ValidationPages user={user} setUser={setUser} />}> {/* Ruta protegida que requiere validación */}
                <Route path="/adminSection" element={<DashBoard user={user} setUser={setUser} />}> {/* Ruta para el panel de administración */}
                    <Route path="add-vehicle" element={< AgregarVehiculo />} /> {/* Ruta para agregar vehículos */}
                    <Route path="add-sailor" element={< AgregarMarinero />} /> {/* Ruta para agregar marinero */}
                    <Route path="show-companies" element={< ShowCompany />} /> {/* Ruta para ver compañias */}
                    <Route path="show-customers" element={< ShowCustomers />} /> {/* Ruta para ver clientes */}
                    <Route path="show-users" element={< ShowUsers />} /> {/* Ruta para ver usuarios */}
                    <Route path="update-user/:id" element={< UpdateUsers />} /> {/* Ruta actualizar usuario */}
                    <Route path="add-employed" element={< AgregarEmpleado />} />
                    <Route path="add-company" element={< AgregarEmpresa />} />
                    <Route path="add-captain" element={< AgregarCapitan />} />
                    <Route path="add-boat-driver" element={< AgregarMotorista />} />
                    <Route path="add-customer" element={< AgregarCliente />} />

                    {/* Agregar las rutas protegias aqui */}
                </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default ComponentRouter;
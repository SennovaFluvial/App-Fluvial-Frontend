import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ValidationPages } from './validation.jsx';
import { VistaHomePageOff } from '../../vistaHome.jsx';
import { Login } from '../../Login.jsx';
import { DashBoard } from '../../dashBoard.jsx';
import { NotFound } from './notFound.jsx';

import { AddCompany } from '../menu/agregar/AddCompany.jsx';
import { AddEmployed } from '../menu/agregar/AddEmployed.jsx';
import { AddCaptain } from '../menu/agregar/AddCaptain.jsx';
import { AddSailor } from '../menu/agregar/AddSailor.jsx';
import { AddBoatDriver } from '../menu/agregar/AddBoatDriver.jsx';
import { AddVehicle } from '../menu/agregar/AddVehicle.jsx';
import { AddCustomer } from '../menu/agregar/AddCustomer.jsx';

import { ShowCompany } from '../menu/history/Show-Company.jsx';
import { ShowCustomers } from '../menu/history/Show-customers.jsx';
import { ShowUsers } from '../menu/history/Show-users.jsx';
import { ShowCrew } from '../menu/history/show-sailors.jsx';

import { UpdateUsers } from '../menu/update/Update-users.jsx';
import { UpdateCustomer } from '../menu/update/Update-customer.jsx';
import { AddCrew } from '../menu/agregar/AddCrew.jsx';

import { Info } from '../../Info.jsx';

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
                localStorage.removeItem('user'); F
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

                    <Route path="info" element={< Info />} />{/* Ruta para informacion qeu se mostrara por defecto en el dashboard */}

                    <Route path="add-company" element={< AddCompany />} />{/* Ruta para agregar empresas */}
                    <Route path="add-employed/:id?" element={< AddEmployed />} />{/* Ruta para agregar empleados */}
                    <Route path="add-vehicle" element={< AddVehicle />} /> {/* Ruta para agregar vehículos */}
                    <Route path="add-customer" element={< AddCustomer />} />{/* Ruta para agregar clientes */}
                    <Route path="add-crew" element={< AddCrew />}>{/* Ruta para agregar clientes */}

                        <Route path="add-captain" element={< AddCaptain />} />{/* Ruta para agregar capitanes */}
                        <Route path="add-sailor" element={< AddSailor />} /> {/* Ruta para agregar marinero */}
                        <Route path="add-boat-driver" element={< AddBoatDriver />} /> {/* Ruta para agregar mototristas */}

                    </Route>
                    <Route path="show-companies" element={< ShowCompany />} /> {/* Ruta para ver compañias */}
                    <Route path="show-customers" element={< ShowCustomers />} /> {/* Ruta para ver clientes */}
                    <Route path="show-users" element={< ShowUsers />} /> {/* Ruta para ver usuarios */}
                    <Route path="show-crew" element={< ShowCrew />} /> {/* Ruta para ver usuarios */}

                    <Route path="update-customer/:id" element={< UpdateCustomer />} />{/* Ruta actualizar clientes */}
                    <Route path="update-user/:id" element={< UpdateUsers />} /> {/* Ruta actualizar usuario */}

                    {/* Agregar las rutas protegias aqui */}
                </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default ComponentRouter;
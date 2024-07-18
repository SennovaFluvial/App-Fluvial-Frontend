import React from 'react';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom'; // Importación de componentes y hooks de React Router
import { AgregarVehiculo } from './AgregarVehiculo.jsx'; // Importación de componentes de las rutas
import { AgregarMarinero } from './AgregarMarinero.jsx'; // Importación de componentes de las rutas
import { ValidationPages } from './components/validation.jsx'; // Importación del componente de validación de usuario
import { VistaHomePageOff } from './vistaHome.jsx'; 
import { Login } from './Login.jsx';
import { DashBoard } from './dashBoard.jsx';

export const ComponentRouter = () => {
    const [user, setUser] = useState({ username: '', state: '' });

    return (
        <Routes>
            <Route exact path="/" element={<VistaHomePageOff />} />
            <Route exact path="/Login" element={<Login setUser={setUser} />} />

            <Route element={<ValidationPages user={user} />}>
                <Route path="/adminSection" element={<DashBoard user={user} setUser={setUser} />}>
                    <Route path="addVehicle" element={< AgregarVehiculo />} />
                    <Route path="addMariner" element={< AgregarMarinero />} />

                </Route>
            </Route>

        </Routes>
    );
};

export default ComponentRouter;

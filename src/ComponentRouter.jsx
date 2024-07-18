import React from 'react';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AgregarVehiculo } from './AgregarVehiculo.jsx';
import { AgregarMarinero } from './AgregarMarinero.jsx';
import { ValidationPages } from './components/validation.jsx';
import { VistaHomePageOff } from './vistaHome.jsx';
import { Login } from './Login.jsx';
import { DashBoard } from './dashBoard.jsx';

export const ComponentRouter = () => {
    const [user, setUser] = useState({ username: '', state: '' });

    return (
        <Routes>
            <Route exact path="/" element={<VistaHomePageOff />} />
            <Route exact path="/Login" element={<Login setUser={setUser} />} />
            <Route path="/Dashboard" element={<DashBoard user={user} setUser={setUser} />}>
                <Route path="Agregar-marinero" element={<AgregarMarinero />} />
                <Route path="Agregar-vehiculo" element={<AgregarVehiculo />} />

            </Route>
            <Route path="/adminSection" element={
                <ValidationPages user={user}>
                    <DashBoard user={user} setUser={setUser} />
                </ValidationPages>
            } />
        </Routes>
    );
};

export default ComponentRouter;


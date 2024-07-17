import React from 'react'
import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Sidebar } from './Sidebar.jsx'
import { AgregarVehiculo } from './AgregarVehiculo.jsx'
import { ValidationPages } from './components/validation.jsx';
import { VistaHomePageOff } from './vistaHome.jsx'
import { Login } from './Login.jsx'
import { DashBoard } from './dashBoard.jsx'

export const ComponentRouter = () => {

    const [user, setUser] = useState(
        {
            username: '',
            state: ''
        }
    ) // Almacenar la variable de usuario

    return (
        <Routes>
            <Route exact path="/" element={<VistaHomePageOff />} />
            <Route exact path="/Login" element={<Login setUser={setUser} />} />
            <Route exact path="DashBoard" element={< Sidebar />} />
            <Route exact path="AgregarVehiculo" element={< AgregarVehiculo />} />
            <Route path="/adminSection" element={

                <ValidationPages user={user}>
                    <DashBoard user={user} setUser={setUser} />
                </ValidationPages>

            } />
        </Routes>
    )
}

export default ComponentRouter;


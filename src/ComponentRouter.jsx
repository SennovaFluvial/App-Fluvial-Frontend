import React from 'react'


import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { VistaHomePageOff } from './vistaHome.jsx'
import { Login } from './Login.jsx'


export const ComponentRouter = () => {
    return (
        <Routes>
            <Route exact path="/" element={<VistaHomePageOff />} />
            <Route exact path="/Login" element={<Login />} />
        </Routes>
    )
}

export default ComponentRouter;
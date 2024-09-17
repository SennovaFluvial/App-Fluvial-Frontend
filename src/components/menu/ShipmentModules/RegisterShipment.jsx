import React from 'react'
import { Outlet } from "react-router"
import { useNavigate } from "react-router";

export const RegisterShipment = () => {

    navigate(`/adminSection/add-crew/module-Sender`);

    return (
        <>
            <h1>
                Datos remiente
            </h1>

            <div>
            //register-shipment
            </div>
            <Outlet />
        </>
    )
}

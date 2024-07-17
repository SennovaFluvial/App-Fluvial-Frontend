import React from 'react'
import AgregarVehiculo from "./AgregarVehiculo";
import AgregarMarinero from "./AgregarMarinero";


export const Forms = () => {
    return (
        <div className="form-container">
            {selectedForm === 'vehiculo' && <AgregarVehiculo />}
            {selectedForm === 'marinero' && <AgregarMarinero />}
        </div>
    )
}

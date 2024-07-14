import React from 'react';
// import './AgregarVehiculo.css';

const AgregarVehiculo = () => {
    return (
        <div className="form-container">
            <h2>AGREGAR VEHÍCULO</h2>
            <form>
                <label>Tipo</label>
                <select><option value="">Seleccionar</option></select>
                <label>Modelo</label>
                <input type="text" />
                <label>Matrícula/Patente</label>
                <input type="text" />
                <label>Capacidad de peso</label>
                <input type="text" />
                <label>Capacidad de volumen</label>
                <input type="text" />
                <label>Espacio de pasajeros</label>
                <input type="text" />
                <button type="submit">Guardar</button>
            </form>
        </div>
    );
};

export default AgregarVehiculo;
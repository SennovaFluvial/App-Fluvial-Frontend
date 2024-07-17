import React from 'react';
import './assets/css/AgregarVehiculo.css';

export const AgregarVehiculo = () => {
    return (
        <>
            <div className="form">

                <div className="container mt-4">
                    <h2 className="text-center text-success">AGREGAR VEHICULO</h2>
                    <form>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="tipo">Tipo</label>
                                <select id="tipo" className="form-control">
                                    <option value="" selected>Seleccionar</option>
                                    <option value="opcion1">Opción 1</option>
                                    <option value="opcion2">Opción 2</option>
                                </select>
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="otro">Otro</label>
                                <input type="text" className="form-control" id="otro" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="modelo">Modelo</label>
                            <input type="text" className="form-control" id="modelo" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="matricula">Matrícula/Patente</label>
                            <input type="text" className="form-control" id="matricula" />
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="peso">Capacidad de peso</label>
                                <input type="text" className="form-control" id="peso" />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="volumen">Capacidad de volumen</label>
                                <input type="text" className="form-control" id="volumen" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="pasajeros">Espacio de pasajeros</label>
                            <input type="text" className="form-control" id="pasajeros" />
                        </div>
                        <button type="submit" className="btn btn-success btn-block">Guardar</button>
                    </form>
                </div>
            </div>
        </>
    );
};


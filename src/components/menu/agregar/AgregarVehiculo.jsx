import React from 'react';

import '../../../assets/css/AgregarVehiculo.css'
import { Link } from 'react-router-dom'; // Importa el componente para enlaces de navegación
export const AgregarVehiculo = () => {
    return (
        <>
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="container-av p-4 rounded bg-light shadow">
                    <h2 className="text-center mb-4">AGREGAR VEHICULO</h2>
                    <form>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="tipo">Tipo</label>
                                    <select id="tipo" className="form-control" defaultValue="">
                                        <option value="">Seleccionar</option>
                                        <option value="opcion1">Opción 1</option>
                                        <option value="opcion2">Opción 2</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="otro">Otro</label>
                                    <input type="text" className="form-control" id="otro" />
                                </div>
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
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="peso">Capacidad de peso</label>
                                    <input type="text" className="form-control" id="peso" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="volumen">Capacidad de volumen</label>
                                    <input type="text" className="form-control" id="volumen" />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="pasajeros">Espacio de pasajeros</label>
                            <input type="text" className="form-control" id="pasajeros" />
                        </div>
                        <div className="d-flex justify-content-center">
                            <button type="submit" className="btn btn-success">Guardar</button>
                        </div>
                    </form>
                </div>
            </div>
            {/* <div className="titulo">
        <h1>Hola</h1>
            </div> */}
        </>
    );
};


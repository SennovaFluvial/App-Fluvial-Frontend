import React from 'react';
import './assets/css/AgregarMarinero.css';

export const AgregarMarinero = () => {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="container-am bg-light shadow rounded p-4">
                <h2 className="text-center mb-4">AGREGAR MARINERO</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre</label>
                        <input type="text" className="form-control" id="nombre"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="apellidos">Apellidos</label>
                        <input type="text" className="form-control" id="apellidos" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="documento">Documento</label>
                        <input type="text" className="form-control" id="documento" />
                    </div>
                    <div className="form-group d-flex">
                        <div className="form-group mr-3">
                            <label htmlFor="telefono-codigo">Telefono</label>
                            <input type="text" className="form-control" id="telefono-codigo" placeholder="+ 57" />
                        </div>
                        <div className="form-group flex-grow-1">
                            <label htmlFor="telefono"></label>
                            <input type="text" className="form-control" id="telefono" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="mail">Correo</label>
                        <input type="email" className="form-control" id="correo"/>
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-success">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

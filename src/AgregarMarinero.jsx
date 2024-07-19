import React from 'react';
import './assets/css/AgregarMarinero.css';

export const AgregarMarinero = () => {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="container-am bg-light shadow rounded p-4">
                <h2 className="text-center mb-4">AGREGAR MARINERO</h2>
                <form>


                    <div className="text-center mt-5">
                        <h3>
                            <b> INFORMACIÓN PERSONAL</b>
                        </h3>
                    </div>
                    <div className="row my-4"> {/* Nombres y apellidos */}
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="name_Marinero">Nombre</label>
                                <input type="text" name='name_Marinero' className="form-control" id="name_Marinero" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="lastname_Marinero">Apellidos</label>
                                <input type="text" name='lastname_Marinero' className="form-control" id="lastname_Marinero" />
                            </div>
                        </div>
                    </div>

                    <div className="row my-4">  {/* Identificacion */}
                        <div className="col-md-5">
                            <div className="form-group">
                                <label htmlFor="type_document">Identificación</label>
                                <select id="tipo" name='type_document' className="form-control" defaultValue="">
                                    <option value="">Tipo de documento</option>
                                    <option value="0">C.C</option>
                                    <option value="1">C.E</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className="form-group">
                                <label htmlFor="num_document">Numero de Documento</label>
                                <input type="text" name='num_document' className="form-control" id="num_document" />
                            </div>
                        </div>
                    </div>

                    <div className="text-center mt-5">
                        <h3>
                            <b>CONTACTO</b>
                        </h3>
                    </div>

                    <div className="row my-4">  {/* Contacto | telefono */}
                        <div className="col-md-5">
                            <div className="form-group">
                                <label htmlFor="code_phone">Codigo de área</label>
                                <input type="text" name='code_phone' className="form-control" id="code_phone" />
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className="form-group">
                                <label htmlFor="number_phone">Numero de telefono</label>
                                <input type="text" name='number_phone' className="form-control" id="number_phone" />
                            </div>
                        </div>

                    </div>

                    <div className="row my-4">  {/* Contacto | correo */}
                        <div className="col-md-12">
                            <div className="form-group">
                                <label htmlFor="mail">Correo</label>
                                <input type="email" name='mail' className="form-control" id="correo" />
                            </div>
                        </div>
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-success">Guardar</button>
                    </div>
                </form >
            </div >
        </div >
    );
};

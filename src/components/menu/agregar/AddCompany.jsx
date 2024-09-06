import React, { useState } from 'react';
import { Inputs } from '../../html components/Inputs.jsx';
import { Select } from '../../html components/Selects.jsx';
import { useOptionsDepto, useOptionsCities, status } from '../update/options/arrays.jsx';
import '../../../assets/css/AgregarEmpleado.css';
import { ApiService } from '../../../class/ApiServices.jsx';
import { useNavigate, useParams } from 'react-router';
import { ControllerCreateUpdateCompany } from './controllers/ControllerCreateUpdateCompany.jsx';

export const AddCompany = () => {

    const { id, action } = useParams();
    const { handleSubmit, errorsForms, formData, handleChange } = ControllerCreateUpdateCompany({ id, action });
    const nav = useNavigate();
    const deptos = useOptionsDepto();
    const cities = useOptionsCities();



    return (
        <>
            <div className="d-flex-empleado justify-content-center align-items-center vh-100">
                <div className="container bg-light shadow rounded p-4">
                    <h2 className="text-center mb-2">{action && action === "update" ? "ACTUALIZAR" : "CREAR"} EMPRESA</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="text-center">
                            <h3><b>INFORMACIÓN DE LA EMPRESA</b></h3>
                        </div>
                        <div className="row" > {/* Información de la Empresa */}
                            <div className="col-md-4">
                                <Inputs type="number" text="NIT" name="nit" event={handleChange} value={formData.nit} />
                                {errorsForms.nit && <div className="text-danger">{errorsForms.nit}</div>}
                            </div>
                            <div className="col-md-4">
                                <Inputs text="Nombre de la Empresa" name="company" event={handleChange} value={formData.company} />
                                {errorsForms.company && <div className="text-danger">{errorsForms.company}</div>}
                            </div>
                            <div className="col-md-4">
                                <Inputs text="Nombre del Gerente" name="manager" event={handleChange} value={formData.manager} />
                                {errorsForms.manager && <div className="text-danger">{errorsForms.manager}</div>}
                            </div>
                        </div>

                        <div className="text-center">
                            <h3><b>CONTACTO</b></h3>
                        </div>
                        <div className="row"> {/* Contacto */}
                            <div className="col-md-6">
                                <Inputs text="Correo Electrónico de la empresa" name="email" event={handleChange} icon={"fa-solid fa-at"} value={formData.email} />
                                {errorsForms.email && <div className="text-danger">{errorsForms.email}</div>}
                            </div>
                            <div className="col-md-6">
                                <Inputs text="Número de Teléfono de la empresa" name="phone" event={handleChange} icon="fa-solid fa-phone-volume" value={formData.phone} />
                                {errorsForms.phone && <div className="text-danger">{errorsForms.phone}</div>}
                            </div>
                        </div>

                        <div className="text-center">
                            <h3><b>UBICACIÓN</b></h3>
                        </div>
                        <div className="row"> {/* Ubicación */}
                            <div className="col-md-6">
                                <Select text="Departamento" name="department" event={handleChange} value={formData.department} options={deptos} />
                                {errorsForms.department && <div className="text-danger">{errorsForms.department}</div>}
                            </div>
                            <div className="col-md-6">
                                <Select text="Municipio" name="municipality" event={handleChange} value={formData.municipality} options={cities} />
                                {errorsForms.municipality && <div className="text-danger">{errorsForms.municipality}</div>}
                            </div>
                            <div className="col-md-6">
                                <Inputs text="Dirección" name="address" event={handleChange} icon="fa-solid fa-map-pin" value={formData.address} />
                                {errorsForms.address && <div className="text-danger">{errorsForms.address}</div>}
                            </div>
                        </div>

                        <div className="text-center">
                            <h3><b>INFORMACIÓN LABORAL</b></h3>
                        </div>
                        <div className="row"> {/* Información laboral */}
                            <div className="col-md-6">
                                <Select text="Estado" name="status" value={formData.status} event={handleChange} options={status} />
                                {errorsForms.status && <div className="text-danger">{errorsForms.status}</div>}
                            </div>
                        </div>

                        <div className="text-center mt-3">
                            <button type="submit" className="btn btn-success">{action && action === "update" ? "Actualizar" : "Guardar"} Empresa <i className="fa-solid fa-building"></i></button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

import React, { useState, useEffect } from 'react';
import { Select } from '../../html components/Selects.jsx';
import { Inputs } from '../../html components/Inputs.jsx';
import '../../../assets/css/AgregarEmpleado.css';
import { OptionsTypeDocument, genero, maritalStatus, nationality, useOptionsCities, useOptionsDepto } from '../update/options/arrays.jsx';
import { useParams } from 'react-router';
import { ControllerCreateUpdateCustomer } from './controllers/ControllerCreateUpdateCustomer.jsx';

export const AddCustomer = () => {
    const { id, action } = useParams();
    const cities = useOptionsCities(); // Se debe de hacer esto para mostrar las ciudades.

    const { formData, errorsForms, handleChange, handleSubmit } = ControllerCreateUpdateCustomer({ id, action });

    return (
        <>
            <div className="d-flex-empleado justify-content-center align-items-center vh-100">
                <div className="container-empleado bg-light shadow rounded p-4">
                    <h2 className="text-center mb-2">{action && action === "update" ? "ACTUALIZAR" : "CREAR"} CLIENTE</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="text-center">
                            <h3><b>INFORMACIÓN PERSONAL</b></h3>
                        </div>
                        <div className="row"> {/* Nombres y apellidos */}
                            <div className="col-md-4">
                                <Inputs text="Nombres" name="name" event={handleChange} value={formData.name} />
                                {errorsForms.name && <div className="text-danger">{errorsForms.name}</div>}
                            </div>
                            <div className="col-md-4">
                                <Inputs event={handleChange} text="Apellidos" name="lastName" value={formData.lastName} />
                                {errorsForms.lastName && <div className="text-danger">{errorsForms.lastName}</div>}
                            </div>
                            <div className="col-md-4">
                                <Select event={handleChange} value={formData.typeDocument} text="Tipo de Documento" options={OptionsTypeDocument} name="typeDocument" />
                                {errorsForms.typeDocument && <div className="text-danger">{errorsForms.typeDocument}</div>}
                            </div>
                            <div className="col-md-4">
                                <Inputs event={handleChange} text="Número de Documento" name="numDocument" icon="fa-solid fa-address-card" value={formData.numDocument} />
                                {errorsForms.numDocument && <div className="text-danger">{errorsForms.numDocument}</div>}
                            </div>
                            <div className="col-md-4">
                                <Inputs event={handleChange} text="Correo Electrónico" name="email" icon="fa-solid fa-envelope" value={formData.email} />
                                {errorsForms.email && <div className="text-danger">{errorsForms.email}</div>}
                            </div>
                            <div className="col-md-4">
                                <Inputs event={handleChange} type="date" text="Fecha de Nacimiento" name="dateOfBirth" icon="fa-solid fa-calendar-days" value={formData.dateOfBirth} />
                                {errorsForms.dateOfBirth && <div className="text-danger">{errorsForms.dateOfBirth}</div>}
                            </div>
                            <div className="col-md-4">
                                <Select event={handleChange} value={formData.nationality} text="Nacionalidad" options={nationality} name="nationality" />
                                {errorsForms.nationality && <div className="text-danger">{errorsForms.nationality}</div>}
                            </div>
                            <div className="col-md-4">
                                <Select event={handleChange} value={formData.sex} text="Género" options={genero} name="sex" />
                                {errorsForms.sex && <div className="text-danger">{errorsForms.sex}</div>}
                            </div>
                            <div className="col-md-4">
                                <Select event={handleChange} text="Estado Civil" value={formData.maritalStatus} options={maritalStatus} name="maritalStatus" />
                                {errorsForms.maritalStatus && <div className="text-danger">{errorsForms.maritalStatus}</div>}
                            </div>
                        </div>

                        <div className="text-center">
                            <h3><b>CONTACTO Y UBICACIÓN</b></h3>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <Inputs event={handleChange} text="Número de Teléfono" name="phone" icon="fa-solid fa-phone-volume" value={formData.phone} />
                                {errorsForms.phone && <div className="text-danger">{errorsForms.phone}</div>}
                            </div>
                            <div className="col-md-6">
                                <Inputs event={handleChange} text="Dirección" name="address" icon="fa-solid fa-map-pin" value={formData.address} />
                                {errorsForms.address && <div className="text-danger">{errorsForms.address}</div>}
                            </div>
                            <div className="col-md-6">
                                <Select event={handleChange} text="Ciudad" value={formData.cityName} options={cities} name="cityName" />
                                {errorsForms.cityName && <div className="text-danger">{errorsForms.cityName}</div>}
                            </div>
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-success">{action && action === "update" ? "Actualizar" : "Guardar"} Cliente</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

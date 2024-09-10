import React, { useState } from 'react';
import { Inputs } from '../../html components/Inputs';
import { Select } from '../../html components/Selects';
import '../../../assets/css/AgregarEmpleado.css';
import { ControllerCreateUpdateVehicle } from './controllers/ControllerCreateUpdateVehicle';
import { typeVehicle, weightUnits, volumeUnits } from '../update/options/arrays';

export const AddVehicle = () => {
    const { formData, errorsForms, handleChange, handleSubmit } = ControllerCreateUpdateVehicle();
    return (
        <>
            <div className="d-flex-empleado justify-content-center align-items-center vh-100">
                <div className="container bg-light shadow rounded p-4">
                    <h2 className="text-center mb-2">AGREGAR VEHÍCULO</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6">
                                <Select event={handleChange} text="Tipo" name="type" options={typeVehicle} value={formData.type} />
                                {errorsForms.type && <div className="text-danger">{errorsForms.type}</div>}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <Inputs event={handleChange} text="Modelo" name="model" icon="fa-solid fa-car" value={formData.model} />
                                {errorsForms.model && <div className="text-danger">{errorsForms.model}</div>}
                            </div>
                            <div className="col-md-6">
                                <Inputs event={handleChange} text="Matrícula" name="licensePlate" icon="fa-solid fa-id-card" value={formData.licensePlate} />
                                {errorsForms.licensePlate && <div className="text-danger">{errorsForms.licensePlate}</div>}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <Inputs event={handleChange} text="Registro" name="registration" icon="fa-solid fa-id-card" value={formData.registration} />
                                {errorsForms.registration && <div className="text-danger">{errorsForms.registration}</div>}
                            </div>
                        </div>
                        <div className="row">
                            {/* Capacidad de Peso y Unidad de Medida */}
                            <div className="col-md-6">
                                <Inputs event={handleChange} text="Capacidad de Peso" name="weightCapacity" icon="fa-solid fa-weight-hanging" value={formData.weightCapacity} />
                                {errorsForms.weightCapacity && <div className="text-danger">{errorsForms.weightCapacity}</div>}
                            </div>
                            <div className="col-md-6">
                                <Select event={handleChange} text="Unidad de Peso" name="weightUnit" options={weightUnits} value={formData.weightUnit} />
                                {errorsForms.weightUnit && <div className="text-danger">{errorsForms.weightUnit}</div>}
                            </div>
                        </div>
                        <div className="row">
                            {/* Capacidad de Volumen y Unidad de Medida */}
                            <div className="col-md-6">
                                <Inputs event={handleChange} text="Capacidad de Volumen" name="volumeCapacity" icon="fa-solid fa-box" value={formData.volumeCapacity} />
                                {errorsForms.volumeCapacity && <div className="text-danger">{errorsForms.volumeCapacity}</div>}
                            </div>
                            <div className="col-md-6">
                                <Select event={handleChange} text="Unidad de Volumen" name="volumeUnit" options={volumeUnits} value={formData.volumeUnit} />
                                {errorsForms.volumeUnit && <div className="text-danger">{errorsForms.volumeUnit}</div>}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <Inputs event={handleChange} text="Espacio de Pasajeros" name="passengerSpace" icon="fa-solid fa-users" value={formData.passengerSpace} />
                                {errorsForms.passengerSpace && <div className="text-danger">{errorsForms.passengerSpace}</div>}
                            </div>
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-success">Crear Vehículo <i className="fa-solid fa-floppy-disk"></i></button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

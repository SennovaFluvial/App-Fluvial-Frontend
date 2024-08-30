import React, { useState } from 'react';
import { Inputs } from '../../html components/Inputs';
import { Select } from '../../html components/Selects';
import '../../../assets/css/AgregarEmpleado.css';

export const AddVehicle = () => {
    const [formData, setFormData] = useState({
        tipo: '',
        otro: '',
        modelo: '',
        matricula: '',
        peso: '',
        volumen: '',
        pasajeros: ''
    });

    const [errorsForms, setErrorsForms] = useState({});

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (value.trim()) {
            const { [name]: removed, ...rest } = errorsForms;
            setErrorsForms(rest);
        } else {
            setErrorsForms({ ...errorsForms, [name]: "Campo obligatorio" });
        }

        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const newErrors = {};

        for (let [name, value] of Object.entries(formData)) {
            if (!value.trim()) {
                newErrors[name] = "Campo obligatorio";
            }
        }

        setErrorsForms({ ...errorsForms, ...newErrors });

        if (Object.keys(newErrors).length > 0) {
            alert('Por favor, complete todos los campos obligatorios correctamente.');
            return;
        }

        alert('Vehículo agregado correctamente');
        console.log('Formulario de vehículo enviado:', formData);
        window.location.reload();
    };

    return (
        <>
            <div className="d-flex-empleado justify-content-center align-items-center vh-100">
                <div className="container bg-light shadow rounded p-4">
                    <h2 className="text-center mb-2">AGREGAR VEHÍCULO</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6">
                                <Select event={handleChange} text="Tipo" name="tipo" options={[
                                    { value: '', label: 'Seleccionar' },
                                    { value: 'opcion1', label: 'Opción 1' },
                                    { value: 'opcion2', label: 'Opción 2' }
                                ]} />
                                {errorsForms.tipo && <div className="text-danger">{errorsForms.tipo}</div>}
                            </div>
                            <div className="col-md-6">
                                <Inputs event={handleChange} text="Otro" name="otro" />
                                {errorsForms.otro && <div className="text-danger">{errorsForms.otro}</div>}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <Inputs event={handleChange} text="Modelo" name="modelo" icon="fa-solid fa-car" />
                                {errorsForms.modelo && <div className="text-danger">{errorsForms.modelo}</div>}
                            </div>
                            <div className="col-md-6">
                                <Inputs event={handleChange} text="Matrícula/Patente" name="matricula" icon="fa-solid fa-id-card" />
                                {errorsForms.matricula && <div className="text-danger">{errorsForms.matricula}</div>}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <Inputs event={handleChange} text="Capacidad de Peso" name="peso" icon="fa-solid fa-weight-hanging" />
                                {errorsForms.peso && <div className="text-danger">{errorsForms.peso}</div>}
                            </div>
                            <div className="col-md-6">
                                <Inputs event={handleChange} text="Capacidad de Volumen" name="volumen" icon="fa-solid fa-box" />
                                {errorsForms.volumen && <div className="text-danger">{errorsForms.volumen}</div>}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <Inputs event={handleChange} text="Espacio de Pasajeros" name="pasajeros" icon="fa-solid fa-users" />
                                {errorsForms.pasajeros && <div className="text-danger">{errorsForms.pasajeros}</div>}
                            </div>
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-success">Crear Vehiculo <i className="fa-solid fa-floppy-disk"></i></button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

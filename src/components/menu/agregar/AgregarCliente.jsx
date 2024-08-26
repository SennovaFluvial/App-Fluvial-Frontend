import React, { useState, useEffect } from 'react';
import { Select } from '../../html components/Selects';
import { Inputs } from '../../html components/Inputs';
import '../../../assets/css/AgregarEmpleado.css';
import { OptionsTypeDocument, genero, maritalStatus, nationality } from '../update/options/arrays.jsx';

export const AgregarCliente = () => {

    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        typeDocument: '',
        numDocument: '',
        email: '',
        dateOfBirth: '',
        nationality: '',
        maritalStatus: '',
        phone: '',
        address: '',
        sex: '',
        cityName: '',
        userNames: ['']
    });

    const [errorsForms, setErrorsForms] = useState({});

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name.startsWith("userName")) {
            const index = parseInt(name.replace("userName", ""));
            const updatedUserNames = [...formData.userNames];
            updatedUserNames[index] = value;
            setFormData({ ...formData, userNames: updatedUserNames });
        } else {
            if (value.trim()) {
                const { [name]: removed, ...rest } = errorsForms;
                setErrorsForms(rest);
            } else {
                setErrorsForms({ ...errorsForms, [name]: "Campo obligatorio" });
            }

            setFormData({ ...formData, [name]: value });
        }
    };

    const handleErrors = (name, message) => {
        setErrorsForms({ ...errorsForms, [name]: message });
    };

    useEffect(() => {
        if (formData.dateOfBirth) {
            const selectedDate = new Date(formData.dateOfBirth);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (selectedDate >= today) {
                handleErrors("dateOfBirth", "La fecha de nacimiento no puede ser actual o una fecha futura");
            }
        }
    }, [formData.dateOfBirth]);

    const handleSubmit = (event) => {
        event.preventDefault();

        const newErrors = {};

        for (let [name, value] of Object.entries(formData)) {
            if (Array.isArray(value) && value.some((v) => !v.trim())) {
                newErrors[name] = "Campo obligatorio";
            } else if (value.trim()) {
                const { [name]: removed, ...rest } = errorsForms;
                setErrorsForms(rest);
            } else {
                newErrors[name] = "Campo obligatorio";
            }
        }

        setErrorsForms({ ...errorsForms, ...newErrors });

        if (Object.keys(newErrors).length > 0) {
            alert('Por favor, complete todos los campos obligatorios correctamente.');
            return;
        }

        alert('Cliente creado correctamente');
        console.log('Formulario enviado');
        window.location.reload();
    };

    return (
        <>
            <div className="d-flex-empleado justify-content-center align-items-center vh-100">
                <div className="container-empleado bg-light shadow rounded p-4">
                    <h2 className="text-center mb-2">CREAR CLIENTE</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="text-center">
                            <h3><b>INFORMACIÓN PERSONAL</b></h3>
                        </div>
                        <div className="row"> {/* Nombres y apellidos */}
                            <div className="col-md-4">
                                <Inputs text="Nombres" name="name" event={handleChange} />
                                {errorsForms.name && <div className="text-danger">{errorsForms.name}</div>}
                            </div>
                            <div className="col-md-4">
                                <Inputs event={handleChange} text="Apellidos" name="lastName" />
                                {errorsForms.lastName && <div className="text-danger">{errorsForms.lastName}</div>}
                            </div>
                            <div className="col-md-4">
                                <Select event={handleChange} text="Tipo de Documento" options={OptionsTypeDocument} name="typeDocument" />
                                {errorsForms.typeDocument && <div className="text-danger">{errorsForms.typeDocument}</div>}
                            </div>
                            <div className="col-md-4">
                                <Inputs event={handleChange} text="Número de Documento" name="numDocument" icon="fa-solid fa-address-card" />
                                {errorsForms.numDocument && <div className="text-danger">{errorsForms.numDocument}</div>}
                            </div>
                            <div className="col-md-4">
                                <Inputs event={handleChange} text="Correo Electrónico" name="email" icon="fa-solid fa-envelope" />
                                {errorsForms.email && <div className="text-danger">{errorsForms.email}</div>}
                            </div>
                            <div className="col-md-4">
                                <Inputs event={handleChange} type="date" text="Fecha de Nacimiento" name="dateOfBirth" icon="fa-solid fa-calendar-days" />
                                {errorsForms.dateOfBirth && <div className="text-danger">{errorsForms.dateOfBirth}</div>}
                            </div>
                            <div className="col-md-4">
                                <Select event={handleChange} text="Nacionalidad" options={nationality} name="nationality" />
                                {errorsForms.nationality && <div className="text-danger">{errorsForms.nationality}</div>}
                            </div>
                            <div className="col-md-4">
                                <Select event={handleChange} text="Género" options={genero} name="sex" />
                                {errorsForms.sex && <div className="text-danger">{errorsForms.sex}</div>}
                            </div>
                            <div className="col-md-4">
                                <Select event={handleChange} text="Estado Civil" options={maritalStatus} name="maritalStatus" />
                                {errorsForms.maritalStatus && <div className="text-danger">{errorsForms.maritalStatus}</div>}
                            </div>
                        </div>

                        <div className="text-center">
                            <h3><b>CONTACTO Y UBICACIÓN</b></h3>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <Inputs event={handleChange} text="Número de Teléfono" name="phone" icon="fa-solid fa-phone-volume" />
                                {errorsForms.phone && <div className="text-danger">{errorsForms.phone}</div>}
                            </div>
                            <div className="col-md-6">
                                <Inputs event={handleChange} text="Dirección" name="address" placeholder="Calle XX #XX-XX Barrio" icon="fa-solid fa-map-pin" />
                                {errorsForms.address && <div className="text-danger">{errorsForms.address}</div>}
                            </div>
                            <div className="col-md-6">
                                <Inputs event={handleChange} text="Ciudad" name="cityName" />
                                {errorsForms.cityName && <div className="text-danger">{errorsForms.cityName}</div>}
                            </div>
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-success">Crear Cliente</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

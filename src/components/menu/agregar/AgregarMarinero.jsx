import React, { useState } from 'react';
import { Inputs } from '../../html components/Inputs';
import { Select } from '../../html components/Selects';
import { useOptionsDepto, useOptionsCities, status, OptionsTypeDocument, genero, maritalStatus, nationality } from '../update/options/arrays.jsx';
import '../../../assets/css/AgregarEmpleado.css';
import { ApiService } from '../../../class/ApiServices.jsx';
import { useNavigate } from 'react-router';

export const AgregarMarinero = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState(
        {
            name: '',
            lastName: '',
            typeDocument: '',
            numDocument: '',
            licencia: '',
            email: '',
            dateOfBirth: '',
            nationality: '',
            maritalStatus: '',
            phone: '',
            address: '',
            sex: '',
            status: '',
            employeeType: {
                typeName: 'Marinero'
            }
        }
    );

    const [errorsForms, setErrorsForms] = useState({});

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === 'dateOfBirth') {
            const today = new Date();
            const selectedDate = new Date(value);
            if (selectedDate > today) {
                setErrorsForms({ ...errorsForms, dateOfBirth: "La fecha de nacimiento no puede ser una fecha futura" });
            } else {
                const { dateOfBirth, ...rest } = errorsForms;
                setErrorsForms(rest);
            }
        } else if (typeof value === 'string' && value.trim()) {
            const { [name]: removed, ...rest } = errorsForms;
            setErrorsForms(rest);
        } else {
            setErrorsForms({ ...errorsForms, [name]: "Campo obligatorio" });
        }

        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newErrors = {};

        for (let [name, value] of Object.entries(formData)) {
            if (typeof value === 'string' && !value.trim()) {
                newErrors[name] = "Campo obligatorio";
            }
        }

        if (formData.dateOfBirth) {
            const today = new Date();
            const selectedDate = new Date(formData.dateOfBirth);
            if (selectedDate > today) {
                newErrors.dateOfBirth = "La fecha de nacimiento no puede ser una fecha futura";
            }
        }

        setErrorsForms({ ...errorsForms, ...newErrors });

        if (Object.keys(newErrors).length > 0) {
            alert('Por favor, complete todos los campos obligatorios correctamente.');
            return;
        }

        const confirmationMessage = `¿Está seguro que quiere crear al marinero?\nNombre: ${formData.name} ${formData.lastName}`;
        const userConfirmed = window.confirm(confirmationMessage);

        if (userConfirmed) {
            try {
                await ApiService.post('/api/v1/employeefluvial/save', formData);
                alert('Marinero creado correctamente');
                console.log('Formulario enviado', formData);
                navigate('../../adminSection/show-crew');
            } catch (error) {
                console.error('Error al crear el marinero:', error);
                alert('Error al crear el marinero');
            }
        } else {
            alert('Operación cancelada');
        }
    };

    return (
        <div className="d-flex-empleado justify-content-center align-items-center vh-100">
            <div className="container-empleado bg-light shadow rounded p-4">
                <h2 className="text-center mb-2">CREAR MARINERO</h2>
                <form onSubmit={handleSubmit}>
                    {/* Información Personal */}
                    <div className="text-center">
                        <h3><b>INFORMACIÓN PERSONAL</b></h3>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <Inputs text="Nombres" name="name" event={handleChange} value={formData.name} />
                            {errorsForms.name && <div className="text-danger">{errorsForms.name}</div>}
                        </div>
                        <div className="col-md-4">
                            <Inputs text="Apellidos" name="lastName" event={handleChange} vvalue={formData.lastName} />
                            {errorsForms.lastName && <div className="text-danger">{errorsForms.lastName}</div>}
                        </div>
                        <div className="col-md-4">
                            <Select text="Tipo de Documento" name="typeDocument" event={handleChange} options={OptionsTypeDocument} />
                            {errorsForms.typeDocument && <div className="text-danger">{errorsForms.typeDocument}</div>}
                        </div>
                        <div className="col-md-4">
                            <Inputs text="Número de Documento" name="numDocument" event={handleChange} icon="fa-solid fa-address-card" value={formData.numDocument} />
                            {errorsForms.numDocument && <div className="text-danger">{errorsForms.numDocument}</div>}
                        </div>
                        <div className="col-md-4">
                            <Inputs type="date" text="Fecha de Nacimiento" name="dateOfBirth" event={handleChange} icon="fa-solid fa-calendar-days" value={formData.dateOfBirth} />
                            {errorsForms.dateOfBirth && <div className="text-danger">{errorsForms.dateOfBirth}</div>}
                        </div>
                        <div className="col-md-4">
                            <Select text="Nacionalidad" name="nationality" event={handleChange} options={nationality} />
                            {errorsForms.nationality && <div className="text-danger">{errorsForms.nationality}</div>}
                        </div>
                        <div className="col-md-4">
                            <Select text="Estado civil" name="maritalStatus" event={handleChange} options={maritalStatus} />
                            {errorsForms.maritalStatus && <div className="text-danger">{errorsForms.maritalStatus}</div>}
                        </div>
                        <div className="col-md-4">
                            <Select text="Género" name="sex" event={handleChange} options={genero} />
                            {errorsForms.sex && <div className="text-danger">{errorsForms.sex}</div>}
                        </div>
                    </div>

                    {/* Contacto y Dirección */}
                    <div className="text-center mt-3">
                        <h3><b>CONTACTO Y DIRECCIÓN</b></h3>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <Inputs text="Correo Electrónico" name="email" event={handleChange} icon={"fa-solid fa-at"} value={formData.email} />
                            {errorsForms.email && <div className="text-danger">{errorsForms.email}</div>}
                        </div>
                        <div className="col-md-4">
                            <Inputs text="Número de Teléfono" name="phone" event={handleChange} icon="fa-solid fa-phone-volume" value={formData.phone} />
                            {errorsForms.phone && <div className="text-danger">{errorsForms.phone}</div>}
                        </div>
                        <div className="col-md-4">
                            <Inputs text="Dirección" name="address" event={handleChange} icon="fa-solid fa-map-pin" value={formData.address} />
                            {errorsForms.address && <div className="text-danger">{errorsForms.address}</div>}
                        </div>

                        <div className="text-center">
                            <h3><b>INFORMACIÓN LABORAL</b></h3>
                        </div>
                        <div className="col-md-4">
                            <Inputs text="Licencia" name="licencia" event={handleChange} icon={"fa-regular fa-id-badge"} value={formData.licencia} />
                            {errorsForms.licencia && <div className="text-danger">{errorsForms.licencia}</div>}
                        </div>
                        <div className="col-md-4">
                            <Select text="Estado" name="status" event={handleChange} options={status} />
                            {errorsForms.status && <div className="text-danger">{errorsForms.status}</div>}
                        </div>
                    </div>

                    <div className="text-center mt-3">
                        <button type="submit" className="btn btn-success">Crear Marinero <i className="fa-solid fa-ship"></i></button>
                    </div>
                </form>
            </div>
        </div>
    )
}

import React, { useState, useEffect } from 'react';
import { Select } from '../../html components/Selects';
import { Inputs } from '../../html components/Inputs';
import '../../../assets/css/AgregarEmpleado.css';
import { OptionsTypeDocument, genero, maritalStatus, nationality, useOptionsCities, useOptionsDepto } from '../update/options/arrays.jsx';
import instance from '../../../config/AxiosApi.jsx';
import { useNavigate } from 'react-router';
export const AgregarCliente = () => {
    const nav = useNavigate();
    const user = JSON.parse(localStorage.getItem("user")); // Recuperar el JSON almacenado en el LocalStorage
    const userNameUser = user?.username || null; // Obtener el `userName` de usuario Logueado Si no es nulo
    const cities = useOptionsCities(); // Se debe de hacer esto para mostrar las ciudades.
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
        userNames: [userNameUser]
    });

    const [errorsForms, setErrorsForms] = useState({});

    const createCustomer = async (customerData) => {

        try {

            const jsonData = JSON.stringify(customerData);
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const response = await instance.post("/customers/save", jsonData, config);
            console.log("Respuesta del Servidor", response)

        } catch (error) {
            console.error('Error al crear el usuario:', error.response ? error.response.data : error.message);
        }

    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name.startsWith("userName")) {
            const index = parseInt(name.replace("userName", ""));
            const updatedUserNames = [...formData.userNames];
            updatedUserNames[index] = value;
            setFormData({ ...formData, userNames: updatedUserNames });
        } else {
            // Solo aplicar trim() si el valor es una cadena
            const updatedValue = typeof value === 'string' ? value.trim() : value;
            setFormData({ ...formData, [name]: updatedValue });
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

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newErrors = {};

        for (let [name, value] of Object.entries(formData)) {
            if (Array.isArray(value) && value.some((v) => typeof v === 'string' && !v.trim())) {
                newErrors[name] = "Campo obligatorio";
            } else if (typeof value === 'string' && !value.trim()) {
                newErrors[name] = "Campo obligatorio";
            } else {
                const { [name]: removed, ...rest } = errorsForms;
                setErrorsForms(rest);
            }
        }

        setErrorsForms({ ...errorsForms, ...newErrors });

        if (Object.keys(newErrors).length > 0) {
            alert('Por favor, complete todos los campos obligatorios correctamente.');
            return;
        }
        await createCustomer(formData);
        alert('Cliente creado correctamente');
        console.log('Formulario enviado');
        nav("../../adminSection/show-customers");
    };


    console.log(formData)
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
                                <Inputs event={handleChange} text="Dirección" name="address" icon="fa-solid fa-map-pin" />
                                {errorsForms.address && <div className="text-danger">{errorsForms.address}</div>}
                            </div>
                            <div className="col-md-6">
                                <Select event={handleChange} text="Ciudad" options={cities} name="cityName" />
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

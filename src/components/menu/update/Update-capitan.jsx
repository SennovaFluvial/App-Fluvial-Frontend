import React, { useEffect, useState } from 'react';
import { Select } from '../../html components/Selects';
import { Inputs } from '../../html components/Inputs';
import { useOptionsDepto, useOptionsCompanies, useOptionsCities, OptionsTypeDocument, genero, status } from '../update/options/arrays.jsx';
import { useParams } from 'react-router';

export const UpdateCapitan = () => {
    const OptionsDepto = useOptionsDepto();
    const OptionsCompanies = useOptionsCompanies();
    const OptionsCities = useOptionsCities();
    const { id } = useParams();
    const capitanId = parseInt(id, 10);
    const [formData, setFormData] = useState({
        name: "",
        lastName: "",
        typeDocument: "",
        numDocument: "",
        license: "",
        email: "",
        dateOfBirth: "",
        nationality: "",
        maritalStatus: "",
        phone: "",
        address: "",
        sex: "",
        status: "",
        cityName: ""
    });

    useEffect(() => {
        const filterCapitanId = capitanes.find(capitan => capitan.id === capitanId);
        if (filterCapitanId) {
            setFormData({
                name: filterCapitanId.name,
                lastName: filterCapitanId.lastName,
                typeDocument: filterCapitanId.typeDocument,
                numDocument: filterCapitanId.numDocument,
                license: filterCapitanId.license,
                email: filterCapitanId.email,
                dateOfBirth: filterCapitanId.dateOfBirth,
                nationality: filterCapitanId.nationality,
                maritalStatus: filterCapitanId.maritalStatus,
                phone: filterCapitanId.phone,
                address: filterCapitanId.address,
                sex: filterCapitanId.sex,
                status: filterCapitanId.status,
                cityName: filterCapitanId.city?.ciudad || ""
            });
        }
    }, [capitanId]);

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateCapitan({ id_capitan: capitanId, dataCapitan: formData });
    };

    return (
        <>
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="container-am bg-light shadow rounded p-4">
                    <h2 className="text-center mb-4">ACTUALIZAR CAPITÁN</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="text-center mt-5">
                            <h3><b>INFORMACIÓN PERSONAL</b></h3>
                        </div>
                        <div className="row my-4">
                            <div className="col-md-6">
                                <Inputs text="Nombres" name="name" value={formData.name} event={handleChange} />
                            </div>
                            <div className="col-md-6">
                                <Inputs text="Apellidos" name="lastName" value={formData.lastName} event={handleChange} />
                            </div>
                            <div className="col-md-5">
                                <Select text="Tipo de Documento" options={OptionsTypeDocument} name="typeDocument" value={formData.typeDocument} event={handleChange} />
                            </div>
                            <div className="col-md-7">
                                <Inputs text="Número de Documento" name="numDocument" icon="fa-solid fa-address-card" value={formData.numDocument} event={handleChange} />
                            </div>
                            <div className="col-md-7">
                                <Select text="Género" options={genero} name="sex" value={formData.sex} event={handleChange} />
                            </div>
                        </div>

                        <div className="text-center mt-4">
                            <h3><b>UBICACIÓN</b></h3>
                        </div>
                        <div className="row my-4">
                            <div className="col-md-6">
                                <Select text="Ciudad" options={OptionsCities} name="cityName" value={formData.cityName} event={handleChange} />
                            </div>
                            <div className="col-md-6">
                                <Select text="Departamento" options={OptionsDepto} name="departamento" value={formData.departamento} event={handleChange} />
                            </div>
                            <div className="col-md-12">
                                <Inputs text="Dirección" name="address" icon="fa-solid fa-map-pin" value={formData.address} event={handleChange} />
                            </div>
                        </div>

                        <div className="text-center mt-4">
                            <h3><b>CONTACTO</b></h3>
                        </div>
                        <div className="row my-4">
                            <div className="col-md-12">
                                <Inputs text="Número de Teléfono" name="phone" icon="fa-solid fa-phone-volume" value={formData.phone} event={handleChange} />
                            </div>
                            <div className="col-md-6">
                                <Inputs text="Correo Electrónico" name="email" icon="fa-solid fa-envelope" value={formData.email} event={handleChange} />
                            </div>
                        </div>

                        <div className="text-center mt-4">
                            <h3><b>INFORMACIÓN LABORAL</b></h3>
                        </div>
                        <div className="row mt-2">
                            <div className="col-md-6">
                                <Inputs text="Licencia" name="license" value={formData.license} event={handleChange} />
                            </div>
                            <div className="col-md-6">
                                <Select text="Estado" options={status} name="status" value={formData.status} event={handleChange} />
                            </div>
                        </div>

                        <div className="text-center">
                            <button type="submit" className="btn btn-success">Actualizar <i className="fa-solid fa-square-pen"></i></button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};
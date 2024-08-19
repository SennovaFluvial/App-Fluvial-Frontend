import React, { useEffect, useState } from 'react';
import { Select } from '../../html components/Selects';
import { Inputs } from '../../html components/Inputs';
import { useParams } from 'react-router';
import { OptionsTypeDocument, genero, maritalStatus, nationality } from '../update/options/arrays.jsx';

export const UpdateCustomer = () => {
    const { id } = useParams();
    const clientId = parseInt(id, 10);
    const [formData, setFormData] = useState({
        name: "",
        lastName: "",
        typeDocument: "",
        numDocument: "",
        email: "",
        dateOfBirth: "",
        nationality: "",
        maritalStatus: "",
        phone: "",
        address: "",
        sex: "",
        cityName: "",
        userNames: [""]
    });

    useEffect(() => {
        const filterClientId = clients.find(client => client.id === clientId);
        if (filterClientId) {
            setFormData({
                name: filterClientId.name,
                lastName: filterClientId.lastName,
                typeDocument: filterClientId.typeDocument,
                numDocument: filterClientId.numDocument,
                email: filterClientId.email,
                dateOfBirth: filterClientId.dateOfBirth,
                nationality: filterClientId.nationality,
                maritalStatus: filterClientId.maritalStatus,
                phone: filterClientId.phone,
                address: filterClientId.address,
                sex: filterClientId.sex,
                cityName: filterClientId.cityName,
                userNames: filterClientId.userNames || ['']
            });
        }
    }, [clients, clientId]);

    if (!formData.name) {
        return <div>Cliente no encontrado</div>;
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name.startsWith("userName")) {
            const index = parseInt(name.replace("userName", ""));
            const updatedUserNames = [...formData.userNames];
            updatedUserNames[index] = value;
            setFormData({ ...formData, userNames: updatedUserNames });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await updateClient({ id_client: clientId, dataClient: formData });
    };

    return (
        <>
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="container bg-light shadow rounded p-4">
                    <h2 className="text-center mb-4">ACTUALIZAR CLIENTE</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="text-center mt-5">
                            <h3><b>INFORMACIÓN PERSONAL</b></h3>
                        </div>
                        <div className="row my-4"> {/* Nombres y apellidos */}
                            <div className="col-md-4">
                                <Inputs text="Nombres" name="name" value={formData.name} event={handleChange} />
                            </div>
                            <div className="col-md-4">
                                <Inputs text="Apellidos" name="lastName" value={formData.lastName} event={handleChange} />
                            </div>
                            <div className="col-md-4">
                                <Select text="Tipo de Documento" options={OptionsTypeDocument} name="typeDocument" value={formData.typeDocument} event={handleChange} />
                            </div>
                            <div className="col-md-4">
                                <Inputs text="Número de Documento" name="numDocument" icon="fa-solid fa-address-card" value={formData.numDocument} event={handleChange} />
                            </div>
                            <div className="col-md-4">
                                <Inputs text="Correo Electrónico" name="email" icon="fa-solid fa-envelope" value={formData.email} event={handleChange} />
                            </div>
                            <div className="col-md-4">
                                <Inputs text="Fecha de Nacimiento" name="dateOfBirth" type="date" value={formData.dateOfBirth} event={handleChange} />
                            </div>
                            <div className="col-md-4">
                                <Select text="Nacionalidad" options={nationality} name="nationality" value={formData.nationality} event={handleChange} />
                            </div>
                            <div className="col-md-4">
                                <Select text="Estado Civil" options={maritalStatus} name="maritalStatus" value={formData.maritalStatus} event={handleChange} />
                            </div>
                            <div className="col-md-4">
                                <Select text="Género" options={genero} name="sex" value={formData.sex} event={handleChange} />
                            </div>
                        </div>
                        <div className="text-center mt-4">
                            <h3><b>CONTACTO</b></h3>
                        </div>
                        <div className="row my-4">  {/* Contacto | telefono */}
                            <div className="col-md-12">
                                <Inputs text="Número de Teléfono" name="phone" icon="fa-solid fa-phone-volume" value={formData.phone} event={handleChange} />
                            </div>
                            <div className="col-md-12">
                                <Inputs text="Dirección" name="address" icon="fa-solid fa-map-pin" value={formData.address} event={handleChange} />
                            </div>
                            <div className="col-md-12">
                                <Inputs text="Ciudad" name="cityName" value={formData.cityName} event={handleChange} />
                            </div>
                        </div>
                        <div className="text-center mt-4">
                            <h3><b>USUARIOS ASOCIADOS</b></h3>
                        </div>
                        <div className="row my-4">
                            {formData.userNames.map((userName, index) => (
                                <div key={index} className="col-md-6">
                                    <Inputs text={`Usuario ${index + 1}`} name={`userName${index}`} value={userName} event={handleChange} />
                                </div>
                            ))}
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-success">Actualizar Cliente <i className="fa-solid fa-square-pen"></i></button>
                        </div>
                    </form >
                </div >
            </div >
        </>
    )
}
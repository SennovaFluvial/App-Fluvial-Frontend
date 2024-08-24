import React, { useEffect, useState } from 'react'
import { Select } from '../../html components/Selects' // Componente reutlizable de Seleccion
import { Inputs } from '../../html components/Inputs'
import { useOptionsDepto, useOptionsCompanies, useOptionsCities, OptionsTypeDocument, useRoles, genero, status } from '../update/options/arrays.jsx'
import { useParams } from 'react-router'

export const UpdateUsers = () => {
    const OptionsDepto = useOptionsDepto();
    const OptionsComapnies = useOptionsCompanies();
    const OptionsCities = useOptionsCities(); // Se usa?
    const roles = useRoles();
    const { id } = useParams();
    const userId = parseInt(id, 10);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        roleRequest: {
            roleListName: []
        },
        estado: "",
        companyName: "",
        name: "",
        lastName: "",
        typeDocument: "",
        numDocument: "",
        phone: "",
        address: "",
        sex: "",
        cityName: ""
    });
    const filterUserId = users.filter(user => user.id === userId)

    useEffect(() => {
        const filterUserId = users.find(user => user.id === userId);
        if (filterUserId) {
            setFormData({
                username: filterUserId.username,
                password: "",
                roleRequest: {
                    roleListName: [filterUserId.roles[0]?.roleEnum || ""]
                },
                estado: filterUserId.status,
                companyName: filterUserId.company.name,
                name: filterUserId.name,
                lastName: filterUserId.lastName,
                typeDocument: filterUserId.typeDocument,
                numDocument: filterUserId.numDocument,
                phone: filterUserId.phone,
                address: filterUserId.address,
                sex: filterUserId.sex,
                cityName: filterUserId.city?.ciudad || ""
            });
        }
    }, [users, userId]);
    if (filterUserId.length === 0) {
        return <div>Usuario no encontrado</div>;
    }
    const user = filterUserId[0];

    const handleChange = async (e) => {
        const { name, value } = e.target;
        //  console.log(`Changing ${name} to ${value}`);
        setFormData(
            prevState => ({
                ...prevState, [name]: value
            })
        )
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateUser({ id_user: userId, dataUser: formData });
    }
    // console.log('Current formData:', formData);

    return (
        <>

            <div
                className="d-flex justify-content-center align-items-center vh-100">
                <div className="container-am bg-light shadow rounded p-4">
                    <h2 className="text-center mb-4">ACTUALIZAR USUARIO</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="text-center mt-5">
                            <h3>
                                <b> INFORMACIÓN PERSONAL</b>
                            </h3>
                        </div>
                        <div className="row my-4"> {/* Nombres y apellidos */}
                            <div className="col-md-6">
                                <Inputs text="Nombes" name="name" value={formData.name} event={handleChange} />
                            </div>
                            <div className="col-md-6">
                                <Inputs text="Apellidos" name="lastName" value={formData.lastName} event={handleChange} />
                            </div>
                            <div className="col-md-5">
                                <Select text="Tipo de Documento" options={OptionsTypeDocument} name="typeDocument" value={formData.typeDocument} event={handleChange} />
                            </div>
                            <div className="col-md-7">
                                <Inputs text="Numero de Documento" name="numDocument" icon="fa-solid fa-address-card" value={formData.numDocument} event={handleChange} />
                            </div>
                            <div className="col-md-7">
                                <Select text="Genero" options={genero} name="sex" value={formData.genero} event={handleChange} />
                            </div>
                        </div>

                        <div className="text-center mt-4">
                            <h3>
                                <b>UBICACIÓN</b>
                            </h3>
                        </div>

                        <div className="row my-4"> {/* Nombres y apellidos */}
                            <div className="col-md-6"> {/* Ciudad */}
                                <Select text="Ciudad" options={OptionsCity} name="cityName" value={formData.cityName} event={handleChange} />
                            </div>
                            <div className="col-md-6"> {/* Departamento */}
                                <Select text="Departamento" options={OptionsDepto} name="Departamento" value={formData.departamento} event={handleChange} />
                            </div>
                            <div className="col-md-12">
                                <Inputs text="Direccion" name="address" icon="fa-solid fa-map-pin" value={formData.address} event={handleChange} />
                            </div>
                        </div>

                        <div className="text-center mt-4">
                            <h3>
                                <b>CONTACTO</b>
                            </h3>
                        </div>

                        <div className="row my-4">  {/* Contacto | telefono */}
                            <div className="col-md-12">
                                <Inputs text="Numero de telefono" name="phone" icon="fa-solid fa-phone-volume" value={formData.phone} event={handleChange} />
                            </div>
                            <div className="col-md-6">
                                <Inputs text="Usuario" name="username" icon="fa-solid fa-envelope" value={formData.username} event={handleChange} />
                            </div>
                            <div className="col-md-6">
                                <Inputs text="Confirmar Usuario" name="username" icon="fa-regular fa-envelope" value={formData.username} event={handleChange} />
                            </div>
                            <div className="col-md-6">
                                <Inputs text="Nueva Contraseña" name="password" icon="fa-solid fa-lock" value={formData.password} event={handleChange} />
                            </div>
                            <div className="col-md-6">
                                <Inputs text="Confirmar Contraseña" name="password" icon="fa-solid fa-lock" value={formData.password} event={handleChange} />
                            </div>
                        </div>

                        <div className="text-center mt-4">
                            <h3>
                                <b>INFORMACION LABORAL</b>
                            </h3>
                        </div>

                        <div className="row mt-2">  {/* Rol */}
                            <div className="col-md-6">
                                <Select text="Rol" options={roles} name="roleListName" value={formData.roleRequest.roleListName[0]} event={handleChange} />
                            </div>
                            <div className="col-md-6">
                                <Select text="Empresa" options={OptionsComapnies} name="companyName" value={formData.companyName} event={handleChange} />
                            </div>

                            <Select text="Estado" options={status} name="estado" value={formData.estado} event={handleChange} />
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-success">Actualizar <i className="fa-solid fa-square-pen"></i></button>
                        </div>
                    </form >
                </div >
            </div >
        </>
    )
}

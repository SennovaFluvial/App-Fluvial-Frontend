import React, { useEffect, useState } from 'react'
import { Select } from '../../html components/Selects'
import { Inputs } from '../../html components/Inputs'
import { useOptionsDepto, useOptionsCompanies, useOptionsCities, OptionsTypeDocument, genero, status, useRoles, maritalStatus, codigoPaises } from '../update/options/arrays.jsx'
import { useNavigate, useParams } from 'react-router'
import { ApiService } from '../../../class/ApiServices.jsx'
import '../../../assets/css/AgregarEmpleado.css';

export const UpdateUsers = () => {
    const OptionsDepto = useOptionsDepto();
    const OptionsCompanies = useOptionsCompanies();
    const OptionsCities = useOptionsCities();
    const [users, setUsers] = useState([]);
    const nav = useNavigate();
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
        cityName: "",
        departmentName: "",
        sex: "",
        birthDate: "",
        maritalStatus: ""
    });
    const { id } = useParams();
    const userId = parseInt(id, 10);
    const roles = useRoles();

    // Actualiza el estado users con los datos de la API
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const listUsers = await ApiService.get("/api/v1/companie/users");
                if (Array.isArray(listUsers)) {
                    setUsers(listUsers);
                } else {
                    console.warn('Data from API is not an array or is empty');
                    setUsers([]);
                }
            } catch (error) {
                console.error('Error fetching users:', error);
                setUsers([]);
            }
        };

        fetchUsers();
    }, []);

    // Actualiza formData cuando users o userId cambian
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
                cityName: filterUserId.city?.ciudad || "",
                departmentName: filterUserId.departmentName || "",
                sex: filterUserId.sex,
                birthDate: filterUserId.birthDate || "",
                maritalStatus: filterUserId.maritalStatus || ""
            });
        }
    }, [users, userId]);

    // Verifica si el usuario existe en el estado users
    if (!users.length || !users.some(user => user.id === userId)) {
        return <div>Usuario no encontrado</div>;
    }

    // Encuentra el usuario para su uso en la función `handleSubmit`
    const user = users.find(user => user.id === userId);

    // Maneja los cambios en el formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Maneja el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await ApiService.put(`/auth/update/${userId}`, formData);
            nav("../../adminSection/show-users");
            // Manejo de exito en la actualizacion
        } catch (error) {
            // Manejo de error en la accion de actualizar
            console.error('Error al actualizar el usuario:', error);
        }
    };

    console.log(formData);

    return (
        <>

            <div
                className="d-flex-empleado justify-content-center align-items-center vh-100">
                <div className="container-empleado bg-light shadow rounded p-4">
                    <h2 className="text-center mb-2">ACTUALIZAR USUARIO</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="text-center">
                            <h3>
                                <b> INFORMACIÓN PERSONAL</b>
                            </h3>
                        </div>
                        <div className="row"> {/* Nombres y apellidos */}
                            <div className="col-md-4">
                                <Inputs text="Nombres" name="name" value={formData.name} event={handleChange} />
                            </div>
                            <div className="col-md-4">
                                <Inputs text="Apellidos" name="lastName" value={formData.lastName} event={handleChange} />
                            </div>
                            <div className="col-md-4">
                                <Select text="Tipo de Documento" options={OptionsTypeDocument} name="typeDocument" value={formData.typeDocument} event={handleChange} />
                            </div>
                            <div className="col-md-3">
                                <Inputs text="Número de Documento" name="numDocument" icon="fa-solid fa-address-card" value={formData.numDocument} event={handleChange} />
                            </div>
                            <div className="col-md-3">
                                <Inputs type="date" text="Fecha de Nacimiento" name="birthDate" icon="fa-solid fa-calendar-days" value={formData.birthDate} />
                            </div>
                            <div className="col-md-3">
                                <Select text="Género" name="sex" value={formData.sex} options={genero} event={handleChange} />
                            </div>
                            <div className="col-md-3">
                                <Select text="Estado civil" name="maritalStatus" value={formData.maritalStatus} options={maritalStatus} event={handleChange} />
                            </div>

                        </div>

                        <div className="text-center">
                            <h3>
                                <b>UBICACIÓN</b>
                            </h3>
                        </div>

                        <div className="row">
                            <div className="col-md-4"> {/* Departamento */}
                                <Select text="Departamento" options={OptionsDepto} name="departmentName" value={formData.departmentName} event={handleChange} />
                            </div>
                            <div className="col-md-4"> {/* Ciudad */}
                                <Select text="Ciudad" options={OptionsCities} name="cityName" value={formData.cityName} event={handleChange} />
                            </div>
                            <div className="col-md-4">
                                <Inputs text="Direccion" name="address" icon="fa-solid fa-map-pin" value={formData.address} event={handleChange} />
                            </div>
                        </div>

                        <div className="text-center">
                            <h3>
                                <b>CONTACTO</b>
                            </h3>
                        </div>

                        <div className="row">  {/* Contacto | telefono */}
                            {/* aun no estan para guararlo no actualizalo en el JSON */}
                            <div className='col-md-2'>
                                <Select text="Código País" name="codigoPais" options={codigoPaises} icon="fa-solid fa-earth-americas" value={formData} event={handleChange} />
                            </div>
                            <div className="col-md-4">
                                <Inputs text="Numero de telefono" name="phone" icon="fa-solid fa-phone-volume" value={formData.phone} event={handleChange} />
                            </div>
                            <div className="col-md-3">
                                <Inputs text="Usuario" name="username" icon="fa-solid fa-user" value={formData.username} event={handleChange} />
                            </div>
                            {/* aun no estan para guararlo no actualizalo en el JASON */}
                            <div className="col-md-3">
                                <Inputs text="Confirmar Usuario" name="confirmUsername" icon="fa-solid fa-user" value={formData.confirmUsername} event={handleChange} />
                            </div>
                            <div className="col-md-6">
                                <Inputs type="password" text="Nueva Contraseña" name="password" icon="fa-solid fa-lock" value={formData.password} event={handleChange} />
                            </div>
                            {/* aun no estan para guararlo no actualizalo en el JASON */}
                            <div className="col-md-6">
                                <Inputs type="password" text="Confirmar Contraseña" name="confirmPassword" icon="fa-solid fa-lock" value={formData.confirmPassword} event={handleChange} />
                            </div>
                        </div>

                        <div className="text-center">
                            <h3>
                                <b>INFORMACIÓN LABORAL</b>
                            </h3>
                        </div>

                        <div className="row">  {/* Rol */}
                            <div className="col-md-4">
                                <Select text="Empresa" options={OptionsCompanies} name="companyName" value={formData.companyName} event={handleChange} />
                            </div>
                            <div className="col-md-4">
                                <Select text="Rol" options={roles} name="roleListName" value={formData.roleRequest.roleListName[0]} event={handleChange} />
                            </div>
                            <div className="col-md-4">
                                <Select text="Estado" options={status} name="estado" value={formData.estado} event={handleChange} />
                            </div>
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

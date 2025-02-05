import { useParams } from 'react-router'
import '../../../../assets/css/customerStyles/moreDetailsStyle.css'
import { ControllerMoreDetails } from '../controllers/ControllerMoreDetails'
import { Link } from 'react-router-dom'
import { Grid } from '../../../animations/Grid'
import { Spinner } from '../../../animations/Spiner'
import { ModalforComponent } from '../../../components/ModalforComponent'
import { AddCustomer } from '../../agregar/AddCustomer'
import { useState } from 'react'

export const MoreDetails = ({ data = null }) => {
    let id, category, from

    if (data) {
        ({ id, category, from } = data)
    } else {
        ({ id, category } = useParams())
    }

    const { filterData, urlUpdateData, loading } = ControllerMoreDetails({ id, category, from })

    const [openCloseModal, setOpenCloseModal] = useState(false)

    const openModal = () => {
        setOpenCloseModal(true)
    }

    const closeModal = () => {
        setOpenCloseModal(false)
    }

    if (loading) {
        return (
            <div className="container">
                <Grid>
                    <Spinner />
                </Grid>
            </div>
        )
    }

    return (
        <>

            {filterData.map((item) => {
                let url = ''

                if (category === "crew") {
                    const url_typeEmployed = [
                        { url: "../add-crew/add-boat-driver", typeEmployed: "Motorista" },
                        { url: "../add-crew/add-sailor", typeEmployed: "Marinero" },
                        { url: "../add-crew/add-captain", typeEmployed: "Capitan" },
                    ]

                    const typeEmployed = item.employeeType.typeName
                    const urlFound = url_typeEmployed.find((type) => type.typeEmployed === typeEmployed)
                    url = urlFound ? urlFound.url : ''
                }

                return (

                    <div className="container mt-4 more-details-container" key={category === 'product' ? item.productId : item.id}>
                        <div className="row more-details-row">
                            {/* {!from && (<>
                                <h1 className='text-center mb-5 more-details-title'>
                                    Más detalles de {category === "vehicle" ? "la embarcación " : ""} <strong> {category === "vehicle" ? item.nombre : item.name + ' ' + item.lastName} </strong> <i className="fa-solid fa-eye ms-5"></i>
                                </h1>
                            </>)} */}

                            {category === "employee" && (
                                <>
                                    <h1 className='text-center mb-5 more-details-title'>
                                        Más detalles de <strong> {item.name + ' ' + item.lastName} </strong> <i className="fa-solid fa-eye ms-5"></i>
                                    </h1>

                                    <div className="col-md-12">
                                        <h3 className="subTitle">Información personal</h3>
                                        <div className="section">
                                            <div className="row">
                                                <div className="col-md-3">
                                                    <strong>Nombres:</strong> {item.name}
                                                </div>
                                                <div className="col-md-3">
                                                    <strong>Apellidos:</strong> {item.lastName}
                                                </div>
                                                <div className="col-md-3">
                                                    <strong>Tipo de documento:</strong> {item.typeDocument}
                                                </div>
                                                <div className="col-md-3">
                                                    <strong>Número de documento:</strong> {item.numDocument}
                                                </div>

                                                <p className="col-md-3">
                                                    <strong>Fecha de nacimiento:</strong> {item.birthDate}
                                                </p>
                                                <div className="col-md-3">
                                                    <strong>Estado civil:</strong> {item.maritalStatus}
                                                </div>

                                                <div className="col-md-3">
                                                    <strong>Correo electrónico:</strong>  {item.username}
                                                </div>
                                                <div className="col-md-3">
                                                    <strong>Teléfono:</strong> {item.phone}
                                                </div>
                                                <div className="col-md-3">
                                                    <strong>Dirección de residencia:</strong> {item.address}
                                                </div>
                                                <div className="col-md-3">
                                                    <strong>Género:</strong> {item.sex}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <h3 className="subTitle">Información de Ubicación</h3>
                                        <div className="section">
                                            <div className="row">
                                                {item.city && (
                                                    <>
                                                        <div className="col-md-6">
                                                            <strong>Ciudad de residencia:</strong> {item.city.ciudad}
                                                        </div>

                                                        <div className="col-md-6">
                                                            <strong>Departamento de residencia:</strong> {item.city.departamento.departamento}
                                                        </div>
                                                    </>
                                                )}
                                            </div>

                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <h3 className="subTitle">Información de Empresa</h3>
                                        <div className="section">
                                            <div className="row">

                                                <div className="col-md-3">
                                                    <p><strong>Estado de cuenta: </strong><b className={item.status === "activo" ? "text-success" : "text-danger"}>{item.status}</b></p>
                                                </div>
                                                <div className="col-md-3">
                                                    <p> <strong>Cargo en la empresa:</strong> <b className='text-warning'>{item.roles[0]?.roleEnum === "ADMIN"
                                                        ? "Administrador"
                                                        : (item.roles[0]?.roleEnum === "EMPLOYEE"
                                                            ? "Empleado"
                                                            : (item.roles[0]?.roleEnum === "SUPERADMIN"
                                                                ? "SuperAdministrador"
                                                                : ""))}</b></p>
                                                </div>
                                                <div className="col-md-3">
                                                    <strong>Empresa asociada:</strong> {item.company.name}
                                                </div>

                                                <div className="col-md-3">
                                                    <p> <strong>Estado de la empresa asociada:</strong><b className={item.company.status === "activo" ? "text-success" : "text-danger"}> {item.company.status}</b></p>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </>
                            )}

                            {category === "crew" && (
                                <>
                                    <h1 className='text-center mb-5 more-details-title'>
                                        Más detalles de <strong> {item.name + ' ' + item.lastName} </strong> <i className="fa-solid fa-eye ms-5"></i>
                                    </h1>

                                    <div className="col-md-12">
                                        <h3 className="subTitle">Información personal</h3>
                                        <div className="section">
                                            <div className="row">
                                                <div className="col-md-3">
                                                    <strong>Nombres:</strong> {item.name}
                                                </div>
                                                <div className="col-md-3">
                                                    <strong>Apellidos:</strong> {item.lastName}
                                                </div>
                                                <div className="col-md-3">
                                                    <strong>Tipo de documento:</strong> {item.typeDocument}
                                                </div>
                                                <div className="col-md-3">
                                                    <strong>Número de documento:</strong> {item.numDocument}
                                                </div>
                                                <div className="col-md-3">
                                                    <strong>Fecha de nacimiento:</strong> {item.dateOfBirth}
                                                </div>
                                                <div className="col-md-3">
                                                    <strong>Nacionalidad:</strong> {item.nationality}
                                                </div>
                                                <div className="col-md-3">
                                                    <strong>Número de licencia:</strong> {item.licencia}
                                                </div>
                                                <div className="col-md-3">
                                                    <strong>Expiración licencia:</strong> {item.expLicencia}
                                                </div>
                                                <div className="col-md-3">
                                                    <strong>Estado civil:</strong> {item.maritalStatus}
                                                </div>

                                                <div className="col-md-3">
                                                    <strong>Correo electrónico:</strong>  {item.email}
                                                </div>
                                                <div className="col-md-3">
                                                    <strong>Teléfono:</strong> {item.phone}
                                                </div>
                                                <div className="col-md-3">
                                                    <strong>Dirección de residencia:</strong> {item.address}
                                                </div>
                                                <div className="col-md-3">
                                                    <strong>Género:</strong> {item.sex}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <h3 className="subTitle">Información de Empresa</h3>
                                        <div className="section">
                                            <div className="row">
                                                <div className="col-md-3">
                                                    <p><strong>Estado de cuenta: </strong><b className={item.status === "activo" ? "text-success" : "text-danger"}>{item.status}</b></p>
                                                </div>
                                                <div className="col-md-3">
                                                    <strong>Empresa asociada:</strong> {item.companyName}
                                                </div>
                                                <div className="col-md-3">
                                                    <strong>Tipo de marinero:</strong> {item.employeeType.typeName}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}

                            {category === "vehicle" && (
                                <>
                                    <h1 className='text-center mb-5 more-details-title'>
                                        Más detalles de la embarcación<strong> {item.nombre} </strong> <i className="fa-solid fa-eye ms-5"></i>
                                    </h1>

                                    <div className="col-md-12">
                                        <h3 className="subTitle">Información personal</h3>
                                        <div className="section">
                                            <div className="row">
                                                <div className="col-md-3">
                                                    <strong>Nombre:</strong> {item.nombre}
                                                </div>
                                                <div className="col-md-3">
                                                    <strong>Tipo de vehiculo:</strong> {item.type}
                                                </div>
                                                <div className="col-md-3">
                                                    <strong>Model de vehiculo:</strong> {item.model}
                                                </div>
                                                <div className="col-md-3">
                                                    <strong>Matricual de vehiculo:</strong> {item.registration}
                                                </div>
                                                <div className="col-md-3">
                                                    <strong>Licencia del vehiculo:</strong> {item.licensePlate}
                                                </div>
                                                {/* <div className="col-md-3">
                                                    <strong>Expiración licencia:</strong> {item.fechaExpPatente}
                                                </div> */}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <h3 className="subTitle">Capaciades de carga</h3>
                                        <div className="section">
                                            <div className="row">
                                                <div className="col-md-3">
                                                    <p><strong>Capaciad de peso:</strong> {item.weightCapacity + ' ' + item.weightUnit} </p>
                                                </div>
                                                <div className="col-md-3">
                                                    <strong>Capacidad de volumen:</strong> {item.volumeCapacity + ' ' + item.volumeUnit}
                                                </div>
                                                <div className="col-md-3">
                                                    <strong>Capacidad de pasajeros:</strong> {item.passengers}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </>
                            )}

                            {category === "customer" && (
                                <>
                                    <h1 className='text-center mb-5 more-details-title'>
                                        Más detalles de <strong> {item.name + ' ' + item.lastName} </strong> <i className="fa-solid fa-eye ms-5"></i>
                                    </h1>

                                    <div className="col-md-12">
                                        <h3 className="subTitle">Información personal</h3>
                                        <div className="section">
                                            <div className="row">
                                                <div className="col-md-3">
                                                    <strong>Nombres:</strong> {item.name}
                                                </div>
                                                <div className="col-md-3">
                                                    <strong>Apellidos:</strong> {item.lastName}
                                                </div>
                                                <div className="col-md-3">
                                                    <strong>Tipo de documento:</strong> {item.typeDocument}
                                                </div>
                                                <div className="col-md-3">
                                                    <strong>Número de documento:</strong> {item.numDocument}
                                                </div>
                                                <div className="col-md-3">
                                                    <strong>Fecha de nacimiento:</strong> {item.dateOfBirth}
                                                </div>
                                                <div className="col-md-3">
                                                    <strong>Nacionalidad:</strong> {item.nationality}
                                                </div>
                                                <div className="col-md-3">
                                                    <strong>Estado civil:</strong> {item.maritalStatus}
                                                </div>
                                                <div className="col-md-3">
                                                    <strong>Correo electrónico:</strong>  {item.email}
                                                </div>
                                                <div className="col-md-3">
                                                    <strong>Teléfono:</strong> {item.phone}
                                                </div>
                                                <div className="col-md-3">
                                                    <strong>Dirección de residencia:</strong> {item.address}
                                                </div>
                                                <div className="col-md-3">
                                                    <strong>Género:</strong> {item.sex}
                                                </div>
                                                <div className="col-md-3">
                                                    <strong>Tipo de persona:</strong> {item.personType}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <h3 className="subTitle">Información de Ubicación</h3>
                                        <div className="section">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <strong>Ciudad de residencia:</strong> {item.cityName}
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <h3 className="subTitle">Información de Empresa</h3>
                                        <div className="section">
                                            <div className="row">
                                                {item.personType && (
                                                    item.personType === "Juridica" ? (
                                                        <>
                                                            <div className="col-md-4">
                                                                <strong>Nombre de la compañía:</strong> {item.companyName}
                                                            </div>
                                                            <div className="col-md-4">
                                                                <strong>NIT de la compañía:</strong> {item.nitCompany}
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <div className="col-md-4">No aplica (persona natural).</div>
                                                    )
                                                )}
                                                <div className="col-md-4">
                                                    <strong>Empresa asociada:</strong> {item.companyName}
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </>
                            )}


                            {/* <div className="col-md-12">
                                <h3 className="subTitle">Información {category === "vehicle" ? "de la embarcación" : "personal"}</h3>
                                <div className="section">
                                    <div className="row">
                                        <div className="col-md-3">
                                            <strong>Nombres:</strong> {category === "vehicle" ? item.nombre : item.name}
                                        </div>

                                        {category === "vehicle" && (
                                            <>
                                                <div className="col-md-3">
                                                    <p>Tipo de vehiculo {item.type}</p>
                                                </div>
                                                <div className="col-md-3">
                                                    <strong>Model de vehiculo:</strong> {item.model}
                                                </div>
                                                <div className="col-md-3">
                                                    <strong>Licencia del vehiculo:</strong> {item.licensePlate}
                                                </div>
                                                <div className="col-md-3">
                                                    <strong>Matricual de vehiculo:</strong> {item.registration}
                                                </div>
                                            </>
                                        )}

                                        {category !== "vehicle" && (
                                            <>
                                                <div className="col-md-3">
                                                    <strong>Apellidos:</strong> {item.lastName}
                                                </div>
                                                <div className="col-md-3">
                                                    <strong>Tipo de documento:</strong> {item.typeDocument}
                                                </div>
                                                <div className="col-md-3">
                                                    <strong>Número de documento:</strong> {item.numDocument}
                                                </div>

                                                {item.licencia && (
                                                    <>
                                                        <p className="col-md-3">
                                                            <strong>Número de licencia:</strong> {item.licencia}
                                                        </p>
                                                    </>
                                                )}

                                                <p className="col-md-3">
                                                    <strong>Fecha de nacimiento:</strong> {category === "customer" || category === "crew" ? item.dateOfBirth : (category === "employee" ? item.birthDate : "")}
                                                </p>
                                                {item.nationality && (
                                                    <>
                                                        <p className="col-md-3">
                                                            <strong>Nacionalidad:</strong> {item.nationality}
                                                        </p>
                                                    </>
                                                )}
                                                <div className="col-md-3">
                                                    <strong>Estado civil:</strong> {item.maritalStatus}
                                                </div>

                                                <div className="col-md-3">
                                                    <strong>Correo electrónico:</strong> {category === "customer" || category === "crew" ? item.email : (category === "employee" ? item.username : "")}
                                                </div>
                                                <div className="col-md-3">
                                                    <strong>Teléfono:</strong> {item.phone}
                                                </div>
                                                <div className="col-md-3">
                                                    <strong>Dirección de residencia:</strong> {item.address}
                                                </div>
                                                <div className="col-md-3">
                                                    <strong>Género:</strong> {item.sex}
                                                </div>
                                                {item.personType && (
                                                    <>
                                                        <div className="col-md-3">
                                                            <strong>Tipo de persona:</strong> {item.personType}
                                                        </div>
                                                    </>
                                                )}
                                            </>
                                        )}
                                    </div>

                                </div>
                            </div>

                            {category === "vehicle" && (
                                <div className="col-md-12">
                                    <h3 className="subTitle">Capaciades de carga</h3>
                                    <div className="section">
                                        <div className="row">
                                            <>
                                                <div className="col-md-3">
                                                    <p><strong>Capaciad de peso:</strong> {item.weightCapacity + '' + item.weightUnit} </p>
                                                </div>

                                                <div className="col-md-3">
                                                    <strong>Capacidad de volumen:</strong> {item.volumeCapacity + '' + item.volumeUnit}
                                                </div>

                                                <div className="col-md-3">
                                                    <strong>Capacidad de pasajeros:</strong> {item.passengerSpace}
                                                </div>
                                            </>



                                        </div>

                                    </div>
                                </div>
                            )}

                            {category !== "crew" && category !== "vehicle" && (
                                <>
                                    <div className="col-md-12">
                                        <h3 className="subTitle">Información de Ubicación</h3>
                                        <div className="section">
                                            <div className="row">

                                                {category === "customer" && (
                                                    <>
                                                        <div className="col-md-6">
                                                            <strong>Ciudad de residencia:</strong> {item.cityName}
                                                        </div>
                                                    </>
                                                )}

                                                {item.city && (
                                                    <>
                                                        <div className="col-md-6">
                                                            <strong>Ciudad de residencia:</strong> {item.city.ciudad}
                                                        </div>

                                                        <div className="col-md-6">
                                                            <strong>Departamento de residencia:</strong> {item.city.departamento.departamento}
                                                        </div>
                                                    </>
                                                )}

                                            </div>

                                        </div>
                                    </div>
                                </>
                            )}


                            {category !== "vehicle" && (
                                <>
                                    <div className="col-md-12">
                                        <h3 className="subTitle">Información de Empresa</h3>
                                        <div className="section">
                                            <div className="row">

                                                {item.personType && (
                                                    item.personType === "Juridica" ? (
                                                        <>
                                                            <div className="col-md-3">
                                                                <strong>Nombre de la compañía:</strong> {item.companyName}
                                                            </div>
                                                            <div className="col-md-3">
                                                                <strong>NIT de la compañía:</strong> {item.nitCompany}
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <div className="col-md-3">No aplica (persona natural).</div>
                                                    )
                                                )}

                                                {item.status && (
                                                    <>
                                                        <div className="col-md-3">
                                                            <p><strong>Estado de cuenta: </strong><b className={item.status === "activo" ? "text-success" : "text-danger"}>{item.status}</b></p>
                                                        </div>

                                                    </>
                                                )}

                                                {item.roles && (
                                                    <>
                                                        <div className="col-md-3">
                                                            <p> <strong>Cargo en la empresa:</strong> <b className='text-warning'>{item.roles[0]?.roleEnum === "ADMIN"
                                                                ? "Administrador"
                                                                : (item.roles[0]?.roleEnum === "EMPLOYEE"
                                                                    ? "Empleado"
                                                                    : (item.roles[0]?.roleEnum === "SUPERADMIN"
                                                                        ? "SuperAdministrador"
                                                                        : ""))}</b></p>
                                                        </div>
                                                    </>
                                                )}

                                                {item.company && (
                                                    <>
                                                        <div className="col-md-3">
                                                            <strong>Empresa asociada:</strong> {item.company.name}
                                                        </div>

                                                        <div className="col-md-3">
                                                            <p> <strong>Estado de la empresa asociada:</strong><b className={item.company.status === "activo" ? "text-success" : "text-danger"}> {item.company.status}</b></p>
                                                        </div>
                                                    </>
                                                )}

                                                {item.companyName && (
                                                    <>
                                                        <div className="col-md-3">
                                                            <strong>Empresa asociada:</strong> {item.companyName}
                                                        </div>
                                                    </>
                                                )}

                                                {category === "crew" && (
                                                    <>
                                                        <div className="col-md-3">
                                                            <strong>Tipo de merinero:</strong> {item.employeeType.typeName}
                                                        </div>
                                                    </>
                                                )}


                                            </div>

                                        </div>
                                    </div>
                                </>
                            )
                            } */}

                            {category === "product" && (
                                <>
                                    <h1 className='text-center mb-5 more-details-title'>
                                        Más detalles del Producto<i className="fa-solid fa-eye ms-5"></i>
                                    </h1>
                                    <div className="col-md-12">
                                        <h3 className="subTitle">Detalles del Producto</h3>
                                        <div className="section">
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <strong>Nombre del Producto:</strong> {item.productName}
                                                </div>
                                                <div className="col-md-6">
                                                    <strong>Categoría:</strong> {item.categoryName}
                                                </div>
                                                <div className="col-md-12">
                                                    <strong>Descripción:</strong> {item.description}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <h3 className="subTitle">Características del Producto</h3>
                                        <div className="section">
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <strong>Número de unidades:</strong> {item.number}
                                                </div>
                                                <div className="col-md-4">
                                                    <strong>Peso:</strong> {item.weight + ' ' + item.unitOfMeasurement}
                                                </div>
                                                <div className="col-md-4">
                                                    <strong>Dimenciones:</strong> {item.dimensions + " Cm"}
                                                </div>
                                                <div className="col-md-4">
                                                    <strong>Tipo de embalaje:</strong> {item.packagingType}
                                                </div>
                                                <div className="col-md-4">
                                                    <strong>¿Es Perecedero?:</strong> {item.isPerishable ? 'Si' : 'No'}
                                                </div>
                                                <div className="col-md-4">
                                                    <strong>¿Esta Asegurado?:</strong> {item.insured ? 'Si' : 'No'}
                                                </div>
                                                <div className="col-md-4">
                                                    <strong>¿Materiales Peligrosos?:</strong> {item.hazardousMaterials ? 'Si' : 'No'}
                                                </div>
                                                <div className="col-md-12">
                                                    <strong>Instrucciones de manejo especial:</strong> {item.specialHandlingInstructions}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <h3 className="subTitle">Compañia y Almacenamiento</h3>
                                        <div className="section">
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <strong>Nombre de la embarcación:</strong> {item.vehicleName || 'N/A'}
                                                </div>
                                                <div className="col-md-4">
                                                    <strong>Nombre de la compañía:</strong> {item.companyName}
                                                </div>
                                                <div className="col-md-4">
                                                    <strong>Documento del cliente:</strong> {item.customerNumDocument}
                                                </div>
                                                <div className="col-md-4">
                                                    <strong>Bodega:</strong> {item.warehouseName || 'N/A'}
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}

                            {category === "warehouse" && (
                                <>
                                    <h1 className='text-center mb-5 more-details-title'>
                                        Más detalles la Bodega <strong>{item.name}</strong> <i className="fa-solid fa-eye ms-5"></i>
                                    </h1>
                                    <div className="col-md-12">
                                        <h3 className="subTitle">Detalles de la Bodega</h3>
                                        <div className="section">
                                            <div className="row">
                                                <div className="col-md-5">
                                                    <strong>Nombre de la Bodega:</strong> {item.name}
                                                </div>
                                                <div className="col-md-3">
                                                    <strong>Ubicación:</strong> {item.location}
                                                </div>
                                                <div className="col-md-3">
                                                    <strong>Capacidad:</strong> {item.capacity + ' ' + item.unitOfMeasurement}
                                                </div>
                                                {/* <div className="col-md-3">
                                                    <strong>Unidad de Medida:</strong> {item.unitOfMeasurement}
                                                </div> */}
                                                <div className="col-md-12">
                                                    <strong>Descripción:</strong> {item.description}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}

                            {category === "branch" && (
                                <>
                                    <h1 className='text-center mb-5 more-details-title'>
                                        Más detalles la Sucursal <strong>{item.nombre}</strong><i className="fa-solid fa-eye ms-5"></i>
                                    </h1>
                                    <div className="col-md-12">
                                        <h3 className="subTitle">Detalles de la Sucursal</h3>
                                        <div className="section">
                                            <div className="row">
                                                <div className="col-md-5">
                                                    <strong>Nombre de la Sucursal:</strong> {item.nombre}
                                                </div>
                                                <div className="col-md-3">
                                                    <strong>Dirección:</strong> {item.direccion}
                                                </div>
                                                <div className="col-md-3">
                                                    <strong>Departamento:</strong> {item.departamento}
                                                </div>
                                                <div className="col-md-5">
                                                    <strong>Municipio:</strong> {item.municipio}
                                                </div>
                                                <div className="col-md-4">
                                                    <strong>Nombre de la compañia:</strong> {item.companiaNombre}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}

                            {category === "shipment" && ( 
                                <>
                                    <h1 className='text-center mb-5 more-details-title'>
                                        Más detalles del envío <strong> {item.numeroGuia} </strong> <i className="fa-solid fa-eye ms-5"></i>
                                    </h1>

                                    <div className="col-md-12">
                                        <h3 className="subTitle">Detalles del envío</h3>
                                        <div className="section">
                                            <div className="row">
                                                <div className="col-md-3">
                                                    <strong>Remitente:</strong> {item.remitenteCedula}
                                                </div>
                                                <div className="col-md-3">
                                                    <strong>Destinatario:</strong> {item.destinatarioCedula}
                                                </div>
                                                <div className="col-md-3">
                                                    <strong>Nombre de la compañia:</strong> {item.companiaNombre}
                                                </div>
                                                <div className="col-md-3">
                                                    <strong>Nombre de la embarcación:</strong> {item.vehiculoNombre}
                                                </div>
                                                <div className="col-md-3">
                                                    <strong>Nombre de la sucursal:</strong> {item.sucursalNombre}
                                                </div>
                                                <div className="col-md-3">
                                                    <strong>Descripción del envío:</strong> {item.descripcionEnvio}
                                                </div>
                                                <div className="col-md-3">
                                                    <strong>Estado de entrega:</strong> {item.estadoEntrega}
                                                </div>
                                                <div className="col-md-3">
                                                    <strong>Costo de envío:</strong> {item.costoEnvio}
                                                </div>
                                                <div className="col-md-3">
                                                    <strong>Tipo de pago:</strong> {item.tipoPago}
                                                </div>
                                                <div className="col-md-3">
                                                    <strong>Estado de pago:</strong> {item.estadoPago}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <h3 className="subTitle">Ubicación y Destino</h3>
                                        <div className="section">
                                            <div className="row">
                                                <div className="col-md-3">
                                                    <strong>Dirección de envío:</strong> {item.direccionEnvio}
                                                </div>
                                                <div className="col-md-3">
                                                    <strong>Departamento de salida:</strong> {item.departamentoSalida}
                                                </div>
                                                <div className="col-md-3">
                                                    <strong>Municipio de salida:</strong> {item.municipioSalida}
                                                </div>
                                                <div className="col-md-3">
                                                    <strong>Departamento de llegada:</strong> {item.departamentoLlegada}
                                                </div>
                                                <div className="col-md-3">
                                                    <strong>Municipio de llegada:</strong> {item.municipioLlegada}
                                                </div>
                                                <div className="col-md-3">
                                                    <strong>Nombre de la sucursal:</strong> {item.sucursalNombre}
                                                </div>
                                                <div className="col-md-3">
                                                    <strong>Dirección de envío:</strong> {item.direccionEnvio}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}


                            < div className="button-container" >

                                {!from && (
                                    <>
                                        <Link to={category === "customer" ? '../show-customers' : (category === "employee" ? '../show-users' : (category === "crew" ? "../show-crew" : (category === "vehicle" ? "../show-vehicles" : "")))}>
                                            <button className='more-details-btn more-details-btn-back'>
                                                Volver
                                            </button>
                                        </Link>
                                    </>
                                )}
                                {
                                    from && from == 'external' ? (
                                        <>
                                            <div>
                                                <button className='more-details-btn more-details-btn-edi' onClick={openModal}>Editar</button>
                                                {openCloseModal && (
                                                    <ModalforComponent
                                                        showModal={openCloseModal}
                                                        handleClose={closeModal}
                                                        BodyComponent={<AddCustomer dataOfUser={{ id, action: 'update' }} funcChangeState={setOpenCloseModal} />}
                                                    />
                                                )}
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <Link to={category === "crew" ? url + `/${item.id}/update` : urlUpdateData} state={{ from: 'listado' }}>
                                                <button className='more-details-btn more-details-btn-edit'>
                                                    <span> Editar información </span><i className="fa-solid fa-pen-to-square icon-option"></i>
                                                </button>
                                            </Link>
                                        </>
                                    )
                                }

                            </div >
                        </div >
                    </div >

                )

            })}
        </>
    )
}

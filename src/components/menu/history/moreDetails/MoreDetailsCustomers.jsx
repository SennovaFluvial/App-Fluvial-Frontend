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

                    <div className="container mt-4 more-details-container" key={item.id}>
                        <div className="row more-details-row">
                            {!from && (<>
                                <h1 className='text-center mb-5 more-details-title'>
                                    Más detalles de {category === "vehicle" ? "la embarcación " : ""} <strong> {category === "vehicle" ? item.nombre : item.name + ' ' + item.lastName} </strong> <i className="fa-solid fa-eye ms-5"></i>
                                </h1>
                            </>)}

                            <div className="col-md-12">
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
                            }
                            
                            {category === "product" && (
                                <div className="col-md-12">
                                    <h3 className="subTitle">Detalles del Producto</h3>
                                    <div className="section">
                                        <div className="row">
                                            <div className="col-md-3">
                                                <strong>Nombre del Producto:</strong> {item.name}
                                            </div>
                                            <div className="col-md-3">
                                                <strong>Precio:</strong> ${item.price}
                                            </div>
                                            <div className="col-md-3">
                                                <strong>Categoría:</strong> {item.category}
                                            </div>
                                            <div className="col-md-3">
                                                <strong>Stock:</strong> {item.stock}
                                            </div>
                                            <div className="col-md-12 mt-3">
                                                <strong>Descripción:</strong> {item.description}
                                            </div>
                                            {item.supplier && (
                                                <div className="col-md-3">
                                                    <strong>Proveedor:</strong> {item.supplier}
                                                </div>
                                            )}
                                            {item.warranty && (
                                                <div className="col-md-3">
                                                    <strong>Garantía:</strong> {item.warranty}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
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

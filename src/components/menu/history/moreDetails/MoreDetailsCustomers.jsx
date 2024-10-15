import { useParams } from 'react-router';
import '../../../../assets/css/customerStyles/moreDetailsStyle.css';
import { ControllerMoreDetails } from '../controllers/ControllerMoreDetails';
import { Link } from 'react-router-dom';

export const MoreDetails = () => {
    const { id, category } = useParams();
    const { filterData, urlUpdateData } = ControllerMoreDetails({ id, category });

    return (
        <>

            {filterData.map((item) => {
                let url = '';

                if (category === "crew") {
                    const url_typeEmployed = [
                        { url: "../add-crew/add-boat-driver", typeEmployed: "Motorista" },
                        { url: "../add-crew/add-sailor", typeEmployed: "Marinero" },
                        { url: "../add-crew/add-captain", typeEmployed: "Capitan" },
                    ];

                    const typeEmployed = item.employeeType.typeName;
                    const urlFound = url_typeEmployed.find((type) => type.typeEmployed === typeEmployed);
                    url = urlFound ? urlFound.url : '';
                }

                return (

                    <div className="container mt-4 more-details-container" key={item.id}>
                        <div className="row more-details-row">
                            <h1 className='text-center mb-5 more-details-title'>
                                Más detalles de {category === "vehicle" ? "la embarcación " : ""} <strong> {category === "vehicle" ? item.nombre : item.name + ' ' + item.lastName} </strong> <i className="fa-solid fa-eye ms-5"></i>
                            </h1>
                            <div className="col-md-6 mb-4 more-details-col">
                                <div className="card text-center shadow-sm more-details-card">
                                    <div className="card-body more-details-card-body">
                                        <h5 className="card-title text-uppercase more-details-section-title">Información  {category === "vehicle" ? "de la embarcación" : "personal"}</h5>
                                        <p className="more-details-text">
                                            <b>Nombres</b>: {category === "vehicle" ? item.nombre : item.name}
                                        </p>

                                        {category === "vehicle" && (
                                            <>
                                                <p className="more-details-text">
                                                    <b>Tipo de vehiculo</b>: {item.type}
                                                </p>
                                                <p className="more-details-text">
                                                    <b>Model de vehiculo</b>: {item.model}
                                                </p>
                                                <p className="more-details-text">
                                                    <b>Licencia del vehiculo</b>: {item.licensePlate}
                                                </p>
                                                <p className="more-details-text">
                                                    <b>Matricual de vehiculo</b>: {item.registration}
                                                </p>
                                            </>
                                        )}

                                        {category !== "vehicle" && (
                                            <>
                                                <p className="more-details-text">
                                                    <b>Apellidos</b>: {item.lastName}
                                                </p>
                                                <p className="more-details-text">
                                                    <b> Tipo de documento</b>: {item.typeDocument}
                                                </p>
                                                <p className="more-details-text">
                                                    <b>Número de documento</b>: {item.numDocument}
                                                </p>

                                                {item.licencia && (
                                                    <>
                                                        <p className="more-details-text">
                                                            <b>Número de licencia</b>: {item.licencia}
                                                        </p>
                                                    </>
                                                )}

                                                <p className="more-details-text">
                                                    <b>Fecha de nacimiento</b>: {category === "customer" || category === "crew" ? item.dateOfBirth : (category === "employee" ? item.birthDate : "")}
                                                </p>
                                                {item.nationality && (
                                                    <>
                                                        <p className="more-details-text">
                                                            <b>Nacionalidad</b>: {item.nationality}
                                                        </p>
                                                    </>
                                                )}
                                                <p className="more-details-text">
                                                    <b>Estado civil</b>: {item.maritalStatus}
                                                </p>
                                            </>
                                        )}

                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 mb-4 more-details-col">
                                <div className="card text-center shadow-sm more-details-card">
                                    <div className="card-body more-details-card-body">
                                        <h5 className="card-title text-uppercase more-details-section-title">{category === "vehicle" ? "Capaciades de carga" : "Información de contacto"}</h5>

                                        {category === "vehicle" && (
                                            <>
                                                <p className="more-details-text">
                                                    <b>Capaciad de peso</b>: {item.weightCapacity + '' + item.weightUnit}
                                                </p>

                                                <p className="more-details-text">
                                                    <b>Capacidad de volumen</b>: {item.volumeCapacity + '' + item.volumeUnit}
                                                </p>

                                                <p className="more-details-text">
                                                    <b>Capacidad de pasajeros</b>: {item.passengerSpace}
                                                </p>
                                            </>
                                        )}

                                        {category !== "vehicle" && (
                                            <>
                                                <p className="more-details-text">
                                                    <b>Correo electrónico</b>: {category === "customer" || category === "crew" ? item.email : (category === "employee" ? item.username : "")}
                                                </p>
                                                <p className="more-details-text">
                                                    <b>Teléfono</b>: {item.phone}
                                                </p>
                                                <p className="more-details-text">
                                                    <b>Dirección</b>: {item.address}
                                                </p>
                                                <p className="more-details-text">
                                                    <b>Género</b>: {item.sex}
                                                </p>
                                                {item.personType && (
                                                    <>
                                                        <p className="more-details-text">
                                                            <b>Tipo de persona</b>: {item.personType}
                                                        </p>
                                                    </>
                                                )}
                                            </>
                                        )}

                                    </div>
                                </div>
                            </div>

                            {category !== "crew" && category !== "vehicle" && (
                                <>
                                    <div className="col-md-6 mb-4 more-details-col">
                                        <div className="card text-center shadow-sm more-details-card">
                                            <div className="card-body more-details-card-body">
                                                <h5 className="card-title text-uppercase more-details-section-title">Información de ubicación</h5>

                                                {category === "customer" && (
                                                    <>
                                                        <p className="more-details-text">
                                                            <b>Ciudad de residencia</b>: {item.cityName}
                                                        </p>
                                                    </>
                                                )}

                                                {item.city && (
                                                    <>
                                                        <p className="more-details-text">
                                                            <b>Ciudad de residencia</b>: {item.city.ciudad}
                                                        </p>

                                                        <p className="more-details-text">
                                                            <b>Departamento de residencia</b>: {item.city.departamento.departamento}
                                                        </p>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}

                            {category !== "vehicle" && (
                                <>
                                    <div className="col-md-6 mb-4 more-details-col">
                                        <div className="card text-center shadow-sm more-details-card">
                                            <div className="card-body more-details-card-body">
                                                <h5 className="card-title text-uppercase more-details-section-title">Información de empresa</h5>
                                                {item.personType && (
                                                    item.personType === "Juridica" ? (
                                                        <>
                                                            <p className="more-details-text">
                                                                <b>Nombre de la compañía</b>: {item.companyName}
                                                            </p>
                                                            <p className="more-details-text">
                                                                <b>NIT de la compañía</b>: {item.nitCompany}
                                                            </p>
                                                        </>
                                                    ) : (
                                                        <p className="more-details-text">No aplica (persona natural).</p>
                                                    )
                                                )}

                                                {item.status && (
                                                    <>
                                                        <p className="more-details-text">
                                                            <b>Estado de cuenta</b>: <b className={item.status === "activo" ? "text-success" : "text-danger"}>{item.status}</b>
                                                        </p>

                                                    </>
                                                )}

                                                {item.roles && (
                                                    <>
                                                        <p className="more-details-text">
                                                            <b>Cargo en la empresa</b>: <b className='text-warning'>{item.roles[0]?.roleEnum === "ADMIN"
                                                                ? "Administrador"
                                                                : (item.roles[0]?.roleEnum === "EMPLOYEE"
                                                                    ? "Empleado"
                                                                    : (item.roles[0]?.roleEnum === "SUPERADMIN"
                                                                        ? "SuperAdministrador"
                                                                        : ""))}</b>
                                                        </p>
                                                    </>
                                                )}

                                                {item.company && (
                                                    <>
                                                        <p className="more-details-text">
                                                            <b>Empresa asociada</b>: {item.company.name}
                                                        </p>

                                                        <p className="more-details-text">
                                                            <b>Estado de la empresa asociada</b>:<b className={item.company.status === "activo" ? "text-success" : "text-danger"}> {item.company.status}</b>
                                                        </p>
                                                    </>
                                                )}

                                                {item.companyName && (
                                                    <>
                                                        <p className="more-details-text">
                                                            <b>Empresa asociada</b>: {item.companyName}
                                                        </p>
                                                    </>
                                                )}

                                                {category === "crew" && (
                                                    <>
                                                        <p className="more-details-text">
                                                            <b>Tipo de merinero</b>: {item.employeeType.typeName}
                                                        </p>
                                                    </>
                                                )}

                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}

                            <Link to={category === "customer" ? '../show-customers' : (category === "employee" ? '../show-users' : (category === "crew" ? "../show-crew" : (category === "vehicle" ? "../show-vehicles" : "")))}>
                                <button className='more-details-btn more-details-btn-back'>
                                    Volver
                                </button>
                            </Link>

                            <Link to={category === "crew" ? url + `/${item.id}/update` : urlUpdateData}>
                                <button className='more-details-btn more-details-btn-edit'>
                                    Editar información <i className="fa-solid fa-pen-to-square icon-option"></i>
                                </button>
                            </Link>
                        </div>
                    </div>
                )

            })}
        </>
    )
}

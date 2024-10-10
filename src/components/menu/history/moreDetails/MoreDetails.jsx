import { useParams } from 'react-router';
import '../../../../assets/css/customerStyles/moreDetailsStyle.css';
import { ControllerMoreDetails } from '../controllers/ControllerMoreDetails';
import { Link } from 'react-router-dom';

export const MoreDetails = () => {

    const { id } = useParams();

    const { filterData } = ControllerMoreDetails({ id });

    return (
        <>

            {filterData.map((item) => (
                <div className="container mt-4 more-details-container" key={item.id}>
                    <div className="row more-details-row">
                        <h1 className='text-center mb-5 more-details-title'>
                            Mas detalles de <strong>
                                {item.name}
                            </strong> </h1>
                        <div className="col-md-6 mb-4 more-details-col">
                            <div className="card text-center shadow-sm more-details-card">
                                <div className="card-body more-details-card-body">
                                    <h5 className="card-title text-uppercase more-details-section-title">Información personal</h5>
                                    <p className="more-details-text">
                                        Nombres: {item.name}
                                    </p>
                                    <p className="more-details-text">
                                        Apellidos: {item.lastName}
                                    </p>
                                    <p className="more-details-text">
                                        Tipo de documento: {item.typeDocument}
                                    </p>
                                    <p className="more-details-text">
                                        Número de documento: {item.numDocument}
                                    </p>
                                    <p className="more-details-text">
                                        Fecha de nacimiento: {item.email}
                                    </p>
                                    <p className="more-details-text">
                                        Nacionalidad: {item.dateOfBirth}
                                    </p>
                                    <p className="more-details-text">
                                        Estado civil: {item.nationality}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 mb-4 more-details-col">
                            <div className="card text-center shadow-sm more-details-card">
                                <div className="card-body more-details-card-body">
                                    <h5 className="card-title text-uppercase more-details-section-title">Información de contacto</h5>
                                    <p className="more-details-text">
                                        Correo electrónico: {item.maritalStatus}
                                    </p>
                                    <p className="more-details-text">
                                        Teléfono: {item.phone}
                                    </p>
                                    <p className="more-details-text">
                                        Dirección: {item.address}
                                    </p>
                                    <p className="more-details-text">
                                        Género: {item.sex}
                                    </p>
                                    <p className="more-details-text">
                                        Tipo de persona: {item.personType}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 mb-4 more-details-col">
                            <div className="card text-center shadow-sm more-details-card">
                                <div className="card-body more-details-card-body">
                                    <h5 className="card-title text-uppercase more-details-section-title">Información de ubicación</h5>
                                    <p className="more-details-text">
                                        Ciudad de residencia: {item.cityName}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 mb-4 more-details-col">
                            <div className="card text-center shadow-sm more-details-card">
                                <div className="card-body more-details-card-body">
                                    <h5 className="card-title text-uppercase more-details-section-title">Información de empresa</h5>
                                    {item.personType === "Juridica" ? (
                                        <>
                                            <p className="more-details-text">
                                                Nombre de la compañía: {item.companyName}
                                            </p>
                                            <p className="more-details-text">
                                                NIT de la compañía: {item.nitCompany}
                                            </p>
                                        </>
                                    ) : (
                                        <p className="more-details-text">No aplica (persona natural).</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <Link to={'../show-customers'}>
                            <button className='btn btn-primary more-details-btn'>
                                Volver
                            </button>
                        </Link>
                    </div>
                </div>
            ))
            }
        </>
    )
}

import React from 'react';
import '../../../assets/css/show/styles-Show.css';
import { Link } from 'react-router-dom';

export const ShowWarehouse = () => {
    return (
        <>
            <div className="container my-5">
                <div className="row text-center bg-success">
                    <div className="col-md-12 py-3">
                        <h1>
                            <b>LISTADO DE BODEGAS</b> <i className="fa-solid fa-warehouse ms-5"></i>
                        </h1>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-2 my-3 d-flex justify-content-end ms-auto">
                        <Link to="/adminSection/add-warehouse" state={{ from: 'listado' }}>
                            <button className='btn btn-primary rounded-pill p-2 ps-2'>
                                <i className="fa-regular fa-square-plus me-3"></i> Nueva Bodega
                            </button>
                        </Link>
                    </div>
                    <div className="col-md-2 my-3 d-flex justify-content-end ms-2">
                        <button className='btn btn-warning rounded-pill p-2 ps-2'>
                            <i className="fa-solid fa-print me-3"></i> Imprimir Informe
                        </button>
                    </div>
                </div>

                <table className="table table-hover border table-striped my-5">
                    <thead>
                        <tr>
                            <th scope="col">Nombre de la Bodega</th>
                            <th scope="col">Ubicación</th>
                            <th scope="col">Capacidad</th>
                            <th scope="col">Tipo de Bodega</th>
                            <th scope="col">Estado</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Aquí puedes mapear la lista de bodegas desde tu estado o props */}
                        <tr>
                            <td>Bodega Central</td>
                            <td>Calle Principal 123</td>
                            <td>1000 m³</td>
                            <td>Climatizada</td>
                            <td>Activa</td>
                            <td>
                                <Link to={`#`}>
                                    <button className='btn icon-link-hover ms-3 text-primary'>
                                        <i className="fa-solid fa-pen-to-square icon-option"></i>
                                    </button>
                                </Link>
                                <button className='btn icon-link-hover ms-3 text-warning'>
                                    <i className="fa-solid fa-eye icon-option"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
};

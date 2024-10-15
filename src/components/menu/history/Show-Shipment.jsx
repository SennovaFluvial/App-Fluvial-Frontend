import React from 'react'
import '../../../assets/css/show/styles-Show.css';
import { Link } from 'react-router-dom'

export const ShowShipment = () => {
    return (
        <>
            <div className="container my-5">
                <div className="row text-center bg-success">
                    <div className="col-md-12 py-3">
                        <h1>
                            <b>LISTADO DE ENVíOS</b> <i className="fa-solid fa-box ms-5"></i>
                        </h1>
                    </div>
                </div>

                <div className="row">

                    <div className="col-md-2 my-3 d-flex justify-content-end ms-auto">
                        <Link to={"/adminSection/register-shipment"}>
                            <button className='btn btn-primary rounded-pill p-2 ps-2'>
                                <i className="fa-regular fa-square-plus me-3"></i>Nuevo Producto
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
                            <th scope="col">Categoría</th>
                            <th scope="col">Nombre del Producto</th>
                            <th scope="col">Peso</th>
                            <th scope="col">Unidad de Medida</th>
                            <th scope="col">Dimenciones</th>
                            <th scope="col">Tipo de embalaje</th>
                            <th scope="col">Es Perecebero</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>

                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
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
    )
}

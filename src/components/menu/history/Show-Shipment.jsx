import React from 'react'
import '../../../assets/css/show/styles-Show.css';
import { Link } from 'react-router-dom'

export const ShowShipment = () => {
  return (
      <>
          <div className="container my-5">
              <div className="row text-center bg-info">
                  <div className="col-md-12 py-3">
                      <h1>
                          <b>LISTADO DE ENVíOS</b> <i className="fa-solid fa-box ms-5"></i>
                      </h1>
                  </div>
              </div>

              <div className="row">

                  <div className="col-md-2 my-3 d-flex justify-content-end ms-auto">
                      <Link to={"/adminSection/register-shipment"} state={{ from: 'listado' }}>
                          <button className='btn btn-primary rounded-pill p-2 ps-2'>
                              <i className="fa-regular fa-square-plus me-3"></i>Nuevo Envio
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
                          <th scope="col"></th>
                          <th scope="col"></th>
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
                                  <button className='btn btn-edit icon-link-hover text-primary'>
                                      <i className="fa-solid fa-pen-to-square icon-option"></i>
                                  </button>
                              </Link>

                          </td>

                          <td>
                              <Link to={`#`}>
                                  <button className='btn btn-view icon-link-hover text-warning'>
                                      <i className="fa-solid fa-eye icon-option"></i>
                                  </button>
                              </Link>
                          </td>
                      </tr>


                  </tbody>
              </table>
          </div>

      </>
  )
}

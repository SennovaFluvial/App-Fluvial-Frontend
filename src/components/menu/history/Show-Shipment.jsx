import '../../../assets/css/show/styles-Show.css'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { CancelButton } from '../../components/BackButton'
import { ControllerShowShipment } from './controllers/shipments/ControllerShowShipment'
import { Grid } from '../../animations/Grid'
import { Spinner } from '../../animations/Spiner'
import { Pagination } from './Pagination'
import { Select } from '../../html components/Selects'
import { usePaymentStatuses } from '../update/options/arrays'

export const ShowShipment = () => {

    const {
        searchTerm,
        handleSearchChange,
        paginatedItems,
        elementForPage,
        currentPage,
        setCurrentPage,
        totalFilteredItems,
        loading,
        firstIndex,
        handleChange,
        selectFilterData,
        selectOptionsByFilter,
        valueToFilter,
        changePaymentStatus,
        changeArrivalStatus,
        showSelect,
        formData,
        handeChange,
        setShowSelect,
        name_fields_shipment
    } = ControllerShowShipment()


    const location = useLocation()
    const from = location.state?.from || 'menu'

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
            <div className="container my-5">
                <div className="row text-center bg-info" style={{ marginLeft: "0px", marginRight: "0px" }}>
                    <div className="col-md-12 py-3">
                        <h1>
                            <b>LISTADO DE ENVíOS</b> <i className="fa-solid fa-box ms-5"></i>
                        </h1>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4 my-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Buscar..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>

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

                    <div className="row d-flex ms-1">
                        <div className="col-md-4 text-center mt-4 py-3 border rounded shadow-sm">
                            <span className="d-block fw-bold mb-2">Filtrar por</span>
                            <div className="row g-2">
                                <div className="col-md-12 ms-1">
                                    <select
                                        className="form-select form-select-sm"
                                        onChange={handleChange}
                                        name="filter_data_to"
                                        value={selectFilterData.filter_data_to}
                                    >
                                        <option value="">Mostrar todos</option>
                                        <option value="tipoPago">Tipo de pago</option>
                                        <option value="estadoPago">Estado de pago</option>
                                        <option value="estadoEntrega">Estado de entrega</option>
                                    </select>
                                </div>
                                {selectOptionsByFilter.length > 0 && (
                                    <div className="col-md-12 ms-2">
                                        <Select
                                            text="Seleccione"
                                            name="valueToFilter"
                                            value={valueToFilter}
                                            options={selectOptionsByFilter}
                                            event={handleChange}
                                            className="form-select form-select-sm"
                                        />
                                    </div>
                                )}

                            </div>
                        </div>
                        {showSelect.modalPaymentStatus && (
                            <>
                                <div className="col-md-4 text-center mt-4 py-3 border rounded shadow-sm ms-2">
                                    <div className="row align-items-center">
                                        <div className="col-md-10">
                                            <Select
                                                text="Eliga el nuevo estado de pago"
                                                name="estadoPago"
                                                value={formData.estadoPago}
                                                options={usePaymentStatuses}
                                                event={handeChange}
                                            />
                                        </div>
                                        <div className="col-md-1 d-flex align-items-center">
                                            <button
                                                onClick={() => setShowSelect(prevState => ({ ...prevState, modalPaymentStatus: "" }))}
                                                className="btn ms-1">
                                                <i className="fa-solid fa-circle-xmark text-danger"></i>
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </>
                        )}
                        {showSelect.modalDeliveryStatus && (
                            <>
                                <div className='col-md-4 text-center mt-4 py-3 border rounded shadow-sm ms-2'>
                                    <div className="row align-items-center">
                                        <div className="col-md-10">
                                            <Select
                                                text="Cambiar estado de entrega"
                                                name="estadoEntrega"
                                            />
                                        </div>
                                        <div className="col-md-1 d-flex align-items-center">
                                            <button
                                                onClick={() => setShowSelect(prevState => ({ ...prevState, modalPaymentStatus: "" }))}
                                                className="btn ms-1">
                                                <i className="fa-solid fa-circle-xmark text-danger"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <table className="table table-hover border table-striped my-5">
                    <thead>
                        <tr>
                            <th scope="col">Numero de registro</th>
                            <th scope="col">N. Guia</th>
                            <th scope="col">Remitente</th>
                            <th scope="col">Destinatrio</th>
                            <th scope="col">Vehiculo</th>
                            <th scope="col">Dirección</th>
                            <th scope="col">Dirección de salida</th>
                            <th scope="col">Dirección de llegada</th>
                            <th scope="col">Costo de envio</th>

                            <th scope="col">Tipo de pago </th>
                            <th scope="col">Estado de pago </th>
                            <th scope="col">Estado de entrega </th>

                            <th scope="col">Actualizar</th>
                            <th scope="col">Detalles</th>
                        </tr>
                    </thead>
                    <tbody>

                        {paginatedItems.length > 0 ? (
                            paginatedItems.map((item, index) => (
                                <tr key={item.id}>
                                    <td>
                                        <b>{firstIndex + index + 1}</b>
                                    </td>
                                    <th>{item.numeroGuia}</th>
                                    <td>{item.remitenteCedula}</td>
                                    <td>{item.destinatarioCedula}</td>
                                    <td>{item.vehiculoNombre}</td>
                                    <td>{item.direccionEnvio}</td>
                                    <td>{item.departamentoSalida} - {item.municipioSalida}</td>
                                    <td>{item.departamentoLlegada} - {item.municipioLlegada}</td>
                                    <td>{item.costoEnvio}</td>

                                    <th>
                                        {name_fields_shipment.tipoPago[item.tipoPago] || item.tipoPago}
                                    </th>
                                    <th>
                                        {name_fields_shipment.estadoPago[item.estadoPago] || item.estadoPago}
                                        <button
                                            onClick={() => changePaymentStatus(item.id)}
                                            className='btn btn-customer-change'
                                        >
                                            <i className="fa-solid fa-pencil"></i>
                                        </button>
                                    </th>
                                    <th>
                                        {name_fields_shipment.estadoEntrega[item.estadoEntrega] || item.estadoEntrega}
                                        <button
                                            onClick={() => changeArrivalStatus(item.id)}
                                            className='btn btn-customer-change'
                                        >
                                            <i className="fa-solid fa-pencil"></i>
                                        </button>
                                    </th>

                                    <td>
                                        <Link to={`../register-shipment/${item.id}/update`} state={{ from: 'listado' }}>
                                            <button className='btn btn-edit icon-link-hover text-primary'>
                                                <i className="fa-solid fa-pen-to-square icon-option"></i>
                                            </button>
                                        </Link>
                                    </td>
                                    <td>
                                        <Link to={`more-details/${item.id}/shipment`}>
                                            <button className='btn btn-view icon-link-hover text-warning'>
                                                <i className="fa-solid fa-eye icon-option"></i>
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="14" className="text-center">No hay resultados que mostrar</td>
                            </tr>
                        )}

                    </tbody>
                </table>




                <div className="d-flex w-100">
                    <div className="d-flex justify-content-start w-25">
                        <CancelButton
                            from={from}
                        />
                    </div>
                    <div className="d-flex justify-content-center w-50">
                        <Pagination
                            elementForPage={elementForPage}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            totalElements={totalFilteredItems}
                        />
                    </div>
                    <div className="w-25"></div> {/* Columna vacía para balancear el espacio */}
                </div>
            </div>

        </>
    )
}

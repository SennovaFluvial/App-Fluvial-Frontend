import { useEffect, useState } from 'react';
import '../../../assets/css/show/styles-Show.css';
import { Link, useNavigate } from 'react-router-dom';
import { Spinner } from '../../animations/Spiner';
import { Grid } from '../../animations/Grid';
import { Pagination } from './Pagination';
import { useControllerShowWarehouse } from './controllers/inventories/ControllerShowWarehouse';
import { VerifyUserChangePassword } from '../agregar/controllers/VerifyUserChangePassword';
import { ModalRequestPassword } from '../agregar/ModalRequestPassword';
import { useLocation } from 'react-router-dom';
import { CancelButton } from '../../components/BackButton';

export const ShowWarehouse = () => {

    const nav = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const {
        searchTerm,
        handleSearchChange,
        paginatedItems,
        elementForPage,
        currentPage,
        setCurrentPage,
        totalFilteredItems,
        loading,
        firstIndex
    } = useControllerShowWarehouse();

    const { updatePassword,
        handleChangeVerify,
        errorsFormsVerify,
        handleSubmitVerify,
        formLogin,
        userName,
        setUpdatePassword } = VerifyUserChangePassword();

    const handleChangeShowModal = () => {
        setShowModal(!showModal);
    }
    const handleCloseModal = () => {
        setShowModal(false);
    }

    const onStatusChange = () => {
        handleChangeShowModal()
        return;
    };

    useEffect(() => {
        if (updatePassword) {
            nav('/adminSection/add-warehouse', { state: { from: 'listado' } });
            setUpdatePassword(false);
        }
    }, [updatePassword])

    const location = useLocation();
    const from = location.state?.from || 'menu';

    if (loading) {
        return (
            <div className="container">
                <Grid>
                    <Spinner />
                </Grid>
            </div>
        );
    }

    return (
        <>
            <div className="container my-5">
                <div className="row text-center bg-info"  style={{ marginLeft: "0px", marginRight: "0px" }}>
                    <div className="col-md-12 py-3">
                        <h1>
                            <b>LISTADO DE BODEGAS</b> <i className="fa-solid fa-warehouse ms-5"></i>
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
                        <button className='btn btn-primary rounded-pill p-2 ps-2' onClick={onStatusChange}>
                            <i className="fa-regular fa-square-plus me-3"></i> Nueva Bodega
                        </button>
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
                            <th scope="col">Numero de registro</th>
                            <th scope="col">Nombre de la Bodega</th>
                            <th scope="col">Ubicación</th>
                            <th scope="col">Capacidad</th>
                            <th scope="col">Unidad de medida</th>
                            <th scope="col">Actualizar</th>
                            <th scope="col">Detalles</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedItems.length > 0 ? (
                            paginatedItems.map((item, index) => (
                                <tr key={index}>
                                    <td><b>{firstIndex + index + 1}</b></td>
                                    <td>{item.name}</td>
                                    <td>{item.location}</td>
                                    <td>{item.capacity}</td>
                                    <td>{item.unitOfMeasurement}</td>
                                    <td>
                                        <Link to={`../add-warehouse/${item.id}/update`} state={{ from: 'listado' }}>
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
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center">No hay resultados que mostrar</td>
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


            {showModal && (
                <ModalRequestPassword
                    userNameUser={userName}
                    showModal={showModal}
                    handleClose={handleCloseModal}
                    handleChangeVerify={handleChangeVerify}
                    errorsFormsVerify={errorsFormsVerify}
                    handleSubmitVerify={handleSubmitVerify}
                    formLogin={formLogin}
                />)}

        </>
    );
};

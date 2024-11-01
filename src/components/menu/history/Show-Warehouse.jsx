import { useEffect, useState } from 'react';
import '../../../assets/css/show/styles-Show.css';
import { Link, useNavigate } from 'react-router-dom';
import { Spinner } from '../../animations/Spiner';
import { Grid } from '../../animations/Grid';
import { Pagination } from './Pagination';
import { useControllerShowWarehouse } from './controllers/inventories/ControllerShowWarehouse';
import { VerifyUserChangePassword } from '../agregar/controllers/VerifyUserChangePassword';
import { ModalRequestPassword } from '../agregar/ModalRequestPassword';

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
                <div className="row text-center bg-info">
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
                            <th scope="col">Estado</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
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
                                    <td>{item.warehouseType}</td>
                                    <td>{item.status}</td>
                                    <td>
                                        <Link to={`../add-warehouse/${item.id}/update`}>
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

                <Pagination
                    elementForPage={elementForPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalElements={totalFilteredItems}
                />
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
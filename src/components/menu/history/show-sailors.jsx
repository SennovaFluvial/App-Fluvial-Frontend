import '../../../assets/css/show/styles-Show.css';
import { Spinner } from '../../animations/Spiner';
import { Grid } from '../../animations/Grid';
import { Link } from 'react-router-dom';
import { Pagination } from './Pagination.jsx';
import { useControllerShowSailors } from './controllers/ControllerShowSailors.jsx';
import { useChangeStatusFields } from './search/ChangeStatusFields.jsx';
import { useEffect, useState } from 'react';
import { VerifyUserChangePassword } from '../agregar/controllers/VerifyUserChangePassword.jsx';
import { ModalRequestPassword } from '../agregar/ModalRequestPassword.jsx';
import { useLocation } from 'react-router-dom';
import { CancelButton } from '../../components/BackButton';

export const ShowCrew = () => {
    const [showModal, setShowModal] = useState(false);
    const [itemId, setItemId] = useState("");

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
        formData,
        setFormData,
        setCrew
    } = useControllerShowSailors();

    const { handleStatusChange } = useChangeStatusFields({
        id_item: itemId,
        urlApiGet: `/api/v1/employeefluvial/all`,
        urlApiPut: `/api/v1/employeefluvial/update/`,
        formData: formData,
        setFormData,
        statusField: "status"
    });

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

    const onStatusChange = (id) => {
        setItemId(id);
        handleChangeShowModal()
        return;
    };

    useEffect(() => {
        if (updatePassword && itemId) {
            handleStatusChange(itemId).then(() => {

                const updatedItems = paginatedItems.map(item => {
                    if (item.id === itemId) {
                        return {
                            ...item,
                            status: item.status === "activo" ? "inactivo" : "activo"
                        };
                    }
                    return item;
                });
                setCrew(updatedItems);
                setUpdatePassword(false);
            });
        }
    }, [updatePassword, itemId]);

    const location = useLocation();
    const from = location.state?.from || 'menu';

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
                <div className="row text-center bg-info"  style={{ marginLeft: "0px", marginRight: "0px" }}>
                    <div className="col-md-12 py-3">
                        <h1> <b>LISTADO DE TRIPULACIÓN</b> <i className="fa-solid fa-anchor ms-5"></i></h1>
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
                        <Link to={"/adminSection/add-crew"} state={{ from: 'listado' }}>
                            <button className='btn btn-primary rounded-pill p-2 ps-2'>
                                <i className="fa-regular fa-square-plus me-3"></i>Nuevo Tripulante
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
                            <th scope="col">Número</th>
                            <th scope="col">Nombre Completo</th>
                            <th scope="col">Número de documento</th>
                            <th scope="col">Teléfono</th>
                            <th scope="col">Origen</th>
                            <th scope="col">Categoría</th>
                            <th scope="col">Estado</th>
                            <th scope="col">Actualizar</th>
                            <th scope="col">Detalles</th>
                            <th scope="col">Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedItems.length > 0 ? (
                            paginatedItems.map((item, index) => {
                                const url_typeEmployed = [
                                    { url: "../add-crew/add-boat-driver", typeEmployed: "Motorista" },
                                    { url: "../add-crew/add-sailor", typeEmployed: "Marinero" },
                                    { url: "../add-crew/add-captain", typeEmployed: "Capitan" },
                                ];

                                const typeEmployed = item.employeeType.typeName;
                                const urlFound = url_typeEmployed.find((type) => type.typeEmployed === typeEmployed);
                                const url = urlFound ? urlFound.url : '';

                                return (
                                    <tr key={item.id}>
                                        <td>{firstIndex + index + 1}</td>
                                        <td>{item.name + ' ' + item.lastName}</td>
                                        <td>{item.numDocument}</td>
                                        <td>{item.phone}</td>
                                        <td>{item.nationality}</td>
                                        <td>{item.employeeType.typeName}</td>
                                        <td className={item.status === "activo" ? "text-success" : "text-danger"}>
                                            <b>{item.status}</b>
                                        </td>
                                        <td>
                                            <Link to={url + `/${item.id}/update`} state={{ from: 'listado' }}>
                                                <button className='btn btn-edit icon-link-hover text-primary'>
                                                    <i className="fa-solid fa-pen-to-square icon-option"></i>
                                                </button>
                                            </Link>
                                        </td>
                                        <td>
                                            <Link to={`more-details/${item.id}/crew`}>
                                                <button className='btn btn-view icon-link-hover text-warning'>
                                                    <i className="fa-solid fa-eye icon-option"></i>
                                                </button>
                                            </Link>
                                        </td>
                                        <td>
                                            <button className='btn btn-toggle' onClick={() => onStatusChange(item.id)}>
                                                {item.status === "activo"
                                                    ? <i className="fa-solid fa-toggle-on text-success"></i>
                                                    : <i className="fa-solid fa-toggle-off text-danger"></i>}
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="10" className="text-center">No hay resultados que mostrar</td>
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
    )
}
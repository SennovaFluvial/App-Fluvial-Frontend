import React, { useEffect, useState } from 'react'
import '../../../assets/css/show/styles-Show.css'
import { Link, useNavigate } from 'react-router-dom'
import { Spinner } from '../../animations/Spiner'
import { Grid } from '../../animations/Grid'
import { VerifyUserChangePassword } from '../agregar/controllers/VerifyUserChangePassword'
import { ModalRequestPassword } from '../agregar/ModalRequestPassword'
import { useLocation } from 'react-router-dom'
import { CancelButton } from '../../components/BackButton'
import { Pagination } from './Pagination'
import { useControllerShowBranches } from './controllers/Branch/ControllerShowBranch'

export const ShowBranch = () => {

    const [modalState, setModalState] = useState({
        showModal: false,
        isUpdate: false,
        selectedId: null,
    })

    const nav = useNavigate()

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
    } = useControllerShowBranches()


    const { updatePassword,
        handleChangeVerify,
        errorsFormsVerify,
        handleSubmitVerify,
        formLogin,
        userName,
        setUpdatePassword } = VerifyUserChangePassword()

    const toggleModal = (isUpdate = null, id = null) => {
        setModalState({
            showModal: !modalState.showModal,
            isUpdate,
            selectedId: id,
        })
    }

    const closeModal = () => {
        setModalState((prevState) => ({
            ...prevState,
            showModal: false,
        }))
    }

    useEffect(() => {
        if (updatePassword) {
            const url = modalState.isUpdate === null
                ? '/adminSection/add-branch'
                : modalState.isUpdate
                    ? `../add-branch/${modalState.selectedId}/update`
                    : '/adminSection/add-branch';

            nav(url, { state: { from: 'listado' } })
            setUpdatePassword(false)
        }
    }, [updatePassword, modalState])

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
                            <b>LISTADO DE SUCURSALES</b> <i className="fa-solid fa-building ms-5"></i>
                        </h1>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4 my-3">
                        <input type="text" className="form-control" placeholder="Buscar..." value={searchTerm} onChange={handleSearchChange} />
                    </div>
                    <div className="col-md-2 my-3 d-flex justify-content-end ms-auto">
                        <button
                            className='btn btn-primary rounded-pill p-2 ps-2'
                            onClick={() => toggleModal(null, null)}
                        >
                            <i className="fa-regular fa-square-plus me-3"></i> Nueva Sucursal
                        </button>
                    </div>
                    <div className="col-md-2 my-3 d-flex justify-content-end ms-2">
                        <button
                            className='btn btn-warning rounded-pill p-2 ps-2'
                        >
                            <i className="fa-solid fa-print me-3"></i> Imprimir Informe
                        </button>
                    </div>
                </div>

                <table className="table table-hover border table-striped my-5">
                    <thead>
                        <tr>
                            <th scope="col">Numero de registro</th>
                            <th scope="col">Nombre de la Sucursal</th>
                            <th scope="col">Dirección</th>
                            <th scope="col">Departamento</th>
                            <th scope="col">Municipio</th>
                            <th scope="col">Compañía</th>
                            <th scope="col">Actualizar</th>
                            <th scope="col">Detalles</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedItems.length > 0 ? (
                            paginatedItems.map((item, index) => (
                                <tr key={item.id}>
                                    <td><b>{firstIndex + index + 1}</b></td>
                                    <td>{item.nombre}</td>
                                    <td>{item.direccion}</td>
                                    <td>{item.departamento}</td>
                                    <td>{item.municipio}</td>
                                    <td>{item.companiaNombre}</td>
                                    <td>
                                        <button
                                            onClick={() => toggleModal(true, item.id)}
                                            className='btn btn-edit icon-link-hover text-primary'
                                        >
                                            <i className="fa-solid fa-pen-to-square icon-option"></i>
                                        </button>
                                    </td>

                                    <td>
                                        <Link to={`more-details/${item.id}/branch`}>
                                            <button className='btn btn-view icon-link-hover text-warning'>
                                                <i className="fa-solid fa-eye icon-option"></i>
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="11" className="text-center">No hay resultados que mostrar</td>
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

            {modalState.showModal && (
                <ModalRequestPassword
                    userNameUser={userName}
                    showModal={modalState.showModal}
                    handleClose={closeModal}
                    handleChangeVerify={handleChangeVerify}
                    errorsFormsVerify={errorsFormsVerify}
                    handleSubmitVerify={handleSubmitVerify}
                    formLogin={formLogin}
                />
            )}

        </>
    )
}

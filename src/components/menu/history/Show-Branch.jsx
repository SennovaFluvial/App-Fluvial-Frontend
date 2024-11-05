import React, { useEffect, useState } from 'react'
import '../../../assets/css/show/styles-Show.css';
import { Link, useNavigate } from 'react-router-dom';
import { VerifyUserChangePassword } from '../agregar/controllers/VerifyUserChangePassword';
import { ModalRequestPassword } from '../agregar/ModalRequestPassword';

export const ShowBranch = () => {

    const nav = useNavigate();
    const [showModal, setShowModal] = useState(false);

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
            nav('/adminSection/add-branch', { state: { from: 'listado' } });
            setUpdatePassword(false);
        }
    }, [updatePassword])

    return (
        <>
            <div className="container my-5">
                <div className="row text-center bg-info">
                    <div className="col-md-12 py-3">
                        <h1>
                            <b>LISTADO DE SUCURSALES</b> <i className="fa-solid fa-building ms-5"></i>
                        </h1>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-2 my-3 d-flex justify-content-end ms-auto">
                        <button className='btn btn-primary rounded-pill p-2 ps-2' onClick={onStatusChange}>
                            <i className="fa-regular fa-square-plus me-3"></i> Nueva Sucursal
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
                            <th scope="col">Nombre de la Sucursal</th>
                            <th scope="col">Dirección de residencia</th>
                            <th scope="col">Departamento</th>
                            <th scope="col">Municipio</th>
                            <th scope="col">Compañía</th>
                            <th scope="col">Estado</th>
                            <th scope="col">Actualizar</th>
                            <th scope="col">Detalles</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Sucursal Principal</td>
                            <td>Calle Secundaria 456</td>
                            <td>Guaviare</td>
                            <td>San José del Guaviare</td>
                            <td>Compañía XYZ</td>
                            <td>Activa</td>
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

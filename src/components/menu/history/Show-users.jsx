import '../../../assets/css/show/styles-Show.css'
import { Link } from 'react-router-dom';
import { Spinner } from '../../animations/Spiner';
import { Grid } from '../../animations/Grid';
import { Pagination } from './Pagination';
import { useControllerShowUsers } from './controllers/ControllerShowUsers';
import { useChangeStatusFields } from './search/ChangeStatusFields';
import { useEffect, useState } from 'react';
import { VerifyUserChangePassword } from '../agregar/controllers/VerifyUserChangePassword';
import { ModalRequestPassword } from '../agregar/ModalRequestPassword';


export const ShowUsers = () => {

    const [showModal, setShowModal] = useState(false);
    const [itemId, setItemId] = useState("")
    const {
        searchTerm,
        handleSearchChange,
        paginatedItems,
        setEmployed,
        elementForPage,
        currentPage,
        setCurrentPage,
        totalFilteredItems,
        loading,
        firstIndex,
        formData,
        setFormData
    } = useControllerShowUsers();

    let dataToSend = { ...formData };

    // Elimina los campos innecesarios
    delete dataToSend.confirmUsername;
    delete dataToSend.password;
    delete dataToSend.confirmPassword;
    delete dataToSend.codigoPais;

    const { handleStatusChange } = useChangeStatusFields({
        id_item: itemId,
        urlApiGet: `/api/v1/companie/users`,
        urlApiPut: `/auth/update-nopass/`,
        formData: dataToSend,
        setFormData,
        statusField: "estado"
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
                setEmployed(updatedItems);
                setUpdatePassword(false);
            });
        }
    }, [updatePassword, itemId]);


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
                <div className="row text-center bg-success">
                    <div className="col-md-12 py-3">
                        <h1> <b>LISTADO DE EMPLEADOS</b> <i className="fa-solid fa-address-card ms-5"></i></h1>
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
                        <Link to={"/adminSection/add-employed"}>
                            <button className='btn btn-primary rounded-pill p-2 ps-2'>
                                <i className="fa-regular fa-square-plus me-3"></i>Nuevo Empleado
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
                            <th scope="col">Número de Documento</th>
                            <th scope="col">Nombre Completo</th>
                            <th scope="col">Cargo</th>
                            <th scope="col">Fecha de Nacimiento</th>
                            <th scope="col">Genero</th>
                            <th scope="col">Correo Electronico</th>
                            <th scope="col">Dirección</th>
                            <th scope="col">Estado</th>
                            <th scope="col">Empresa</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedItems.length > 0 ? (
                            paginatedItems.map((item, index) => (
                                <tr key={item.id}>
                                    <td><b>{firstIndex + index + 1}</b></td>
                                    <td>{item.numDocument}</td>
                                    <td>{item.name + ' ' + item.lastName}</td>
                                    <td>
                                        <b>
                                            {item.roles[0]?.roleEnum === "ADMIN"
                                                ? "Administrador"
                                                : item.roles[0]?.roleEnum === "EMPLOYEE"
                                                    ? "Empleado"
                                                    : item.roles[0]?.roleEnum === "SUPERADMIN"
                                                        ? "SuperAdministrador"
                                                        : ""}
                                        </b>
                                    </td>
                                    <td>{item.birthDate}</td>
                                    <td>{item.sex}</td>
                                    <td>{item.username}</td>
                                    <td>{item.address}</td>
                                    <td className={item.status === "activo" ? "text-success" : "text-danger"}>
                                        <b>{item.status}</b>
                                    </td>
                                    <td>{item.company?.name}</td>
                                    <td>  <Link to={`../add-employed/${item.id}?action=update`}>
                                        <button className='btn btn-edit icon-link-hover text-primary'>
                                            <i className="fa-solid fa-pen-to-square icon-option"></i>
                                        </button>
                                    </Link></td>
                                    <td>  <Link to={`more-details/${item.id}/employee`}>
                                        <button className='btn btn-view icon-link-hover text-warning'>
                                            <i className="fa-solid fa-eye icon-option"></i>
                                        </button>
                                    </Link></td>
                                    <td>
                                        <button className='btn btn-toggle' onClick={() => onStatusChange(item.id)}>
                                            {item.status === "activo"
                                                ? <i className="fa-solid fa-toggle-on text-success"></i>
                                                : <i className="fa-solid fa-toggle-off text-danger"></i>}
                                        </button>
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
    )
}

import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { VerifyUserChangePassword } from './agregar/controllers/VerifyUserChangePassword';
import { ModalRequestPassword } from './agregar/ModalRequestPassword';

export const Inventories = () => {

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
            nav('add-warehouse', { state: { from: 'menu' } });
            setUpdatePassword(false);
        }
    }, [updatePassword])

    return (
        <>
            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                <li className="nav-item dropdown section-account-part2">
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Inventario
                    </a>
                    <ul className="dropdown-menu menu-account">
                        <>
                            <li className='dropdown-item text-black'>
                                <Link to={'show-products'}>
                                    <i className="fa-solid fa-box"></i> Listado de Productos
                                </Link>
                            </li>

                            <li className='dropdown-item text-black'>
                                <Link to={'add-product'} state={{ from: 'menu' }}>
                                    <i className="fa-solid fa-circle-plus"></i> Creación de Productos
                                </Link>
                            </li>

                            <li className='dropdown-item text-black'>
                                <Link to={'show-warehouse'}>
                                    <i className="fa-solid fa-warehouse"></i> Listado de Bodegas
                                </Link>
                            </li>

                            <button className='btn' onClick={onStatusChange}>
                                <li className='dropdown-item text-black'>
                                    <i className="fa-solid fa-circle-plus"></i> Creación de Bodegas
                                </li>
                            </button>
                        </>
                    </ul >
                </li >
            </ul >

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

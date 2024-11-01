import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { VerifyUserChangePassword } from './agregar/controllers/VerifyUserChangePassword';
import { ModalRequestPassword } from './agregar/ModalRequestPassword';

export const BranchSection = () => {

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
            nav('add-branch', { state: { from: 'menu' } });
            setUpdatePassword(false);
        }
    }, [updatePassword])

    return (
        <>
            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                <li className="nav-item dropdown section-account-part2">
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Sucursales
                    </a>
                    <ul className="dropdown-menu menu-account">
                        <>
                            <li className='dropdown-item text-black'>
                                <Link to={'show-branch'}>
                                    <i className="fa-solid fa-box"></i> Listado de Sucursales
                                </Link>
                            </li>

                            <button className='btn' onClick={onStatusChange}>
                                <li className='dropdown-item text-black'>
                                <i className="fa-solid fa-circle-plus"></i> Creación de Sucursales
                                </li>
                            </button>

                        </>
                    </ul>
                </li>
            </ul>

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

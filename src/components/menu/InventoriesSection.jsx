import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { VerifyUserChangePassword } from './agregar/controllers/VerifyUserChangePassword';
import { ModalRequestPassword } from './agregar/ModalRequestPassword';

export const Inventories = ({ isCollapsed }) => {
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
                        <i className="fas fa-boxes"></i>
                        {!isCollapsed && <span className="menu-text"> Inventario</span>}
                    </a>
                    <ul className="dropdown-menu menu-account">
                        <li className='dropdown-item text-black'>
                            <Link to={'show-products'}>
                                <i className="fa-solid fa-box"></i> {isCollapsed ? '' : 'Listado de Productos'}
                            </Link>
                        </li>
                        <li className='dropdown-item text-black'>
                            <Link to={'add-product'} state={{ from: 'menu' }}>
                                <i className="fa-solid fa-circle-plus"></i> {isCollapsed ? '' : 'Creación de Productos'}
                            </Link>
                        </li>
                        <li className='dropdown-item text-black'>
                            <Link to={'show-warehouse'}>
                                <i className="fa-solid fa-warehouse"></i> {isCollapsed ? '' : 'Listado de Bodegas'}
                            </Link>
                        </li>
                        <button className='btn' onClick={onStatusChange}>
                            <li className='dropdown-item text-black'>
                                <i className="fa-solid fa-circle-plus"></i> {isCollapsed ? '' : 'Creación de Bodegas'}
                            </li>
                        </button>
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

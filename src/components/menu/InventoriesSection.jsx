import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { VerifyUserChangePassword } from './agregar/controllers/VerifyUserChangePassword';
import { ModalRequestPassword } from './agregar/ModalRequestPassword';
import styles from '../../assets/css/section.module.css';

export const Inventories = ({ isCollapsed }) => {
    const nav = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

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

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <>
            <div className={styles.Section}>
                <ul className={styles.navbarNav}>
                    <li className={styles.sectionAccountPart2}>
                        <button onClick={() => { toggleMenu(); console.log(`Menu toggled, isOpen: ${!isOpen}`); }} className={styles.navLink} aria-haspopup="true" aria-expanded={isOpen} >
                            <i className={`fas fa-boxes ${isCollapsed ? styles.iconCentered : ''}`} style={{ marginRight: isCollapsed ? '0' : '8px' }}></i>
                            {!isCollapsed && <span className="menu-text"> Inventario</span>}
                        </button>
                        <ul className={styles.menuAccount} style={{ display: isOpen ? 'block' : 'none' }} >
                            <li className={styles.dropdownItem}>
                                <Link to={'show-products'} className={styles.link} onClick={closeMenu}>
                                    <i className="fa-solid fa-box"></i> Listado de Productos
                                </Link>
                            </li>
                            <li className='dropdown-item text-black'>
                                <Link to={'add-product'} state={{ from: 'menu' }} className={styles.link} onClick={closeMenu}>
                                    <i className="fa-solid fa-circle-plus me-2"></i>Creación de Productos
                                </Link>
                            </li>
                            <li className='dropdown-item text-black'>
                                <Link to={'show-warehouse'} className={styles.link} onClick={closeMenu}>
                                    <i className="fa-solid fa-warehouse me-2"></i>Listado de Bodegas
                                </Link>
                            </li>
                            <li className={styles.dropdownItem}>
                                <button onClick={onStatusChange} className={styles.buttonLink}>
                                    <i className="fa-solid fa-circle-plus me-2"></i>Creación de Bodegas
                                </button>
                            </li>
                        </ul>
                    </li>
                </ul>
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

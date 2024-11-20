import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { VerifyUserChangePassword } from './agregar/controllers/VerifyUserChangePassword'
import { ModalRequestPassword } from './agregar/ModalRequestPassword'
import styles from '../../assets/css/section.module.css'

export const BranchSection = ({ isCollapsed }) => {

    const nav = useNavigate()
    const [showModal, setShowModal] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    const { updatePassword,
        handleChangeVerify,
        errorsFormsVerify,
        handleSubmitVerify,
        formLogin,
        userName,
        setUpdatePassword } = VerifyUserChangePassword()

    const handleChangeShowModal = () => {
        setShowModal(!showModal)
    }
    const handleCloseModal = () => {
        setShowModal(false)
    }

    const onStatusChange = () => {
        handleChangeShowModal()
        return
    }

    useEffect(() => {
        if (updatePassword) {
            nav('add-branch', { state: { from: 'menu' } })
            setUpdatePassword(false)
        }
    }, [updatePassword])

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    const closeMenu = () => {
        setIsOpen(false)
    }

    return (
        <>
            <div className={styles.Section}>
                <ul className={styles.navbarNav}>
                    <li className={styles.sectionAccountPart2}>
                        <button onClick={() => { toggleMenu(); console.log(`Menu toggled, isOpen: ${!isOpen}`) }} className={styles.navLink} aria-haspopup="true" aria-expanded={isOpen} >
                            <i className={`fas fa-map-marked-alt me-2${isCollapsed ? styles.iconCentered : ''}`}></i>
                            {!isCollapsed && <span className="menu-text"> Sucursales</span>}
                        </button>
                        <ul className={styles.menuAccount} style={{ display: isOpen ? 'block' : 'none' }} >
                            <li className={styles.dropdownItem}>
                                <Link to={'show-branch'} className={styles.link} onClick={closeMenu}>
                                    <i className="fa-solid fa-box"></i> Listado de Sucursales
                                </Link>
                            </li>

                            <li className={styles.dropdownItem}>
                                <button onClick={onStatusChange} className={styles.buttonLink}>
                                    <i className="fa-solid fa-circle-plus me-2"></i> Creación de Sucursales
                                </button>
                            </li>

                        </ul>
                    </li>
                </ul >
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
                />)
            }

        </>
    )
}

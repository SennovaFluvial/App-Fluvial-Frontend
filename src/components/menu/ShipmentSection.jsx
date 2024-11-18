import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from '../../assets/css/section.module.css';

export const ShipmentSection = ({ isCollapsed }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <div className={styles.Section}>
            <ul className={styles.navbarNav}>
                <li className={styles.sectionAccountPart2}>
                    <button onClick={toggleMenu} className={styles.navLink} aria-haspopup="false" aria-expanded={!isOpen}>
                        <i className={`fas fa-dolly me-2${isCollapsed ? styles.iconCentered : ''}`}></i>
                        {!isCollapsed && <span className="menu-text"> Envíos</span>}
                    </button>
                    {isOpen && (
                        <ul className={styles.menuAccount}>
                            <li className={styles.dropdownItem}>
                                <Link to={'show-shipment'} className={styles.link} onClick={closeMenu}>
                                    <i className="fa-solid fa-box me-2"></i>Listado de Enviós
                                </Link>
                            </li>

                            <li className={styles.dropdownItem}>
                                <Link to={'register-shipment'} state={{ from: 'menu' }} className={styles.link} onClick={closeMenu}>
                                    <i className="fa-solid fa-circle-plus me-2"></i> Creación de Enviós
                                </Link>
                            </li>
                        </ul>
                    )}
                </li>
            </ul>
        </div>
    )
}

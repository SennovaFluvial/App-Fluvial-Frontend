import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../assets/css/section.module.css';

export const CustomerSection = ({ isCollapsed }) => {
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
                    <button onClick={() => { toggleMenu(); console.log(`Menu toggled, isOpen: ${!isOpen}`); }} className={styles.navLink} aria-haspopup="true" aria-expanded={isOpen} >
                        <i className={`fa-solid fa-users ${isCollapsed ? styles.iconCentered : ''}`} style={{ marginRight: isCollapsed ? '0' : '8px' }}></i>
                        {!isCollapsed && <span className="menu-text"> Clientes</span>}
                    </button>
                    <ul className={styles.menuAccount} style={{ display: isOpen ? 'block' : 'none' }} >
                        <li className={styles.dropdownItem}>
                            <Link to={'show-customers'} className={styles.link} onClick={closeMenu}>
                                <i className="fa-solid fa-users me-2"></i>Listado de Clientes
                            </Link>
                        </li>

                        <li className={styles.dropdownItem}>
                            <Link to={'add-customer'} state={{ from: 'menu' }} className={styles.link} onClick={closeMenu}>
                                <i className="fa-solid fa-circle-plus me-2"></i>Creación de Clientes
                            </Link>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    )
}

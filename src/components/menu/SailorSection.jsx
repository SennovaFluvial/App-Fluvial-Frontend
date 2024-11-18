import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from '../../assets/css/section.module.css';

export const SailorSection = ({ isCollapsed }) => {
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
                        <i className={`fas fa-life-ring me-2${isCollapsed ? styles.iconCentered : ''}`}></i>
                        {!isCollapsed && <span className="menu-text"> Tripulantes</span>}
                    </button>
                    {isOpen && (
                        <ul className={styles.menuAccount}>
                            <li className={styles.dropdownItem}>
                                <Link to={'show-crew'} className={styles.link} onClick={closeMenu}>
                                    <i className="fa-solid fa-person-military-pointing me-2"></i>Listado de Tripulantes
                                </Link>
                            </li>

                            <li className={styles.dropdownItem}>
                                <Link to={'add-crew'} state={{ from: 'menu' }} className={styles.link} onClick={closeMenu}>
                                    <i className="fa-solid fa-circle-plus me-2"></i>Creación de Tripulantes
                                </Link>
                            </li>
                        </ul>
                    )}
                </li>
            </ul>
        </div>
    )
}

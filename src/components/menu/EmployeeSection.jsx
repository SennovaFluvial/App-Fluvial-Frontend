import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../assets/css/section.module.css';

export const EmployeeSection = ({ isCollapsed }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={styles.Section}>
            <ul className={styles.navbarNav}>
                <li className={styles.sectionAccountPart2}>
                    <button onClick={toggleMenu} className={styles.navLink} aria-haspopup="false" aria-expanded={!isOpen}>
                        <i className={`fas fa-user ${isCollapsed ? styles.iconCentered : ''}`}></i> 
                        {!isCollapsed && <span className="menu-text"> Empleados</span>}
                    </button>
                    {isOpen && (
                        <ul className={styles.menuAccount}>
                            <li className={styles.dropdownItem}>
                                <Link to={'show-users'} className={styles.link}>
                                    <i className="fa-solid fa-address-book"></i> Listado de Empleados
                                </Link>
                            </li>

                            <li className={styles.dropdownItem}>
                                <Link to={'add-employed'} state={{ from: 'menu' }} className={styles.link}>
                                    <i className="fa-solid fa-circle-plus"></i> Creación de Empleados
                                </Link>
                            </li>
                        </ul>
                    )}
                </li>
            </ul>
        </div>
    );
};

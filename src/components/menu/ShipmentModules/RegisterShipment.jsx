import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import styles from '../../../assets/css/shipment/RegisterShipment.module.css'; // Importar el módulo CSS

export const RegisterShipment = () => {
    const location = useLocation();

    return (
        <>
            <nav className={styles.nav}>
                <ul className={styles.steps}>
                    <li className={`${styles.step} ${location.pathname.includes('module-Sender') ? styles.activeStep : ''}`}>
                        Datos Remitente {location.pathname.includes('module-Sender') && <i className={styles.iconUser}></i>}
                    </li>
                    <li className={`${styles.step} ${location.pathname.includes('module-recipient') ? styles.activeStep : ''}`}>
                        Datos Destinatario {location.pathname.includes('module-recipient') && <i className={styles.iconUser}></i>}
                    </li>
                    <li className={`${styles.step} ${location.pathname.includes('module-shipment') ? styles.activeStep : ''}`}>
                        Datos Envío {location.pathname.includes('module-shipment') && <i className={styles.iconShipment}></i>}
                    </li>
                    <li className={`${styles.step} ${location.pathname.includes('module-vehicle') ? styles.activeStep : ''}`}>
                        Datos Embarcación {location.pathname.includes('module-vehicle') && <i className={styles.iconShip}></i>}
                    </li>
                    <li className={`${styles.step} ${location.pathname.includes('module-finish') ? styles.activeStep : ''}`}>
                        Envío Finalizado {location.pathname.includes('module-finish') && <i className={styles.iconCheck}></i>}
                    </li>
                </ul>
            </nav>
            <Outlet />
        </>
    )
}

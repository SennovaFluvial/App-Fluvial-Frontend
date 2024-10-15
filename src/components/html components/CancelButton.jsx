import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from '../../assets/css/Forms.module.css'

export const CancelButton = ({ redirectPath, defaultPath = '/adminSection' }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleCancel = () => {
        if (redirectPath && location.pathname === redirectPath) {
            navigate(redirectPath);
        } else {
            navigate(defaultPath);
        }
    };

    return (
        <button type="button" className={styles.cancelar} onClick={handleCancel}>
            Cancelar
        </button>
    );
};

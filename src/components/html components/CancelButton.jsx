import React from 'react';
import { useHistory } from 'react-router-dom';

export const CancelButton = ({ redirectPath }) => {
    const history = useHistory();

    const handleCancel = () => {
        history.push(redirectPath);
    };

    return (
        <button type="button" className="btn btn-secondary" onClick={handleCancel}>
            Cancelar
        </button>
    )
}

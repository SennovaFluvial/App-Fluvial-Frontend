import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Select } from '../../html components/Selects.jsx';
import { Inputs } from '../../html components/Inputs.jsx';
import styles from '../../../assets/css/Forms.module.css';
import { weightUnits } from '../update/options/arrays.jsx';

export const AddWarehouse = () => {
    
    const location = useLocation();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        location: '',
        capacity: '',
        unitOfMeasurement: '',
        description: '',
        companyName: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };


    const from = location.state?.from || 'menu';

    const handleCancel = () => {
        if (from === 'menu') {
            navigate('/adminSection');
        }

        if (from === 'listado' ) {
            navigate('../show-warehouse');
        }
    };

    return (
        <>
        <div className={styles.card}>
            <div className={styles.container}>
                <h2 className={styles.title}>CREAR BODEGA</h2>
                <form>
                    <div className={styles.h3}>
                        <h3><b>INFORMACIÓN DE LA BODEGA</b></h3>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <Inputs text="Nombre de la Bodega" name="name" value={formData.name} onChange={handleChange} />

                        </div>
                        <div className="col-md-6">
                            <Inputs text="Ubicación" name="location" value={formData.location} onChange={handleChange} />

                        </div>
                        <div className="col-md-6    ">
                            <Inputs text="Capacidad" name="capacity" value={formData.capacity} onChange={handleChange} />

                        </div>
                        <div className="col-md-6">
                            <Select text="Unidad de Medida" name="unitOfMeasurement" options={weightUnits} value={formData.unitOfMeasurement} onChange={handleChange} />
                        </div>
                        <div className="col-md-12">
                            <Inputs text="Descripción" name="description" value={formData.description} onChange={handleChange} />
                        </div>
                        <div className="col-md-4">
                            <Inputs text="Nombre de la Empresa" name="companyName" value={formData.companyName} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="text-center">
                        <button type="button" className={styles.cancelar} onClick={handleCancel}>Cancelar</button>
                        <button type="submit" className={styles.guardar + " ms-2"}>Crear Bodega <i className="fa-solid fa-warehouse"></i></button>
                    </div>
                </form>
            </div>
        </div>
        </>
    );
};

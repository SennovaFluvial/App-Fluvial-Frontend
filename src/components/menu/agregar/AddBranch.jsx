import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Select } from '../../html components/Selects.jsx';
import { Inputs } from '../../html components/Inputs.jsx';
import styles from '../../../assets/css/Forms.module.css';
import { useOptionsDepto,useOptionsCities } from '../../menu/update/options/arrays.jsx';

export const AddBranch = () => {

    const cities = useOptionsCities();
    const deptos = useOptionsDepto();

    const location = useLocation();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nombre: '',
        direccion: '',
        departamento: '',
        municipio: '',
        companiaNombre: ''
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
        } else {
            navigate('../show-branch');
        }
    };

    return (
        <>
            <div className={styles.card}>
                <div className={styles.container}>
                    <h2 className={styles.title}>CREAR SUCURSAL</h2>
                    <form>
                        <div className={styles.h3}>
                            <h3><b>INFORMACIÓN DE LA SUCURSAL</b></h3>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <Inputs text="Nombre de la Sucursal" name="nombre" value={formData.nombre}onChange={handleChange} />
                            </div>
                            <div className="col-md-6">
                                <Inputs text="Dirección" name="direccion" value={formData.direccion} onChange={handleChange} />
                            </div>
                            <div className="col-md-6">
                                <Select text="Departamento" name="departamento" option={deptos}  value={formData.departamento} onChange={handleChange}/>
                            </div>
                            <div className="col-md-6">
                                <Select text="Municipio" name="municipio" option={cities} value={formData.municipio} onChange={handleChange} />
                            </div>
                            <div className="col-md-6">
                                <Inputs text="Nombre de la Compañía" name="companiaNombre" value={formData.companiaNombre} onChange={handleChange} />
                            </div>
                        </div>

                        <div className="text-center">
                            <button type="button" className={styles.cancelar} onClick={handleCancel}>
                                Cancelar
                            </button>
                            <button type="submit" className={`${styles.guardar} ms-2`}>
                                Crear Sucursal <i className="fa-solid fa-building"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

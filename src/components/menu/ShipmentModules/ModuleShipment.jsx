import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Select } from '../../html components/Selects.jsx';
import { Inputs } from '../../html components/Inputs.jsx'
import { useOptionsCities, useOptionsDepto, maritalStatus, typeCargo, weightUnits, Booleano } from '../update/options/arrays.jsx';

import styles from '../../../assets/css/shipment/shipment.module.css'

export const ModuleShipment = () => {

    const cities = useOptionsCities();
    const deptos = useOptionsDepto();

    const navigate = useNavigate();

    const handleNext = () => {
        navigate('/adminSection/register-shipment/module-finish');
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <>
            <div className={styles.tarjeta}>
                <div className={styles.contenedor}>
                    <h2 className={styles.tittle}>DATOS DE ENVíO</h2>
                    <form>
                        <div className="row">

                            <div className="col-md-4">
                                <Select text="Ruta" name="#" />
                            </div>

                            <div className="col-md-4">
                                <Inputs text="Dirección de residencia" name="#" />
                            </div>


                            <div className="col-md-4">
                                <Inputs type="date" text="Fecha de salida/envío" name="#" />
                            </div>

                            <div className="col-md-4">
                                <Inputs type="date" text="Fecha de llegada" name="#" icon="fa-solid fa-calendar-days" />
                            </div>

                            <div className="col-md-4">
                                <Select text="Departamento de salida" options={deptos} name="hazardousMaterials" />
                            </div>  


                            <div className="col-md-4">
                                <Select text="Municipio de salida" options={cities} name="hazardousMaterials" />
                            </div> 

                            <div className="col-md-4">
                                <Select text="Departamento de llegada" options={deptos} name="hazardousMaterials" />
                            </div>

                            <div className="col-md-4">
                                <Select text="Municipio de llegada" options={cities} name="hazardousMaterials" />
                            </div>


                            <div className="col-md-4">
                                <Select text="Tipo de pago" name="#" />
                            </div>

                            <div className="col-md-4">
                                <Select text="Estado de pago" name="#" />
                            </div>

                            <div className="col-md-4">
                                <Inputs type="number" text="Costo de envío" name="#" />
                            </div>

                            <div className="col-md-12">
                                <Inputs text="Descripción del envío" name="#" />
                            </div>

                        </div>

                    </form>

                    <div className={styles.fila}>
                        <div className="col-md-auto">
                            <button className={styles.cancelar} onClick={handleBack}>
                                Atrás
                            </button>
                        </div>

                        <div className="col-md-auto">
                            <button className={styles.siguiente} onClick={handleNext}>
                                Siguiente
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
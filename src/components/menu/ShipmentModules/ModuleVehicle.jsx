import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Inputs } from '../../html components/Inputs.jsx'
import { Select } from '../../html components/Selects.jsx';
import { typeVehicle, weightUnits } from '../update/options/arrays.jsx';

typeVehicle
import styles from '../../../assets/css/shipment/shipment.module.css'
import '../../../assets/css/success.css'

export const ModuleVehicle = () => {

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
                    <h2 className={styles.tittle}>DATOS DE EMBARCACIÓN</h2>
                    <form>
                        <div className="row">
                            <div className="col-md-4">
                                <Inputs text="Nombre de la Embarcación" name="#" />
                            </div>

                            <div className="col-md-4">
                                <Select text="Tipo" options={typeVehicle} name="type" />
                            </div>

                            <div className="col-md-4">
                                <Inputs text="Modelo" name="model" />
                            </div>


                            <div className="col-md-4">
                                <Inputs text="Matrícula" name="licensePlate" icon="fa-solid fa-address-card" />
                            </div>

                            <div className="col-md-4">
                                <Inputs text="Registro" name="registration" icon="fa-solid fa-address-card" />
                            </div>

                            <div className="col-md-4">
                                <Inputs text="Capacidad de Peso" name="weightCapacity" icon="fa-solid fa-weight-hanging" />
                            </div>


                            <div className="col-md-4">
                                <Select text="Unidad de Peso" name="weightUnit" options={weightUnits} />
                            </div>

                            <div className="col-md-4">
                                <Inputs text="Capacidad de Volumen" name="volumeCapacity" icon="fa-solid fa-box" />
                            </div>

                            <div className="col-md-4">
                                <Select text="Unidad de Volumen" name="weightUnit" options={weightUnits} />
                            </div>


                            <div className="col-md-4">
                                <Select text="Nombre del Capitán" name="#" />
                            </div>

                            <div className="col-md-4">
                                <Select text="Nombre del Marinero" name="#" />
                            </div>
                            <div className="col-md-4">
                                <Select text="Nombre del Motorista" name="#" />
                            </div>

                            <div className="col-md-4">
                                <Inputs text="Capacidad Restante" name="#" />
                            </div>

                        </div>


                    </form>

                    <div className="row d-flex justify-content-center">
                        <div className="col-md-auto">
                            <button className="cancelar" onClick={handleBack}>
                                Atrás
                            </button>
                        </div>

                        <div className="col-md-auto" onClick={handleNext}>
                            <button className="siguiente">
                                Siguiente
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

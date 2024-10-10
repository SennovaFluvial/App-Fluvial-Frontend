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
        navigate('/adminSection/register-shipment/module-vehicle');
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
                                <Select text="Tipo de carga" options={typeCargo} name="#" />
                            </div>

                            <div className="col-md-4">
                                <Select text="Producto/Carga" options={typeCargo} name="#" />
                            </div>

                            <div className="col-md-4">
                                <Inputs type="number" text="Peso" name="weigh" />
                            </div>


                            <div className="col-md-4">
                                <Select text="Unidad de medida" options={weightUnits} name="UnitOfunitOfMeasurement" />
                            </div>

                            <div className="col-md-4">
                                <Inputs type="number" text="Altura/Alto" name="height" />
                            </div>

                            <div className="col-md-4">
                                <Inputs type="number" text="Longitud/Largo" name="length" />
                            </div>


                            <div className="col-md-4">
                                <Inputs type="number" text="Ancho" name="width" />
                            </div>

                            <div className="col-md-4">
                                <Inputs type="number" text="Dimenciones/Volumen" name="dimensions" />
                            </div>

                            <div className="col-md-4">
                                <Select text="Tipo de empaquetado/Embalaje" options={maritalStatus} name="packagingType" />
                            </div>


                            <div className="col-md-4">
                                <Select text="Es perecebero" options={Booleano} name="isPerishable" />
                            </div>

                            <div className="col-md-4">
                                <Select text="Asegurado" options={Booleano} name="insured" />
                            </div>

                            <div className="col-md-4">
                                <Inputs text="Instruciones especiales" name="specialHandlingInstructions" />
                            </div>


                            <div className="col-md-4">
                                <Select text="Contiene materiales peligrosos" options={Booleano} name="hazardousMaterials" />
                            </div>

                            <div className="col-md-4">
                                <Select text="Ruta" name="#" />
                            </div>

                            <div className="col-md-4">
                                <Inputs text="Dirección" name="#" />
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
import React from 'react'
import { useNavigate } from 'react-router-dom';

import styles from '../../../assets/css/shipment/shipment.module.css'
import '../../../assets/css/success.css'

export const ModuleFinish = () => {

    const navigate = useNavigate();

    const handleNext = () => {
        navigate('#');
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (

        <>



            <div className={styles.Info}>
                <div className={styles.fondo}>
                    <div className="text-center">
                            <h1>
                                <b>Datos del Envío #número</b><i className="fa-solid fa-building ms-5"></i>
                            </h1>

                    </div>
                </div>
                <div class="row justify-content-center g-0">


                    <div className={`${styles.section} col-md-4`}>
                        <h3>Datos Remitente</h3>
                        <p><strong>Nombre:</strong> Luis Arguello</p>
                    </div>

                    <div className={`${styles.section} col-md-4`}>
                        <h3>Datos Destinatario</h3>
                        <p><strong>Nombre:</strong> Pablo Guerra</p>
                    </div>

                    <div className={`${styles.section} col-md-4`}>
                        <h3>Datos Envío</h3>
                        <p><strong>Peso:</strong> 3.00</p>
                        <p><strong>Precio por kilos:</strong> 10,00</p>
                        <p><strong>Valor declarado:</strong> 1.962,00</p>
                        <p><strong>Impuesto:</strong> 19</p>
                    </div>

                    <div className={`${styles.section} col-md-4`}>
                        <h3>Destino</h3>
                        <p><strong>Dirección:</strong> Calle XX</p>
                        <p><strong>País:</strong> Colombia</p>
                        <p><strong>Departamento:</strong> Guaviare</p>
                        <p><strong>Ciudad:</strong> San José del Guaviare</p>
                    </div>

                    <div className={`${styles.section} col-md-4`}>
                        <h3>Datos embarcación</h3>
                        <p><strong>Nombre embarcación:</strong> N/D</p>
                        <p><strong>Tipo de embarcación:</strong> N/D</p>
                        <p><strong>Matrícula:</strong> N/D</p>
                        <p><strong>Nombre capitán:</strong> N/D</p>
                        <p><strong>Nombre marinero:</strong> N/D</p>
                    </div>

                    <div className={`${styles.section} col-md-4`}>
                        <h3>Estado envío</h3>
                        <p><strong>Estado del pago:</strong> N/D</p>
                        <p><strong>Tipo de pago:</strong> N/D</p>
                        <p><strong>Estado del envío:</strong> N/D</p>
                        <p><strong>Fecha de envío:</strong> N/D</p>
                        <p><strong>Fecha de entrega:</strong> N/D</p>
                    </div>
                </div>

                <div className="row d-flex justify-content-center">
                    <div className="col-md-auto">
                        <button className="cancelar" onClick={handleBack}>
                            Atrás
                        </button>
                    </div>

                    <div className="col-md-auto">
                        <button className="guardar" onClick={handleNext}>
                            Guardar
                        </button>
                    </div>
                </div>

            </div>

        </>
    )
}

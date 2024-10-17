import React from 'react'
import { useNavigate } from 'react-router-dom';

import styles from '../../../assets/css/shipment/shipment.module.css'

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
                <div className="row text-center bg-info">
                    <div className="col-md-12 py-3">
                        <h1>
                            <b>Datos del Envío #03936</b> <i className="fa-solid fa-building ms-5"></i>
                        </h1>
                    </div>
                </div>


                <div className="row">
                    <div className="col-md-12">
                        <h3 className={styles.subTitle}>Datos Remitente</h3>
                        <div className={styles.section}>
                            <div className="row">
                                <div className="col-md-3">
                                    <p><strong>Nombre:</strong> Luis Arguello</p>
                                </div>
                                <div className="col-md-3">
                                    <p><strong>Teléfono:</strong> +57 123 356 7890</p>
                                </div>
                                <div className="col-md-3">
                                    <p><strong>Email:</strong> luis@example.com</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <h3 className={styles.subTitle}>Datos Destinatario</h3>
                        <div className={styles.section}>
                            <div className="row">
                                <div className="col-md-3">
                                    <p><strong>Nombre:</strong> Pablo Guerra</p>
                                </div>
                                <div className="col-md-3">
                                    <p><strong>Teléfono:</strong> +57 987 653 3210</p>
                                </div>
                                <div className="col-md-3">
                                    <p><strong>Email:</strong> pablo@example.com</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <h3 className={styles.subTitle}>Datos Envío</h3>
                        <div className={styles.section}>
                            <div className="row">
                                <div className="col-md-3">
                                    <p><strong>Peso:</strong> 3.00</p>
                                </div>
                                <div className="col-md-3">
                                    <p><strong>Precio por kilos:</strong> 10,00</p>
                                </div>
                                <div className="col-md-3">
                                    <p><strong>Valor declarado:</strong> 1.962,00</p>
                                </div>
                                <div className="col-md-3">
                                    <p><strong>Impuesto:</strong> 19</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <h3 className={styles.subTitle}>Destino</h3>
                        <div className={styles.section}>
                            <div className="row">
                                <div className="col-md-3">
                                    <p><strong>Dirección:</strong> Calle XX</p>
                                </div>
                                <div className="col-md-3">
                                    <p><strong>País:</strong> Colombia</p>
                                </div>
                                <div className="col-md-3">
                                    <p><strong>Departamento:</strong> Guaviare</p>
                                </div>
                                <div className="col-md-3">
                                    <p><strong>Ciudad:</strong> San José del Guaviare</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <h3 className={styles.subTitle}>Datos embarcación</h3>
                        <div className={styles.section}>
                            <div className="row">
                                <div className="col-md-3">
                                    <p><strong>Nombre embarcación:</strong> N/D</p>
                                </div>
                                <div className="col-md-3">
                                    <p><strong>Tipo de embarcación:</strong> N/D</p>
                                </div>
                                <div className="col-md-3">
                                    <p><strong>Matrícula:</strong> N/D</p>
                                </div>
                                <div className="col-md-3">
                                    <p><strong>Nombre capitán:</strong> N/D</p>
                                </div>
                                <div className="col-md-3">
                                    <p><strong>Nombre marinero:</strong> N/D</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <h3 className={styles.subTitle}>Estado envío</h3>
                        <div className={styles.section}>
                            <div className="row">
                                <div className="col-md-3">
                                    <p><strong>Estado del pago:</strong> N/D</p>
                                </div>
                                <div className="col-md-3">
                                    <p><strong>Tipo de pago:</strong> N/D</p>
                                </div>
                                <div className="col-md-3">
                                    <p><strong>Estado del envío:</strong> N/D</p>
                                </div>
                                <div className="col-md-3">
                                    <p><strong>Fecha de envío:</strong> N/D</p>
                                </div>
                                <div className="col-md-3">
                                    <p><strong>Fecha de entrega:</strong> N/D</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.fila}>
                    <div className="col-md-auto">
                        <button className={styles.cancelar} onClick={handleBack}>
                            Atrás
                        </button>
                    </div>

                    <div className="col-md-auto">
                        <button className={styles.guardar} onClick={handleNext}>
                            Guardar
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

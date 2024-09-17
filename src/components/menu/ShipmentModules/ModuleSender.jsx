import React from 'react'
import { Select } from '../../html components/Selects.jsx';
import { Inputs } from '../../html components/Inputs.jsx'
import { useOptionsCities, useOptionsDepto, OptionsTypeDocument, genero, maritalStatus, nationality } from '../update/options/arrays.jsx';

import styles from '../../../assets/css/shipment/shipment.module.css'
import '../../../assets/css/success.css'

export const ModuleSender = () => {
    const cities = useOptionsCities();
    const deptos = useOptionsDepto();
    return (
        <>
            <div className={styles.tarjeta}>
                <div className={styles.contenedor}>
                    <h2 className={styles.tittle}>Datos remitente</h2>
                    <form>
                        <div className="row">
                            <div className="col-md-4">
                                <Inputs text="Nombres" name="name" />
                            </div>

                            <div className="col-md-4">
                                <Inputs text="Apellidos" name="lastName" />
                            </div>

                            <div className="col-md-4">
                                <Select text="Tipo de Documento" options={OptionsTypeDocument} name="typeDocument" />
                            </div>
                        </div>

                        <div className="row">


                            <div className="col-md-4">
                                <Inputs text="Número de Documento" name="numDocument" icon="fa-solid fa-address-card" />
                            </div>

                            <div className="col-md-4">
                                <Select text="Género" options={genero} name="sex" />
                            </div>

                            <div className="col-md-4">
                                <Inputs text="Número de Teléfono" name="phone" icon="fa-solid fa-phone-volume" />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-4">
                                <Inputs text="Correo Electrónico" name="email" icon="fa-solid fa-at" />
                            </div>

                            <div className="col-md-4">
                                <Inputs type="date" text="Fecha de Nacimiento" name="birthDate" icon="fa-solid fa-calendar-days" />
                            </div>

                            <div className="col-md-4">
                                <Select text="Estado civil" options={maritalStatus} name="maritalStatus" />
                            </div>
                            <div className="col-md-4">
                                <Select text="Nacionalidad" options={nationality} name="nationality" />
                            </div>
                            <div className="col-md-4">
                                <Select text="Departamento" options={deptos} name="departmentName" />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-4">
                                <Select text="Ciudad" options={cities} name="cityName" />
                            </div>
                            <div className='col-md-4'>

                            </div>

                        </div>

                    </form>

                    <div className="row d-flex justify-content-center">
                        <div className="col-md-3">
                            <button className="cancelar">
                                Cancelar
                            </button>
                        </div>

                        <div className="col-md-3">
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


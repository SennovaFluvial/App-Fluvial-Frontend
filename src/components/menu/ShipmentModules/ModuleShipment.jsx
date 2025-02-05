import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Select } from '../../html components/Selects.jsx';
import { Inputs } from '../../html components/Inputs.jsx'
import { useOptionsCities, useOptionsDepto, maritalStatus, typeCargo, weightUnits, Booleano, optionsVehicles, useOptionsBranch, usePaymentStatuses, usePaymentTypes, useDeliveryStatuses } from '../update/options/arrays.jsx';

import styles from '../../../assets/css/shipment/shipment.module.css'
import { useShiptment } from './controllers/ProviderContextShiptmen.jsx';

export const ModuleShipment = () => {

    const cities = useOptionsCities();
    const deptos = useOptionsDepto();
    const navigate = useNavigate();
    const useOptionsVehicles = optionsVehicles();
    const optionsBranchs = useOptionsBranch();


    const {
        formData,
        // setFormData,
        errorsForms,
        // setErrorsForms,
        handleChange,
        handleSubmit,
        isDisabled,
    } = useShiptment()

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
                    <h2 className={styles.tittle}>DATOS DE ENVÍO</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            {/* Embarcación y Sucursal */}
                            <div className="col-md-12">
                                <h1>Embarcación y Sucursal</h1>
                            </div>
                            <div className="col-md-4">
                                <Select
                                    text="Embarcación de envio"
                                    name="vehiculoNombre"
                                    options={useOptionsVehicles}
                                    value={formData.vehiculoNombre}
                                    event={handleChange}
                                />
                                {errorsForms.vehiculoNombre && <div className="text-danger">{errorsForms.vehiculoNombre}</div>}
                            </div>

                            <div className="col-md-4">
                                <Select
                                    text="Sucursal de salida"
                                    name="sucursalNombre"
                                    options={optionsBranchs}
                                    value={formData.sucursalNombre}
                                    event={handleChange}
                                />
                                {errorsForms.sucursalNombre && <div className="text-danger">{errorsForms.sucursalNombre}</div>}
                            </div>

                            {/* Ruta */}
                            <div className="col-md-12">
                                <h1>Ruta</h1>
                            </div>

                            {/* Departamento y Municipio de Salida */}
                            <div className="col-md-4">
                                <Select
                                    text="Departamento de Salida"
                                    options={deptos}
                                    name="departamentoSalida"
                                    value={formData.departamentoSalida}
                                    event={handleChange}
                                />
                                {errorsForms.departamentoSalida && <div className="text-danger">{errorsForms.departamentoSalida}</div>}
                            </div>

                            <div className="col-md-4">
                                <Select
                                    text="Municipio de Salida"
                                    options={cities}
                                    name="municipioSalida"
                                    value={formData.municipioSalida}
                                    event={handleChange}
                                />
                                {errorsForms.municipioSalida && <div className="text-danger">{errorsForms.municipioSalida}</div>}
                            </div>

                            {/* Departamento y Municipio de Llegada */}
                            <div className="col-md-4">
                                <Select
                                    text="Departamento de Llegada"
                                    options={deptos}
                                    name="departamentoLlegada"
                                    value={formData.departamentoLlegada}
                                    event={handleChange}
                                />
                                {errorsForms.departamentoLlegada && <div className="text-danger">{errorsForms.departamentoLlegada}</div>}
                            </div>

                            <div className="col-md-4">
                                <Select
                                    text="Municipio de Llegada"
                                    options={cities}
                                    name="municipioLlegada"
                                    value={formData.municipioLlegada}
                                    event={handleChange}
                                />
                                {errorsForms.municipioLlegada && <div className="text-danger">{errorsForms.municipioLlegada}</div>}
                            </div>

                            <Inputs
                                text="Dirección de entrega"
                                name="direccionEnvio"
                                value={formData.direccionEnvio}
                                event={handleChange}
                            />
                            {errorsForms.direccionEnvio && <div className="text-danger">{errorsForms.direccionEnvio}</div>}

                            {/* Pago */}
                            <div className="col-md-12">
                                <h1>Tipo y Estado de Pago</h1>
                            </div>

                            <div className="col-md-4">
                                <Select
                                    text="Tipo de Pago"
                                    name="tipoPago"
                                    value={formData.tipoPago}
                                    options={usePaymentTypes}
                                    event={handleChange}
                                />
                                {errorsForms.tipoPago && <div className="text-danger">{errorsForms.tipoPago}</div>}
                            </div>

                            <div className="col-md-4">
                                <Select
                                    text="Estado de Pago"
                                    name="estadoPago"
                                    value={formData.estadoPago}
                                    event={handleChange}
                                    options={usePaymentStatuses}
                                />
                                {errorsForms.estadoPago && <div className="text-danger">{errorsForms.estadoPago}</div>}
                            </div>

                            {/* Costo y Descripción */}
                            <div className="col-md-12">
                                <h1>Costo de Envío y Descripción</h1>
                            </div>

                            <div className="col-md-4">
                                <Inputs
                                    text="Costo de Envío"
                                    name="costoEnvio"
                                    placeholder={'Cop Ej: 200000'}
                                    value={formData.costoEnvio}
                                    event={handleChange}
                                />
                                {errorsForms.costoEnvio && <div className="text-danger">{errorsForms.costoEnvio}</div>}
                            </div>

                            <div className="col-md-12">
                                <Inputs
                                    text="Descripción del Envío"
                                    name="descripcionEnvio"
                                    value={formData.descripcionEnvio}
                                    event={handleChange}
                                />
                                {errorsForms.descripcionEnvio && <div className="text-danger">{errorsForms.descripcionEnvio}</div>}
                            </div>

                            {/* Estado de Entrega */}
                            <div className="col-md-12">
                                <h1>Estado de Entrega</h1>
                            </div>

                            <div className="col-md-4">
                                <Select
                                    text="Estado de Entrega"
                                    name="estadoEntrega"
                                    value={formData.estadoEntrega}
                                    event={handleChange}
                                    options={useDeliveryStatuses}
                                />
                                {errorsForms.estadoEntrega && <div className="text-danger">{errorsForms.estadoEntrega}</div>}
                            </div>
                        </div>

                        {/* Botones de Navegación */}
                        <div className={styles.fila}>
                            <div className="col-md-auto">
                                <button className={styles.cancelar} onClick={handleBack}>
                                    Atrás
                                </button>
                            </div>

                            <div className="col-md-auto">
                                <button
                                    type="submit"
                                    className={`${styles.guardar + " ms-2"} ${isDisabled ? "is-disabled-button" : ""}`}
                                >
                                    Finalizar <i className="fa-regular fa-circle-right"></i>
                                </button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>

        </>
    )
}
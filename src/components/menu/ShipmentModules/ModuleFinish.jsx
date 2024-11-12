import { useNavigate } from 'react-router-dom'
import styles from '../../../assets/css/shipment/shipment.module.css'
import { useShiptment } from './controllers/ProviderContextShiptmen'
import { getElementoPorCampo } from '../../../functions/functions'
import { useEffect, useState } from 'react'

export const ModuleFinish = () => {

    const [datosRemitente, setDatosRemitente] = useState([]);
    const [datosDestinatario, setDatosDestinatario] = useState([]);
    const [dataVehicle, setDataVehicle] = useState([])
    const {
        formData,
        numeroGuia
    } = useShiptment()

    const navigate = useNavigate()

    const handleNext = () => {
        navigate('/adminSection')
    }

    const handleBack = () => {
        navigate(-1)
    }

    const obtenerInformacion = async () => {
        const datosRemitente = await getElementoPorCampo('numDocument', formData.remitenteCedula, '/api/v1/customers/all');
        setDatosRemitente(datosRemitente);

        const datosDestinatario = await getElementoPorCampo('numDocument', formData.remitenteCedula, '/api/v1/customers/all');
        setDatosDestinatario(datosDestinatario);

        const dataVehicle = await getElementoPorCampo('nombre', formData.vehiculoNombre, '/api/v1/vehicles/all');
        setDataVehicle(dataVehicle);
    };


    // Usar useEffect para llamar a la función solo una vez al montar el componente
    useEffect(() => {
        obtenerInformacion();
    }, [formData]);

    return (

        <>
            <div className={styles.Info}>
                <div className="row text-center bg-info">
                    <div className="col-md-12 py-3">
                        <h1>
                            <b>Datos del Envío # Guia: {numeroGuia}</b> <i className="fa-solid fa-building ms-5"></i>
                        </h1>
                    </div>
                </div>


                <div className="row">
                    <div className="col-md-12">
                        <h3 className={styles.subTitle}>Datos Remitente</h3>
                        <div className={styles.section}>
                            {datosRemitente.map((itemRemitente) => (
                                <div className='row' key={itemRemitente.id}>
                                    <div className="col-md-3">
                                        <p><strong>Nombre:</strong> {`${itemRemitente.name} ${itemRemitente.lastName}`}</p>
                                    </div>
                                    <div className="col-md-3">
                                        <p><strong>Tipo de documento:</strong> {itemRemitente.typeDocument}</p>
                                        <p><strong>Numero de documento:</strong> {itemRemitente.numDocument}</p>
                                    </div>
                                    <div className="col-md-3">
                                        <p><strong>Teléfono:</strong>{itemRemitente.phone}</p>
                                    </div>
                                    <div className="col-md-3">
                                        <p><strong>Email:</strong>{itemRemitente.email}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="col-md-12">
                        <h3 className={styles.subTitle}>Datos Destinatario</h3>
                        <div className={styles.section}>
                            {datosDestinatario.map((itemDestinatario) => (
                                <div className='row' key={itemDestinatario.id}>
                                    <div className="col-md-3">
                                        <p><strong>Nombre:</strong> {`${itemDestinatario.name} ${itemDestinatario.lastName}`}</p>
                                    </div>
                                    <div className="col-md-3">
                                        <p><strong>Tipo de documento:</strong> {itemDestinatario.typeDocument}</p>
                                        <p><strong>Numero de documento:</strong> {itemDestinatario.numDocument}</p>
                                    </div>
                                    <div className="col-md-3">
                                        <p><strong>Teléfono:</strong>{itemDestinatario.phone}</p>
                                    </div>
                                    <div className="col-md-3">
                                        <p><strong>Email:</strong>{itemDestinatario.email}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="col-md-12">
                        <h3 className={styles.subTitle}>Datos Envío</h3>
                        <div className={styles.section}>
                            <div className="row">

                                <div className="col-md-3">
                                    <p><strong>Valor asignado:</strong> {formData.costoEnvio}</p>
                                </div>
                                <div className="col-md-3">
                                    <p><strong>Descripción</strong> {formData.descripcionEnvio}</p>
                                </div>

                                {/*
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
                               */}
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <h3 className={styles.subTitle}>Destino</h3>
                        <div className={styles.section}>
                            <div className="row">
                                <div className="col-md-3">
                                    <p><strong>Dirección de residencia:</strong>{formData.direccionEnvio}</p>
                                </div>
                                {/*
                                <div className="col-md-3">
                                    <p><strong>País:</strong> Colombia</p>
                                </div>
                                */}
                                <div className="col-md-3">
                                    <p><strong>Departamento:</strong> {formData.departamentoLlegada}</p>
                                </div>
                                <div className="col-md-3">
                                    <p><strong>Municipio:</strong> {formData.municipioLlegada}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <h3 className={styles.subTitle}>Datos embarcación</h3>
                        <div className={styles.section}>
                            {dataVehicle.map((itemVehicle) => (
                                <div className='row' key={itemVehicle.id}>
                                    <div className="col-md-3">
                                        <p><strong>Nombre embarcación:</strong>{itemVehicle.nombre}</p>
                                    </div>
                                    <div className="col-md-3">
                                        <p><strong>Tipo de embarcación:</strong>{itemVehicle.type}</p>
                                    </div>
                                    <div className="col-md-3">
                                        <p><strong>Matrícula:</strong>{itemVehicle.licensePlate}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="col-md-12">
                        <h3 className={styles.subTitle}>Estado envío</h3>
                        <div className={styles.section}>
                            <div className="row">
                                <div className="col-md-3">
                                    <p><strong>Estado del pago:</strong> {formData.estadoPago} </p>
                                </div>
                                <div className="col-md-3">
                                    <p><strong>Tipo de pago:</strong> {formData.tipoPago} </p>
                                </div>
                                <div className="col-md-3">
                                    <p><strong>Estado del envío:</strong> {formData.estadoEntrega} </p>
                                </div>
                                {/*
                                <div className="col-md-3">
                                    <p><strong>Fecha de envío:</strong> {formData.} </p>
                                </div>
                                <div className="col-md-3">
                                    <p><strong>Fecha de entrega:</strong> {formData.} </p>
                                </div>
                               */}
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
                            Aceptar
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

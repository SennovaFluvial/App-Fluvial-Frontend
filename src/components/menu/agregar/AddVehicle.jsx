import { Inputs } from '../../html components/Inputs';
import { Select } from '../../html components/Selects';
import styles from '../../../assets/css/Forms.module.css'
import { ControllerCreateUpdateVehicle } from './controllers/ControllerCreateUpdateVehicle';
import { typeVehicle, weightUnits, volumeUnits, Booleano } from '../update/options/arrays';
import { useParams } from 'react-router';
import { useLocation } from 'react-router-dom';
import { CancelButton } from '../../components/CancelButton';

export const AddVehicle = () => {
    const { id, action } = useParams();
    const { formData, errorsForms, handleChange, handleSubmit, isDisabled } = ControllerCreateUpdateVehicle({ id, action });

    const location = useLocation();
    const from = location.state?.from || 'menu';

    return (
        <>
            <div className={styles.card}>
                <div className={styles.container}>
                    <h2 className={styles.title}>{action === "update" ? "ACTUALIZAR" : "CREAR"} EMBARCACIÓN</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6">
                                <Select
                                    event={handleChange}
                                    text="Tipo"
                                    name="type"
                                    options={typeVehicle}
                                    value={formData.type}
                                />
                                {errorsForms.type && <div className="text-danger">{errorsForms.type}</div>}
                            </div>
                            <div className="col-md-6">
                                <Inputs
                                    event={handleChange}
                                    text="Nombre de la embarcación"
                                    name="nombre"
                                    icon="fa-solid fa-car"
                                    value={formData.nombre}
                                />
                                {errorsForms.nombre && <div className="text-danger">{errorsForms.nombre}</div>}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <Inputs
                                    event={handleChange}
                                    text="Modelo"
                                    name="model"
                                    icon="fa-solid fa-car"
                                    value={formData.model}
                                />
                                {errorsForms.model && <div className="text-danger">{errorsForms.model}</div>}
                            </div>
                            <div className="col-md-6">
                                <Inputs
                                    event={handleChange}
                                    text="Matrícula"
                                    name="licensePlate"
                                    icon="fa-solid fa-id-card"
                                    value={formData.licensePlate}
                                />
                                {errorsForms.licensePlate && <div className="text-danger">{errorsForms.licensePlate}</div>}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <Inputs
                                    event={handleChange}
                                    text="Registro"
                                    name="registration"
                                    icon="fa-solid fa-id-card"
                                    value={formData.registration}
                                />
                                {errorsForms.registration && <div className="text-danger">{errorsForms.registration}</div>}
                            </div>
                            <div className="col-md-6">
                                <Inputs
                                    event={handleChange}
                                    type="date"
                                    text="Fecha de expiración de registro"
                                    name="fechaExpPatente"
                                    icon="fa-solid fa-clock"
                                />
                                {errorsForms.fechaExpPatente && <div className="text-danger">{errorsForms.fechaExpPatente}</div>}

                            </div>
                        </div>
                        <div className="row">
                            {/* Capacidad de Peso y Unidad de Medida */}
                            <div className="col-md-6">
                                <Inputs
                                    event={handleChange}
                                    text="Capacidad de Peso"
                                    name="weightCapacity"
                                    icon="fa-solid fa-weight-hanging"
                                    value={formData.weightCapacity}
                                />
                                {errorsForms.weightCapacity && <div className="text-danger">{errorsForms.weightCapacity}</div>}
                            </div>
                            <div className="col-md-6">
                                <Select
                                    event={handleChange}
                                    text="Unidad de Peso"
                                    name="weightUnit" options={weightUnits}
                                    value={formData.weightUnit}
                                />
                                {errorsForms.weightUnit && <div className="text-danger">{errorsForms.weightUnit}</div>}
                            </div>
                        </div>
                        <div className="row">
                            {/* Capacidad de Volumen y Unidad de Medida */}
                            <div className="col-md-6">
                                <Inputs
                                    event={handleChange}
                                    text="Capacidad de Volumen"
                                    name="volumeCapacity"
                                    icon="fa-solid fa-box"
                                    value={formData.volumeCapacity}
                                />
                                {errorsForms.volumeCapacity && <div className="text-danger">{errorsForms.volumeCapacity}</div>}
                            </div>
                            <div className="col-md-6">
                                <Select
                                    event={handleChange}
                                    text="Unidad de Volumen"
                                    name="volumeUnit"
                                    options={volumeUnits}
                                    value={formData.volumeUnit}
                                />
                                {errorsForms.volumeUnit && <div className="text-danger">{errorsForms.volumeUnit}</div>}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <Select
                                    event={handleChange}
                                    text="¿Capacidad de pasajero?"
                                    name="passengerSpace"
                                    options={Booleano}
                                    value={formData.passengerSpace}
                                />
                                {errorsForms.passengerSpace && <div className="text-danger">{errorsForms.passengerSpace}</div>}
                            </div>
                            {formData.passengerSpace === "true" && (
                                <>
                                    <div className="col-md-6">
                                        <Inputs
                                            event={handleChange}
                                            text="Espacio de Pasajeros"
                                            name="passengers"
                                            icon="fa-solid fa-users"
                                            value={formData.passengers}
                                        />
                                        {errorsForms.passengers && <div className="text-danger">{errorsForms.passengers}</div>}
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="text-center">
                            <CancelButton
                                from={from}
                                urlPageList={"../show-vehicles"}
                            />
                            <button type="submit" className={`${styles.guardar + " ms-2"} ${isDisabled ? "is-disabled-button" : ""}`}>{action === "update" ? "Actualizar" : "Crear"} Embarcación <i className="fa-solid fa-floppy-disk"></i></button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

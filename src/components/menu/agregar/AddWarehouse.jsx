import { Select } from '../../html components/Selects.jsx';
import { Inputs } from '../../html components/Inputs.jsx';
import styles from '../../../assets/css/Forms.module.css';
import { weightUnits } from '../update/options/arrays.jsx';
import { useLocation, useParams } from 'react-router';
import { CancelButton } from '../../components/CancelButton.jsx';
import { ControllerCreateUpdateWarehouse } from './controllers/inventories/ControllerCreateUpdateWarehouse.jsx';

export const AddWarehouse = () => {

    const { id, action } = useParams();
    const { isDisabled, errorsForms, formData, handleChange, handleSubmit } = ControllerCreateUpdateWarehouse({ id, action });

    const location = useLocation();
    const from = location.state?.from || 'menu';

    return (
        <>
            <div className={styles.card}>
                <div className={styles.container}>
                    <h2 className={styles.title}>CREAR BODEGA</h2>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.h3}>
                            <h3><b>INFORMACIÓN DE LA BODEGA</b></h3>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <Inputs text="Nombre de la Bodega" name="name" value={formData.name} event={handleChange} />
                                {errorsForms.name && <div className="text-danger">{errorsForms.name}</div>}

                            </div>
                            <div className="col-md-6">
                                <Inputs text="Ubicación" name="location" value={formData.location} event={handleChange} />
                                {errorsForms.location && <div className="text-danger">{errorsForms.location}</div>}

                            </div>
                            <div className="col-md-6    ">
                                <Inputs text="Capacidad de almacenamiento" name="capacity" value={formData.capacity} event={handleChange} />
                                {errorsForms.capacity && <div className="text-danger">{errorsForms.capacity}</div>}

                            </div>
                            <div className="col-md-6">
                                <Select text="Unidad de Medida" name="unitOfMeasurement" options={weightUnits} value={formData.unitOfMeasurement} event={handleChange} />
                                {errorsForms.unitOfMeasurement && <div className="text-danger">{errorsForms.unitOfMeasurement}</div>}

                            </div>
                            <div className="col-md-12">
                                <Inputs text="Descripción" name="description" value={formData.description} event={handleChange} />
                                {errorsForms.description && <div className="text-danger">{errorsForms.description}</div>}

                            </div>
                        </div>
                        <div className="text-center">
                            <CancelButton
                                from={from}
                                urlPageList={"../show-warehouse"}
                            />
                            <button type="submit" className={`${styles.guardar + " ms-2"} ${isDisabled ? "is-disabled-button" : ""}`}>
                                {action === 'update' ? 'Actualizar' : 'Registrar'} Bodega <i className="fa-solid fa-building-user"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

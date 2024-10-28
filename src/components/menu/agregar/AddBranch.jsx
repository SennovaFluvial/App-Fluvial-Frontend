import { useLocation, useParams } from 'react-router-dom';
import { Select } from '../../html components/Selects.jsx';
import { Inputs } from '../../html components/Inputs.jsx';
import styles from '../../../assets/css/Forms.module.css';
import { useOptionsDepto, useOptionsCities } from '../../menu/update/options/arrays.jsx';
import { ControllerCreateUpdateBranch } from './controllers/branch/ControllerCreateUpdateBranch.jsx';
import { CancelButton } from '../../components/CancelButton.jsx';

export const AddBranch = () => {

    const cities = useOptionsCities();
    const deptos = useOptionsDepto();

    const { id, action } = useParams();
    const { errorsForms, formData, handleChange, handleSubmit, isDisabled } = ControllerCreateUpdateBranch({ id, action });

    const location = useLocation();
    const from = location.state?.from || 'menu';

    return (
        <>
            <div className={styles.card}>
                <div className={styles.container}>
                    <h2 className={styles.title}>CREAR SUCURSAL</h2>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.h3}>
                            <h3><b>INFORMACIÓN DE LA SUCURSAL</b></h3>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <Inputs text="Nombre de la Sucursal" name="nombre" value={formData.nombre} event={handleChange} />
                                {errorsForms.nombre && <div className="text-danger">{errorsForms.nombre}</div>}

                            </div>
                            <div className="col-md-6">
                                <Inputs text="Dirección" name="direccion" value={formData.direccion} event={handleChange} />
                                {errorsForms.direccion && <div className="text-danger">{errorsForms.direccion}</div>}

                            </div>
                            <div className="col-md-6">
                                <Select text="Departamento" name="departamento" options={deptos} value={formData.departamento} event={handleChange} />
                                {errorsForms.departamento && <div className="text-danger">{errorsForms.departamento}</div>}

                            </div>
                            <div className="col-md-6">
                                <Select text="Municipio" name="municipio" options={cities} value={formData.municipio} event={handleChange} />
                                {errorsForms.municipio && <div className="text-danger">{errorsForms.municipio}</div>}

                            </div>
                        </div>

                        <div className="text-center">
                            <CancelButton
                                from={from}
                                urlPageList={"../show-branch"}
                            />
                            <button
                                type="submit"
                                className={`${styles.guardar + " ms-2"} ${isDisabled ? "is-disabled-button" : ""}`}>
                                {action && action === "update" ? "Actualizar" : "Guardar"} Sucursal
                            </button>

                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

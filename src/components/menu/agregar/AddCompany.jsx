import { Inputs } from '../../html components/Inputs.jsx';
import { Select } from '../../html components/Selects.jsx';
import { useOptionsDepto, useOptionsCities, status } from '../update/options/arrays.jsx';
import styles from '../../../assets/css/Forms.module.css'
import { useParams } from 'react-router';
import { ControllerCreateUpdateCompany } from './controllers/ControllerCreateUpdateCompany.jsx';
import { useLocation } from 'react-router-dom';
import { CancelButton } from '../../components/CancelButton.jsx';

export const AddCompany = () => {

    const { id, action } = useParams();
    const { handleSubmit, errorsForms, formData, handleChange, isDisabled } = ControllerCreateUpdateCompany({ id, action });
    const deptos = useOptionsDepto();
    const cities = useOptionsCities();

    const location = useLocation();
    const from = location.state?.from || 'menu';

    return (
        <>
            <div className={styles.card}>
                <div className={styles.container}>
                    <h2 className={styles.title}>{action && action === "update" ? "ACTUALIZAR" : "CREAR"} EMPRESA</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="text-center">
                            <h3><b>INFORMACIÓN DE LA EMPRESA</b></h3>
                        </div>
                        <div className="row" > {/* Información de la Empresa */}
                            <div className="col-md-4">
                                <Inputs type="text" text="NIT" name="nit" event={handleChange} value={formData.nit} required={true} />
                                {errorsForms.nit && <div className="text-danger">{errorsForms.nit}</div>}
                            </div>
                            <div className="col-md-4">
                                <Inputs text="Nombre de la Empresa" name="company" event={handleChange} value={formData.company} required={true} />
                                {errorsForms.company && <div className="text-danger">{errorsForms.company}</div>}
                            </div>
                            <div className="col-md-4">
                                <Inputs text="Nombre del Gerente" name="manager" event={handleChange} value={formData.manager} required={true} />
                                {errorsForms.manager && <div className="text-danger">{errorsForms.manager}</div>}
                            </div>
                        </div>

                        <div className="text-center">
                            <h3><b>CONTACTO</b></h3>
                        </div>
                        <div className="row"> {/* Contacto */}
                            <div className="col-md-6">
                                <Inputs text="Correo Electrónico de la empresa" name="email" event={handleChange} icon={"fa-solid fa-at"} value={formData.email} required={true} />
                                {errorsForms.email && <div className="text-danger">{errorsForms.email}</div>}
                            </div>
                            <div className="col-md-6">
                                <Inputs text="Número de Teléfono de la empresa" name="phone" event={handleChange} icon="fa-solid fa-phone-volume" value={formData.phone} required={true} />
                                {errorsForms.phone && <div className="text-danger">{errorsForms.phone}</div>}
                            </div>
                        </div>

                        <div className="text-center">
                            <h3><b>UBICACIÓN</b></h3>
                        </div>
                        <div className="row"> {/* Ubicación */}
                            <div className="col-md-6">
                                <Select text="Departamento" name="department" event={handleChange} value={formData.department} options={deptos} required={true} />
                                {errorsForms.department && <div className="text-danger">{errorsForms.department}</div>}
                            </div>
                            <div className="col-md-6">
                                <Select text="Municipio" name="municipality" event={handleChange} value={formData.municipality} options={cities} required={true} />
                                {errorsForms.municipality && <div className="text-danger">{errorsForms.municipality}</div>}
                            </div>
                            <div className="col-md-6">
                                <Inputs text="Dirección de residencia" name="address" event={handleChange} icon="fa-solid fa-map-pin" value={formData.address} required={true} />
                                {errorsForms.address && <div className="text-danger">{errorsForms.address}</div>}
                            </div>
                        </div>

                        <div className="text-center">
                            <h3><b>INFORMACIÓN LABORAL</b></h3>
                        </div>
                        <div className="row"> {/* Información laboral */}
                            <div className="col-md-6">
                                <Select text="Estado" name="status" value={formData.status} event={handleChange} options={status} required={true} />
                                {errorsForms.status && <div className="text-danger">{errorsForms.status}</div>}
                            </div>
                        </div>

                        <div className="text-center">
                            <CancelButton
                                from={from}
                                urlPageList={"../show-companies"}
                            />
                            <button type="submit" className={`${styles.guardar + " ms-2"} ${isDisabled ? "is-disabled-button" : ""}`}>{action && action === "update" ? "Actualizar" : "Guardar"} Empresa <i className="fa-solid fa-building"></i></button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

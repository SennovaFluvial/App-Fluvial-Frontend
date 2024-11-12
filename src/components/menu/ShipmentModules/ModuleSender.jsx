import { useNavigate } from 'react-router-dom';
import { Inputs } from '../../html components/Inputs.jsx'
import styles from '../../../assets/css/shipment/shipment.module.css';
import { DocumentSuggestions } from '../../components/DocumentSuggestions.jsx';
import { MoreDetails } from '../history/moreDetails/MoreDetailsCustomers.jsx';
import { useShiptment } from './controllers/ProviderContextShiptmen.jsx';

export const ModuleSender = () => {
    const navigate = useNavigate();

    const {
        formData,
        setFormData,
        errorsForms,
        setErrorsForms,
        handleChange,
        isDisabled
    } = useShiptment()

    const handleNext = () => {
        navigate('/adminSection/register-shipment/module-recipient');
    };

    const handleBack = () => {
        navigate('#');
    };

    return (
        <>
            <div className={styles.tarjeta}>
                <div className={styles.contenedor}>
                    <h2 className={styles.tittle}>DATOS DE REMITENTE</h2>

                    <div className="row">
                        <div className="col-md-12 mb-5">
                            <Inputs
                                text="Número Documento del remitente"
                                name="remitenteCedula"
                                value={formData.remitenteCedula}
                                event={handleChange}
                            />
                            {errorsForms.remitenteCedula && <div className="text-danger">{errorsForms.remitenteCedula}</div>}

                            <DocumentSuggestions
                                numDocumentToSearch={formData.remitenteCedula}
                                setFormData={setFormData}
                                setErrorsForms={setErrorsForms}
                                nameField={'remitenteCedula'}
                            />
                        </div>

                        {formData.idRemitente && (
                            <>
                                <MoreDetails data={{ id: formData.idRemitente, category: 'customer', from: 'external' }} />
                            </>
                        )}
                    </div>

                    <div className={styles.fila}>
                        <div className="col-md-auto">
                            <button className={styles.cancelar} onClick={handleBack}>
                                Cancelar <i className="fa-solid fa-ban"></i>
                            </button>
                        </div>

                        <div className="col-md-auto">
                            <button onClick={handleNext} className={`${styles.siguiente + " ms-2"} ${isDisabled ? "is-disabled-button" : ""}`}>
                                Siguiente <i className="fa-regular fa-circle-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

/*

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


                            <div className="col-md-4">
                                <Inputs text="Número de Documento" name="numDocument" icon="fa-solid fa-address-card" />
                            </div>

                            <div className="col-md-4">
                                <Select text="Género" options={genero} name="sex" />
                            </div>

                            <div className="col-md-4">
                                <Inputs text="Número de Teléfono" name="phone" icon="fa-solid fa-phone-volume" />
                            </div>


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

                            <div className="col-md-4">
                                <Select text="Ciudad" options={cities} name="cityName" />
                            </div>

                        </div>
                    </form>

 */
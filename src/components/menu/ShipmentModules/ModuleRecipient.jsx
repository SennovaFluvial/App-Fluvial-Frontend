import { useNavigate } from 'react-router-dom';
import { Inputs } from '../../html components/Inputs.jsx'
import styles from '../../../assets/css/shipment/shipment.module.css'
import { useShiptment } from './controllers/ProviderContextShiptmen.jsx';
import { MoreDetails } from '../history/moreDetails/MoreDetailsCustomers.jsx';
import { DocumentSuggestions } from '../../components/DocumentSuggestions.jsx';

export const ModuleRecipient = () => {

    const navigate = useNavigate();

    // Context
    const {
        formData,
        setFormData,
        errorsForms,
        setErrorsForms,
        handleChange,
        isDisabled
    } = useShiptment()
    // Context

    const handleNext = () => {
        navigate('/adminSection/register-shipment/module-product');
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <>
            <div className={styles.tarjeta}>
                <div className={styles.contenedor}>
                    <h2 className={styles.tittle}>DATOS DE DESTINATARIO</h2>

                    <div className="row">
                        <div className="col-md-12 mb-5">
                            <Inputs
                                text="Número Documento del destinatario"
                                name="destinatarioCedula"
                                value={formData.destinatarioCedula}
                                event={handleChange}
                            />
                            {errorsForms.destinatarioCedula && <div className="text-danger">{errorsForms.destinatarioCedula}</div>}

                            <DocumentSuggestions
                                numDocumentToSearch={formData.destinatarioCedula}
                                setFormData={setFormData}
                                setErrorsForms={setErrorsForms}
                                nameField={'destinatarioCedula'}
                            />
                        </div>

                        {formData.idDestinatario && (
                            <>
                                <MoreDetails data={{ id: formData.idDestinatario, category: 'customer', from: 'external' }} />
                            </>
                        )}
                    </div>

                    <div className={styles.fila}>
                        <div className="col-md-auto">
                            <button className={styles.cancelar} onClick={handleBack}>
                                Atrás <i className="fa-regular fa-circle-left"></i>
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
    )
}

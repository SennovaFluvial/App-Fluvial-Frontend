import { useNavigate } from 'react-router-dom'
import { Inputs } from '../../html components/Inputs.jsx'
import styles from '../../../assets/css/shipment/shipment.module.css'
import { DocumentSuggestions } from '../../components/DocumentSuggestions.jsx'
import { MoreDetails } from '../history/moreDetails/MoreDetailsCustomers.jsx'
import { useShiptment } from './controllers/ProviderContextShiptmen.jsx'

export const ModuleSender = () => {
    const navigate = useNavigate()

    const {
        formData,
        setFormData,
        errorsForms,
        setErrorsForms,
        handleChange,
        isDisabled,
    } = useShiptment()

    const handleNext = () => {
        navigate('/adminSection/register-shipment/module-recipient')
    }

    const handleBack = () => {
        navigate('#')
    }

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
    )
}
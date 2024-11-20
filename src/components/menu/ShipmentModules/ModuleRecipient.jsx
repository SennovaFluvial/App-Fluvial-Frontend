import { useNavigate } from 'react-router-dom'
import { Inputs } from '../../html components/Inputs.jsx'
import styles from '../../../assets/css/shipment/shipment.module.css'
import { useShiptment } from './controllers/ProviderContextShiptmen.jsx'
import { MoreDetails } from '../history/moreDetails/MoreDetailsCustomers.jsx'
import { DocumentSuggestions } from '../../components/DocumentSuggestions.jsx'
import { ModalforComponent } from '../../components/ModalforComponent.jsx'
import { AddCustomer } from '../agregar/AddCustomer.jsx'
import { useState } from 'react'

export const ModuleRecipient = () => {

    const navigate = useNavigate()
    const [openCloseModal, setOpenCloseModal] = useState(false)

    // Context
    const {
        formData,
        setFormData,
        errorsForms,
        setErrorsForms,
        handleChange,
        isDisabled,
    } = useShiptment()
    // Context

    const handleNext = () => {
        navigate('/adminSection/register-shipment/module-product')
    }

    const handleBack = () => {
        navigate(-1)
    }

    const openModal = () => {
        setOpenCloseModal(true)
    }

    const closeModal = () => {
        setOpenCloseModal(false)
    }
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

                        <div className={styles.fila}>
                            <div className="col-md-auto">
                                <button className={styles.cancelar} onClick={handleBack}>
                                    Atrás <i className="fa-regular fa-circle-left"></i>
                                </button>
                            </div>

                            <div className="col-md-auto">
                                <button onClick={openModal} className={`${styles.addCustomer}`}>
                                    <i className="fa-solid fa-user-plus"></i>
                                </button>
                            </div>
                            {openCloseModal && (
                                <ModalforComponent
                                    showModal={openCloseModal}
                                    handleClose={closeModal}
                                    BodyComponent={<AddCustomer funcChangeState={setOpenCloseModal} />}
                                />
                            )}

                            <div className="col-md-auto">
                                <button onClick={handleNext} className={`${styles.siguiente + " ms-2"} ${isDisabled ? "is-disabled-button" : ""}`}>
                                    Siguiente <i className="fa-regular fa-circle-right"></i>
                                </button>
                            </div>
                        </div>

                        {formData.idDestinatario && formData.destinatarioCedula ? (
                            <>
                                <MoreDetails data={{ id: formData.idDestinatario, category: 'customer', from: 'external' }} />

                            </>
                        ) : ''}

                    </div>
                </div>
            </div>
        </>
    )
}

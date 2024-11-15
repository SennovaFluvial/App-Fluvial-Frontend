// import 'bootstrap/dist/css/bootstrap.min.css'

/**
 * Componente de modal que recibe un componente en el cuerpo para personalizar su contenido.
 *
 * Props:
 * @param {boolean} showModal - Estado que determina si el modal debe ser visible.
 * @param {function} handleClose - Función para cerrar el modal.
 * @param {JSX.Element} BodyComponent - Componente que se renderiza en el cuerpo del modal.
 *
 * @returns {JSX.Element} Componente del modal.
 */
export const ModalforComponent = ({ showModal, handleClose, BodyComponent }) => {
    return (
        <>
            <div
                className={`modal fade ${showModal ? 'show' : ''}`}
                style={{ display: showModal ? 'block' : 'none' }}
                tabIndex="-1"
                role="dialog"
                aria-hidden={!showModal}
            >
                <div className="modal-dialog modal-lg" role="document" style={{ maxWidth: '90%' }}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="btn-close" onClick={handleClose} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {BodyComponent}
                        </div>
                    </div>
                </div>
            </div>
            {showModal && <div className="modal-backdrop fade show"></div>}
        </>
    )
} 

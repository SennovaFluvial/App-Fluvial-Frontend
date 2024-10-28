import { Inputs } from '../../html components/Inputs.jsx';

/**
 * Componente de modal para solicitar la verificación de la contraseña del usuario.
 *
 * Este componente muestra un modal que permite al usuario ingresar su contraseña para verificar su identidad.
 * Incluye un campo de entrada para la contraseña y botones para cerrar el modal o validar la entrada.
 *
 * Props:
 * @param {string} userNameUser - Nombre de usuario del usuario que se está verificando.
 * @param {boolean} showModal - Estado que determina si el modal debe ser visible.
 * @param {function} handleClose - Función para cerrar el modal.
 * @param {function} handleChangeVerify - Función que maneja los cambios en el campo de entrada de contraseña.
 * @param {object} errorsFormsVerify - Objeto que contiene los errores de validación para los campos del formulario.
 * @param {function} handleSubmitVerify - Función que se llama al enviar el formulario.
 * @param {object} formLogin - Objeto que representa el estado del formulario de inicio de sesión, incluyendo la contraseña.
 *
 * Uso:
 * ```jsx
 * <ModalRequestPassword
 *     userNameUser="JohnDoe"
 *     showModal={isModalVisible}
 *     handleClose={closeModal}
 *     handleChangeVerify={handlePasswordChange}
 *     errorsFormsVerify={formErrors}
 *     handleSubmitVerify={submitVerification}
 *     formLogin={formLoginState}
 * />
 * ```
 *
 * @returns {JSX.Element} Componente del modal para la verificación de contraseña.
 */

export const ModalRequestPassword = ({ userNameUser, showModal, handleClose, handleChangeVerify, errorsFormsVerify, handleSubmitVerify, formLogin }) => {

    const onSubmit = (e) => {
        e.preventDefault();
        handleSubmitVerify();
        handleClose();
    };

    return (
        <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} aria-hidden={!showModal}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5">Verificación de Usuario</h1>
                        <button type="button" className="btn-close" onClick={handleClose} aria-label="Close"></button>
                    </div>
                    <form onSubmit={onSubmit}>
                        <div className="modal-body">
                            <h1 className="modal-title fs-5">{`Ingresa la contraseña del usuario ${userNameUser}`}</h1>
                            <Inputs
                                placeholder="Contraseña..."
                                event={handleChangeVerify}
                                type="password"
                                name="password"
                                icon="fa-solid fa-lock"
                                value={formLogin.password}
                            />
                            {errorsFormsVerify.password && (
                                <div className="text-danger">{errorsFormsVerify.password}</div>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" onClick={handleClose}>
                                Cerrar
                            </button>
                            <button type="submit" className="btn btn-success">
                                Validar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

import { Inputs } from '../../html components/Inputs.jsx';

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

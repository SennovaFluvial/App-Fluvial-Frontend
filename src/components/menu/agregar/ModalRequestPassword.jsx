import React from 'react'

export const ModalRequestPassword = () => {
    return (
        <>
            <div className="modal fade" id="updateWitdhPassword" aria-labelledby="updateWitdhPassword" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5">Verificación de Usuario</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form>
                            <div className="modal-body">
                                <h1 className="modal-title fs-5">{`Ingresa la contraseña del usuario ${userName}`}</h1>
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
                                <button type="button" className="btn btn-danger" data-bs-dismiss="modal">
                                    Cerrar
                                </button>
                                <button type="button" className="btn-success" onClick={handleSubmitVerify}>
                                    Validar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

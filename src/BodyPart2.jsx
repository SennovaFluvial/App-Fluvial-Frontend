import './bodyPart2.css'

export const BodyPart2 = () => {
    return (
        <>

            <div className="container continerPar2">
                <div className="row">
                    <div className="col-md-4">
                        <h1 className="titulo">BENEFICIOS CLAVE</h1>
                    </div>
                    <div className="col-md-8 mt-2">
                        <hr />
                    </div>
                </div>
            </div>



            <div className="container continerPar2">

                <div className="row">
                    <div className="col-md-4 text-center mt-5 pt-2 mb-5 pb-2">
                        <i class="fa-solid fa-desktop iconoS"></i>
                        <p className="parrafo">Interfaz amigable</p>
                    </div>
                    <div className="col-md-4 text-center mt-5 pt-2 mb-5 pb-2">
                        <i class="fa-solid fa-map-location-dot iconoS"></i>
                        <p className="parrafo">Seguimiento de movimientos claves en el transporte fluvial</p>
                    </div>
                    <div className="col-md-4 text-center mt-5 pt-2 mb-5 pb-2">
                        <i class="fa-solid fa-folder-open iconoS"></i>
                        <p className="parrafo">sistematizar el sistema de información del transporte fluvial </p>
                    </div>
                    <div className="col-md-6 text-center mt-5 pt-2 mb-5 pb-2">
                        <i class="fa-solid fa-user-tie iconoS"></i>
                        <p className="parrafo">Administración logística de las motonaves y cargas</p>
                    </div>
                    <div className="col-md-6 text-center mt-5 pt-2 mb-5 pb-2">
                        <i class="fa-solid fa-arrows-rotate iconoS"></i>
                        <p className="parrafo">Trasabilidad de procesos</p>
                    </div>
                </div>
            </div>

        </>
    )
}

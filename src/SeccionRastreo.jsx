import './stylesRastreoSection.css'

import radarIcon from './img/IconRadar.png'

export const SeccionRastreo = () => {
    return (
        <>

            <div className="container contenedorRastreo">
                <div className="row">
                    <div className="col-md-6 text-center">
                        <img src={radarIcon} className='img-fluid' alt="Icono radar" />
                    </div>
                    <div className="col-md-6">
                        <div className="row">
                            <form action="">
                                <div className="col-md-12 section text-center">
                                    <h1>
                                        Rastrea la ubicación del envío
                                    </h1>
                                </div>

                                <div className="col-md-12 text-center">
                                    <input type="text" className="form-control custom-input entradatexto" placeholder="Ingrese el ID de historial... Ej. Fn3918koP" />
                                </div>

                                <div className="col-md-12 section text-center">
                                    <button className="btn btn-primary boton">¡Rastrear ahora!</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container selectContainer">
                <div className="row">
                    <div className="col-md-6 text-center contentContainerSection">
                        <p>
                            <b>Rastrear por...</b>
                        </p>
                    </div>
                    <div className="col-md-6 text-center contentContainerSection">
                        <select class="form-select custom-input selectinput" aria-label="Default select example">
                            <option selected>Selecciona</option>
                            <option value="1">Opcion 1</option>
                            <option value="2">Opcion 2</option>
                            <option value="3">Opcion 3</option>
                        </select>
                    </div>
                </div>
            </div>


        </>
    )
}

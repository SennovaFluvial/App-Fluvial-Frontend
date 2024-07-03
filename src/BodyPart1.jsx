import './assets/css/bodyPart1.css'

export const BodyPart1 = () => {
    return (
        <>
            <div className="container contenedorPart1">
                <h1 className='text-center titulo'>APLICACIÓN DE TRASABILIDAD DEL TRANSPORTE FLUVIAL</h1>

                <p className='mt-5 parrafo'>
                    En un esfuerzo para reactivar y estimular una de las actividades más cruciales, pero menos impulsada de nuestro país Colombia.
                </p>
                <p className="parrafo">
                    Aquí te ofrecemos una innovadora aplicación para conectar de manera más eficiente a todos los actores y partes interesadas tanto en el sector privado como estatal.
                </p>

            </div>

            <div className="contenedorEstilos">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 text-center">
                            <i class="fa-solid fa-ship iconoP1"></i>
                        </div>
                        <div className="col-md-4">
                            <h1 className='text-center titulo'>QUE TE OFRECEMOS</h1>
                            <p className='mt-5 parrafo'>
                                Nuestra solución está diseñada para transformar la manera en la que participantes del transporte fluvial interactúan.
                            </p>
                            <p className="parrafo">
                                Proporcionando una plataforma centralizada que facilita la comunicación.
                            </p>
                        </div>
                        <div className="col-md-4 text-center">
                            <i class="fa-solid fa-users iconoP1"></i>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

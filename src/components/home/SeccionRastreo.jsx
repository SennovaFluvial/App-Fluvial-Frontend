import { motion } from "framer-motion"
import '../../assets/css/stylesRastreoSection.css'

import radarIcon from '../../assets/img/IconRadar.png'


export const SeccionRastreo = () => {
    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.0 }}
            >
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


                                        <motion.button
                                            className="btn btn-primary boton"
                                            whileHover={{ scale: 1.1 }}
                                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                        >
                                            ¡Rastrear ahora!
                                        </motion.button>

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

        </>
    )
}

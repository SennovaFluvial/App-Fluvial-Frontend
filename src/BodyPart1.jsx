import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion'
import './bodyPart1.css'

export const BodyPart1 = () => {

    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const top = ref.current.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (top < windowHeight) {
                setIsVisible(true);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <>
            <motion.div
                ref={ref}
                initial={{ x: '-100vw', opacity: 0 }}
                animate={isVisible ? { x: 0, opacity: 1 } : {}}
                transition={{ type: 'spring', stiffness: 50, duration: 1 }}
                className="animated-container"
            >
                <div className="container contenedorPart1">
                    <h1 className='text-center titulo'>APLICACIÓN DE TRASABILIDAD DEL TRANSPORTE FLUVIAL</h1>

                    <p className='mt-5 parrafo'>
                        En un esfuerzo para reactivar y estimular una de las actividades más cruciales, pero menos impulsada de nuestro país Colombia.
                    </p>
                    <p className="parrafo">
                        Aquí te ofrecemos una innovadora aplicación para conectar de manera más eficiente a todos los actores y partes interesadas tanto en el sector privado como estatal.
                    </p>

                </div>
            </motion.div>
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

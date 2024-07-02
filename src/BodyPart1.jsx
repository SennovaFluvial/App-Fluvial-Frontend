import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion'
import './bodyPart1.css'

export const BodyPart1 = () => {
    /**
     * Hook useState para gestionar el estado de visibilidad de un elemento.
     * 
     * 'isVisible' es un estado que indica si un elemento es visible en la pantalla.
     * 'setIsVisible' es una función para actualizar el estado 'isVisible'.
     */
    const [isVisible, setIsVisible] = useState(false);


    /**
     * 'ref' es una referencia que puede apuntar a un elemento del DOM para interactuar directamente con él.
     */
    const ref = useRef(null);

    useEffect(() => {
        const handleScroll = () => { // Función de flecha para la animación de entrada del componente referenciado por 'ref'

            const tope = ref.current.getBoundingClientRect().top; // Se creo una variable para almacenar la distancia del elemento ref al tope de la ventana del navegador.
            const alturaVentana = window.innerHeight; // En una funcion que permite almacenar la altura visible de la ventana del navegador que esta viendo el usuario.

            // Se realiza una descición para cambiar el estado del metodo 'setIsVisible'.

            if (tope < alturaVentana) { // Comprueba si el borde superior del elemento referenciado por 'ref' está por encima del borde inferior visible del viewport.

                // Si es así, establece 'isVisible' a true para indicar que el elemento es visible en la pantalla.
                setIsVisible(true);
            }
        };

        window.addEventListener('scroll', handleScroll); // Agrega un listener para el evento de scroll cuando el componente se monta

        return () => {
            window.removeEventListener('scroll', handleScroll); // Remueve el listener cuando el componente se desmonta para evitar pérdidas de memoria
        };

    }, []);

    return (
        <>
            <motion.div
                ref={ref} // Se apunta a este elemento por medio del 'ref'

                initial={{ x: '-100vw', opacity: 0 }} // Se establece el estado inicial del elemento, en este caso fuera de la pantalla.

                // Se creal la descición.
                animate={isVisible ? { x: 0, opacity: 1 } : {}} // Si 'isVisible' = true, trae el elemento a la posición original. Si 'isVisible' = false, no ocurre ningún cambio.

                transition={{ type: 'spring', stiffness: 50, duration: 1 }}// Se establece el tipo de transición que va a tener la animación
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
            </motion.div> {{
                // Hasta aqui el elemento a animar
            }}

            < div className="contenedorEstilos">
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
            </div >

        </>
    )
}

import React from 'react'

import ReactDOM from 'react-dom/client'

import { VistaHomePageOff } from './vistaHome.jsx'

import { SeccionRastreo } from './SeccionRastreo.jsx'

import { BodyPart1 } from './BodyPart1.jsx'

import { BodyPart2 } from './BodyPart2.jsx'

import { FooterPage } from './FooterPage.jsx'


// import { Boton } from './componentes/Boton.jsx'


ReactDOM.createRoot(document.getElementById('BarraNavegacion')).render(  // LLAMA AL COMPONENTE 'VistaHomePageOff' EN EL ELEMENTO CON EL ID 'BarraNavegacion'
    <React.StrictMode>
        <VistaHomePageOff />
    </React.StrictMode >,
)


ReactDOM.createRoot(document.getElementById('seccionRastreo')).render(
    <React.StrictMode>
        <SeccionRastreo />
    </React.StrictMode>,
)

ReactDOM.createRoot(document.getElementById('bodyPart1')).render(
    <React.StrictMode>
        <BodyPart1 />
    </React.StrictMode>,
)

ReactDOM.createRoot(document.getElementById('bodyPart2')).render(
    <React.StrictMode>
        <BodyPart2 />
    </React.StrictMode>,
)

ReactDOM.createRoot(document.getElementById('footerPage')).render(
    <React.StrictMode>
        <FooterPage />
    </React.StrictMode>,
)

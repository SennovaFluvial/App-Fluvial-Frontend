import React from 'react';

import { NavbarHomePage } from './components/home/NavbarHomePage.jsx' // Se importa el Navbar del home page

import { SeccionRastreo } from './components/home/SeccionRastreo.jsx' // Se importa la seccion del rastreo de paquetes.

import { BodyPart1 } from './components/home/BodyPart1.jsx' // Se importa la 1ra parte del home page.

import { BodyPart2 } from './components/home/BodyPart2.jsx' // Se importa la 2ra parte del home page.

import { FooterPage } from './components/home/FooterPage.jsx' // Se importa el Footer del home page.

import './assets/css/vistaHome.css'
export const VistaHomePageOff = () => { // Vista completa de los componentes creados para el Home Page.
    return (
        <>

            <div className="cuerpito">

                <NavbarHomePage />

                <SeccionRastreo />

                <BodyPart1 />

                <BodyPart2 />

                <FooterPage />

            </div>

        </>
    )
}



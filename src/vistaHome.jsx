import React from 'react';

import { NavbarHomePage } from './NavbarHomePage.jsx' // Se importa el Navbar del home page

import { SeccionRastreo } from './SeccionRastreo.jsx' // Se importa la seccion del rastreo de paquetes.

import { BodyPart1 } from './BodyPart1.jsx' // Se importa la 1ra parte del home page.

import { BodyPart2 } from './BodyPart2.jsx' // Se importa la 2ra parte del home page.

import { FooterPage } from './FooterPage.jsx' // Se importa el Footer del home page.


export const VistaHomePageOff = () => { // Vista completa de los componentes creados para el Home Page.
    return (
        <>
            <NavbarHomePage />

            <SeccionRastreo />

            <BodyPart1 />

            <BodyPart2 />

            <FooterPage />

        </>
    )
}



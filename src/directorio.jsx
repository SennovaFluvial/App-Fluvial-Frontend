import React from 'react'

import { createRoot } from 'react-dom/client'

import { VistaHomePageOff } from './vistaHome.jsx'

import { BrowserRouter } from 'react-router-dom';

// import { View } from './appHomePage.jsx'


import ComponentRouter from './ComponentRouter.jsx';

// New Form correct.
createRoot(document.getElementById('App')).render(
    <React.StrictMode>

        <BrowserRouter>

            <ComponentRouter />

        </BrowserRouter>

    </React.StrictMode>
);


/* Antigua forma.


ReactDOM.createRoot(document.getElementById('App')).render(  // LLAMA AL COMPONENTE 'VistaHomePageOff' EN EL ELEMENTO CON EL ID 'BarraNavegacion'
    <React.StrictMode>
        <VistaHomePageOff />
    </React.StrictMode >,
)
*/
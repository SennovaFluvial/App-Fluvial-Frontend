import React from 'react'

import { createRoot } from 'react-dom/client'

import { BrowserRouter } from 'react-router-dom';

import ComponentRouter from './components/router/ComponentRouter.jsx';



// New Form correct.
createRoot(document.getElementById('App')).render(
    <React.StrictMode>
        <BrowserRouter>
            <ComponentRouter />
        </BrowserRouter>
    </React.StrictMode>
);


/*
ReactDOM.createRoot(document.getElementById('App')).render(  // LLAMA AL COMPONENTE 'VistaHomePageOff' EN EL ELEMENTO CON EL ID 'BarraNavegacion'
    <React.StrictMode>
        <VistaHomePageOff />
    </React.StrictMode >,
)
*/
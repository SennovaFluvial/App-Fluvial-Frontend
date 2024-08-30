import React from 'react'

import { createRoot } from 'react-dom/client'

import { BrowserRouter } from 'react-router-dom';

import ComponentRouter from './components/router/ComponentRouter.jsx';


createRoot(document.getElementById('App')).render(
    // <React.StrictMode>
    <BrowserRouter>
        <ComponentRouter />
    </BrowserRouter>
    // </React.StrictMode>
);

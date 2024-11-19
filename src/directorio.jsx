import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import ComponentRouter from './components/router/ComponentRouter.jsx';
import "./assets/css/generalStyles.css";
import { GlobalProvider } from './GlobalContext .jsx';

createRoot(document.getElementById('App')).render(
    <GlobalProvider>
        <BrowserRouter>
            <ComponentRouter />
        </BrowserRouter>
    </GlobalProvider>
);

import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import ComponentRouter from './components/router/ComponentRouter.jsx';
import "./assets/css/generalStyles.css";

createRoot(document.getElementById('App')).render(
    <BrowserRouter>
        <ComponentRouter />
    </BrowserRouter>
);

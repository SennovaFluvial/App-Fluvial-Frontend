// Crear un contexto global para usar el controlador en todos los componente de shipMentSend
// import React, { createContext, useContext } from 'react';
import { createContext } from 'react';
import { useContext } from 'react';
import { CreateUpdateControllerShiptment } from './CreateUpdateControllerShiptment';

const ShiptmentContext = createContext()

export const useShiptment = () => useContext(ShiptmentContext)

export const ShiptmentProvider = ({ children }) => {
    // Obtén los datos y funciones del controlador
    const {
        formData,
        setFormData,
        errorsForms,
        setErrorsForms,
        handleChange,
        handleSubmit,
        isDisabled,
        productosRemitente,
        productsToSend,
        removeProduct,
        setIsDisabled,
        numeroGuia,
        loading
    } = CreateUpdateControllerShiptment();

    return (
        <ShiptmentContext.Provider value={{
            formData,
            setFormData,
            errorsForms,
            setErrorsForms,
            handleChange,
            handleSubmit,
            isDisabled,
            productosRemitente,
            productsToSend,
            removeProduct,
            setIsDisabled,
            numeroGuia,
            loading
        }}>
            {children}
        </ShiptmentContext.Provider>
    );
};
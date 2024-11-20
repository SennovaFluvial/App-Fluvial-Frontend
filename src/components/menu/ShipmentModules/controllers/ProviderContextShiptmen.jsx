// Crear un contexto global para usar el controlador en todos los componente de shipMentSend
// import React, { createContext, useContext } from 'react'
import { createContext, useEffect, useState } from 'react'
import { useContext } from 'react'
import { CreateUpdateControllerShiptment } from './CreateUpdateControllerShiptment'

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
        loading,
        paginatedItems, // paginacion
        searchTerm, // paginacion
        handleSearchChange, // paginacion
        elementForPage, // paginacion
        currentPage, // paginacion
        setCurrentPage, // paginacion
        totalFilteredItems, // paginacion
        firstIndex, // paginacion
    } = CreateUpdateControllerShiptment()

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
            loading,
            paginatedItems, // paginacion
            searchTerm, // paginacion
            handleSearchChange, // paginacion
            elementForPage, // paginacion
            currentPage, // paginacion
            setCurrentPage, // paginacion
            totalFilteredItems, // paginacion
            firstIndex, // paginacion
        }}>
            {children}
        </ShiptmentContext.Provider>
    )
}
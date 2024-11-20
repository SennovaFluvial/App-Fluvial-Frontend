import React, { createContext, useContext, useState } from "react";

// Crear el contexto
const GlobalContext = createContext();

// Proveedor del contexto
export const GlobalProvider = ({ children }) => {
    // Estados globales
    const [shouldUpdateFlag, setShouldUpdateFlag] = useState(false);

    return (
        <GlobalContext.Provider
            value={{
                shouldUpdateFlag,
                setShouldUpdateFlag,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

// Hook personalizado para usar el contexto
export const useGlobalContext = () => {
    return useContext(GlobalContext);
};

import { useState } from "react";

/**
 * Hook personalizado para manejar la búsqueda de elementos en una lista 
 * basada en múltiples campos de búsqueda.
 *
 * Este hook permite filtrar una lista de elementos en función de un término
 * de búsqueda y campos específicos, así como la posibilidad de mapear roles
 * a sus representaciones legibles.
 *
 * @param {Array} items - Lista de elementos que se desea filtrar.
 * @param {Array} searchFields - Lista de campos en los que se realizará la búsqueda.
 * @param {Object} roleMapping - Objeto que mapea nombres de roles a sus representaciones.
 * @returns {Object} - Un objeto que contiene:
 *   - {string} searchTerm - El término de búsqueda actual.
 *   - {Function} handleSearchChange - Función para actualizar el término de búsqueda.
 *   - {Array} filteredItems - Lista de elementos filtrados según el término de búsqueda.
 */
export const useSearchFields = (items, searchFields, roleMapping) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredItems = Array.isArray(items) ? items.filter((item) =>
        searchFields.some(field => {
            const fieldValue = field.split('.').reduce((obj, key) => obj && obj[key], item);

            if (field === "roles" && Array.isArray(fieldValue)) {

                const searchRole = Object.keys(roleMapping).find(role =>
                    role.includes(searchTerm.toLowerCase())
                );

                if (searchRole) {
                    return fieldValue.some(subValue =>
                        subValue.roleEnum === roleMapping[searchRole]
                    );
                }
            }

            return fieldValue && fieldValue.toString().toLowerCase().includes(searchTerm.toLowerCase());
        })
    ) : [];

    return { searchTerm, handleSearchChange, filteredItems };
};

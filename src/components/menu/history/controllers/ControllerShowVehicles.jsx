import { useEffect, useState } from 'react'
import { useSearchFields } from '../search/SearchFields';
import { ApiService } from '../../../../class/ApiServices';

/**
 * Controlador para mostrar y gestionar la lista de vehículos.
 *
 * Este hook se encarga de obtener la lista de vehículos desde la API, gestionar la paginación 
 * y filtrar los resultados según el término de búsqueda. Permite a los componentes que lo 
 * utilizan acceder a los vehículos de manera paginada y filtrada.
 *
 * @returns {Object} Un objeto que contiene:
 * - searchTerm: Término de búsqueda actual.
 * - handleSearchChange: Función para manejar cambios en el campo de búsqueda.
 * - paginatedItems: Lista de vehículos paginados según la página actual.
 * - elementForPage: Número de elementos a mostrar por página.
 * - currentPage: Página actual de la paginación.
 * - setCurrentPage: Función para actualizar la página actual.
 * - totalFilteredItems: Total de elementos filtrados según el término de búsqueda.
 * - loading: Booleano que indica si los datos se están cargando.
 * - firstIndex: Índice del primer elemento en la página actual.
 */
export const useControllerShowVehicles = () => {

    const [vehicles, setVehicles] = useState([]);
    const [elementForPage, setElementForPage] = useState(6);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const getVehicles = async () => {
        try {
            const response = await ApiService.get("/api/v1/vehicles/all");
            setVehicles(response);
        } catch (error) {
            console.error("Error fetching vehicles:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getVehicles();
    }, []);

    const { searchTerm, handleSearchChange, filteredItems } = useSearchFields(
        vehicles,
        ["type", "model", "licensePlate", "volumeCapacity", "volumeUnit", "weightCapacity", "weightUnit"]
    );

    const totalFilteredItems = filteredItems.length;
    const totalPages = Math.ceil(totalFilteredItems / elementForPage);

    useEffect(() => {
        if (totalFilteredItems === 0) {
            setCurrentPage(1);
        } else if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [filteredItems, totalPages, currentPage, totalFilteredItems]);

    const lastIndex = currentPage * elementForPage;
    const firstIndex = lastIndex - elementForPage;
    const paginatedItems = filteredItems.slice(firstIndex, lastIndex);

    return {
        searchTerm,
        handleSearchChange,
        paginatedItems,
        elementForPage,
        currentPage,
        setCurrentPage,
        totalFilteredItems,
        loading,
        firstIndex
    }
}

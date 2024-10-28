import { useEffect, useState } from 'react'
import { useSearchFields } from '../search/SearchFields';
import { ApiService } from '../../../../class/ApiServices';

/**
 * Controlador para mostrar y gestionar la lista de empresas.
 *
 * Este hook se encarga de obtener la lista de empresas desde la API, gestionar la paginación 
 * y filtrar los resultados según el término de búsqueda. Permite manejar el estado de 
 * carga y la lógica de paginación para mostrar un número específico de empresas por página.
 *
 * @returns {Object} Un objeto que contiene:
 * - searchTerm: Término de búsqueda actual.
 * - handleSearchChange: Función para manejar cambios en el campo de búsqueda.
 * - paginatedItems: Lista de empresas paginadas según la página actual.
 * - elementForPage: Número de elementos a mostrar por página.
 * - currentPage: Página actual de la paginación.
 * - setCurrentPage: Función para actualizar la página actual.
 * - totalFilteredItems: Total de elementos filtrados según el término de búsqueda.
 * - loading: Booleano que indica si los datos se están cargando.
 * - firstIndex: Índice del primer elemento en la página actual.
 */
export const controllerShowCompany = () => {

    const [companies, setCompanies] = useState([]);
    const [elementForPage, setElementForPage] = useState(6);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const getCompanies = async () => {
        try {
            const response = await ApiService.get("/api/v1/companie/findAll");
            setCompanies(response);
        } catch (error) {
            console.error("Error fetching companies:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCompanies();
    }, []);

    const { searchTerm, handleSearchChange, filteredItems } = useSearchFields(companies, ["nit", "company", "manager", "phone", "status"]);

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

import { useEffect, useState } from 'react'
import { useSearchFields } from '../search/SearchFields';
import { ApiService } from '../../../../class/ApiServices';

/**
 * Controlador para mostrar y gestionar la lista de marineros.
 *
 * Este hook se encarga de obtener la lista de marineros desde la API, gestionar la paginación 
 * y filtrar los resultados según el término de búsqueda. Además, permite manejar el estado 
 * del formulario para la creación o edición de marineros. 
 *
 * @returns {Object} Un objeto que contiene:
 * - searchTerm: Término de búsqueda actual.
 * - handleSearchChange: Función para manejar cambios en el campo de búsqueda.
 * - paginatedItems: Lista de marineros paginados según la página actual.
 * - elementForPage: Número de elementos a mostrar por página.
 * - currentPage: Página actual de la paginación.
 * - setCurrentPage: Función para actualizar la página actual.
 * - totalFilteredItems: Total de elementos filtrados según el término de búsqueda.
 * - loading: Booleano que indica si los datos se están cargando.
 * - firstIndex: Índice del primer elemento en la página actual.
 * - formData: Datos del formulario para la creación o edición de marineros.
 * - setFormData: Función para actualizar los datos del formulario.
 * - setCrew: Función para establecer la lista de marineros.
 */
export const useControllerShowSailors = () => {

    const [crew, setCrew] = useState([]);
    const [elementForPage, setElementForPage] = useState(6);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '', lastName: '', typeDocument: '', numDocument: '', licencia: '',
        email: '', dateOfBirth: '', nationality: '', maritalStatus: '', phone: '',
        address: '', sex: '', status: '', employeeType: { typeName: 'Marinero' },
    });

    const getCrew = async () => {
        try {
            const response = await ApiService.get("/api/v1/employeefluvial/all");
            setCrew(response);
        } catch (error) {
            console.error("Error fetching employed data:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getCrew();
    }, []);

    const { searchTerm, handleSearchChange, filteredItems } = useSearchFields(
        crew,
        ["name", "lastName", "numDocument", "phone", "employeeType.typeName", "status", "nationality"]
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
        firstIndex,
        formData,
        setFormData,
        setCrew
    }
}

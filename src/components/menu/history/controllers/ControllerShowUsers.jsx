import { useEffect, useState } from 'react'
import { useSearchFields } from '../search/SearchFields';
import { ApiService } from '../../../../class/ApiServices';

/**
 * Controlador para mostrar y gestionar la lista de usuarios.
 *
 * Este hook se encarga de obtener la lista de usuarios desde la API, gestionar la paginación 
 * y filtrar los resultados según el término de búsqueda. Además, permite manejar el estado 
 * del formulario para la creación o edición de usuarios. Incluye un mapeo de roles para 
 * facilitar la identificación de roles en el sistema.
 *
 * @returns {Object} Un objeto que contiene:
 * - searchTerm: Término de búsqueda actual.
 * - handleSearchChange: Función para manejar cambios en el campo de búsqueda.
 * - paginatedItems: Lista de usuarios paginados según la página actual.
 * - elementForPage: Número de elementos a mostrar por página.
 * - currentPage: Página actual de la paginación.
 * - setCurrentPage: Función para actualizar la página actual.
 * - totalFilteredItems: Total de elementos filtrados según el término de búsqueda.
 * - loading: Booleano que indica si los datos se están cargando.
 * - firstIndex: Índice del primer elemento en la página actual.
 * - formData: Datos del formulario para la creación o edición de usuarios.
 * - setFormData: Función para actualizar los datos del formulario.
 * - setEmployed: Función para establecer la lista de empleados.
 */
export const useControllerShowUsers = () => {

    const [employed, setEmployed] = useState([]);
    const [elementForPage, setElementForPage] = useState(6);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const roleMapping = {
        "administrador": "ADMIN",
        "empleado": "EMPLOYEE",
        "superadministrador": "SUPERADMIN"
    };


    const [formData, setFormData] = useState({
        username: '',
        confirmUsername: '',
        password: '',
        confirmPassword: '',
        roleRequest: {
            roleListName: []
        },
        estado: '',
        companyName: '',
        name: '',
        lastName: '',
        typeDocument: '',
        numDocument: '',
        phone: '',
        address: '',
        cityName: '',
        departmentName: '',
        sex: '',
        birthDate: '',
        maritalStatus: '',
        codigoPais: ''
    });

    const getEmployed = async () => {
        try {
            const response = await ApiService.get("/api/v1/companie/users");
            setEmployed(response);
        } catch (error) {
            console.error("Error fetching employed data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getEmployed();
    }, []);

    const { searchTerm, handleSearchChange, filteredItems } = useSearchFields(
        employed,
        ["numDocument", "name", "lastName", "roles", "birthDate", "status", "sex", "username", "address", "company.name"],
        roleMapping
    );


    const totalFilteredItems = filteredItems.length;
    const totalPages = Math.ceil(totalFilteredItems / elementForPage);

    useEffect(() => {
        if (totalFilteredItems === 0) {
            setCurrentPage(1);
        } else if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [filteredItems, totalPages, currentPage, totalFilteredItems, employed]);

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
        setEmployed
    }
}

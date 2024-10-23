import { useEffect, useState } from 'react'
import { useSearchFields } from '../search/SearchFields';
import { ApiService } from '../../../../class/ApiServices';


export const useControllerShowCustomers = () => {

    const [loading, setLoading] = useState(true);
    const [customers, setCustomers] = useState([]);
    const [elementForPage, setElementForPage] = useState(6);
    const [currentPage, setCurrentPage] = useState(1);

    const getCustomers = async () => {
        try {
            const response = await ApiService.get('/api/v1/customers/all');
            setCustomers(response);
        } catch (error) {
            console.log('Error en obtener clientes', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCustomers();
    }, []);

    // para buscar
    const { searchTerm, handleSearchChange, filteredItems } = useSearchFields(
        customers,
        ["numDocument", "name", "lastName", "email", "phone", "address", "cityName", "personType"]
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

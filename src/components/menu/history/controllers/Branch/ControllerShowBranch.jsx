import { useEffect, useState } from 'react';
import { useSearchFields } from '../../search/SearchFields';
import { ApiService } from '../../../../../class/ApiServices';

export const ControllerShowBranches = () => {
    
    const [branches, setBranches] = useState([]);
    const [elementForPage, setElementForPage] = useState(6);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const getBranches = async () => {
        try {
            const response = await ApiService.get("/api/v1/branches/all");
            setBranches(response);
        } catch (error) {
            console.error("Error fetching branches:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getBranches();
    }, []);

    const { searchTerm, handleSearchChange, filteredItems } = useSearchFields(
        branches,
        ["nombre", "direccion", "departamento", "municipio", "companiaNombre"]
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
    };
};
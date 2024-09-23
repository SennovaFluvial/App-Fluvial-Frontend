import { useState } from "react";

export const useSearchFields = (items, searchFields) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredItems = Array.isArray(items) ? items.filter((item) =>
        searchFields.some(field => {
            const fieldValue = field.split('.').reduce((obj, key) => obj && obj[key], item);
            return fieldValue && fieldValue.toString().toLowerCase().includes(searchTerm.toLowerCase());
        })
    ) : [];

    return { searchTerm, handleSearchChange, filteredItems };
}

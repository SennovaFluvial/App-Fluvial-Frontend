import { useState } from "react";

export const useSearchFields = (items, searchFields) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredItems = items.filter((item) =>
        searchFields.some(field => {
            const fieldValue = field.split('.').reduce((obj, key) => obj && obj[key], item);
            return fieldValue !== undefined && fieldValue !== null &&
                fieldValue.toString().toLowerCase().includes(searchTerm.toLowerCase());
        })
    );

    return { searchTerm, handleSearchChange, filteredItems };
}

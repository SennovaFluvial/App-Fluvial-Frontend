import { useState } from "react";

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

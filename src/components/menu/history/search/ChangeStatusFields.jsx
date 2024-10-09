import { useEffect, useState } from "react";
import { ApiService } from "../../../../class/ApiServices";

export const useChangeStatusFields = ({ id_item, urlApiGet, urlApiPut, formData, setFormData, statusField }) => {
    const [fields, setFields] = useState([]);

    // Hook useEffect para obtener la información del usuario al montar el componente
    useEffect(() => {
        const getInfo = async () => {
            try {
                const response = await ApiService.get(urlApiGet);
                if (response) {
                    setFields(response); // Almacena los datos obtenidos en el estado local
                }
            } catch (error) {
                console.log("Error fetching data", error);
            }
        };

        getInfo();
    }, [urlApiGet]); // Dependencia para volver a ejecutar cuando cambia urlApiGet

    const handleStatusChange = async (itemId) => {
        if (!fields.length) {
            return;
        }

        const filterUserId = fields.find((item) => item.id === itemId);

        if (filterUserId) {
            const updatedFormData = { ...formData };

            Object.keys(updatedFormData).forEach(keyName => {
                if (filterUserId[keyName] !== undefined) {
                    updatedFormData[keyName] = filterUserId[keyName];
                }
            });

            // Acceso correcto a valores anidados
            updatedFormData["companyName"] = filterUserId.company ? filterUserId.company.name : '';
            updatedFormData["cityName"] = filterUserId.city ? filterUserId.city.ciudad : '';
            updatedFormData["departmentName"] = filterUserId.city && filterUserId.city.departamento ? filterUserId.city.departamento.departamento : '';

            // Acceso al rol
            if (filterUserId.roles && filterUserId.roles.length > 0) {
                updatedFormData["roleRequest"] = {
                    roleListName: filterUserId.roles.map(role => role.roleEnum), // Extrae el nombre del rol
                };
            } else {
                updatedFormData["roleRequest"] = { roleListName: [] }; // Si no hay roles, inicializa como un array vacío
            }

            // Cambia el estado del usuario
            updatedFormData[statusField] = filterUserId.status === "activo" ? "inactivo" : "activo";


            setFormData(updatedFormData);

            try {
                await ApiService.put(`${urlApiPut}${itemId}`, updatedFormData);
            } catch (error) {
                console.log("Error updating status", error);
            }
        } else {
            console.log("User not found for ID:", itemId);
        }
    };

    return {
        handleStatusChange // Devuelve la función para que pueda ser utilizada por otros componentes
    }

};

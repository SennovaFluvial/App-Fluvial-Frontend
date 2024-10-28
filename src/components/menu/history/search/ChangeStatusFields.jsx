import { useEffect, useState } from "react";
import { ApiService } from "../../../../class/ApiServices";

/**
 * Hook personalizado para gestionar el cambio de estado de campos de un item.
 *
 * Este hook se encarga de obtener la información de un item a partir de su ID,
 * actualizar el estado del formulario con los datos obtenidos y permitir 
 * la actualización del estado de un item en el servidor.
 *
 * @param {Object} params - Parámetros del hook.
 * @param {number} params.id_item - ID del item cuyo estado se va a gestionar.
 * @param {string} params.urlApiGet - URL de la API para obtener la información del item.
 * @param {string} params.urlApiPut - URL de la API para actualizar el estado del item.
 * @param {Object} params.formData - Datos del formulario que se van a actualizar.
 * @param {Function} params.setFormData - Función para actualizar el estado del formulario.
 * @param {string} params.statusField - Nombre del campo que representa el estado del item.
 * @returns {Object} - Un objeto que contiene la función `handleStatusChange` para cambiar el estado del item.
 */
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

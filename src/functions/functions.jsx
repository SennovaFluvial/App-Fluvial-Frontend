import { ApiService } from "../class/ApiServices";

/**
 * Maneja y actualiza los errores en los formularios.
 * 
 * @param {Function} setErrorsForms - Función para actualizar el estado de errores del formulario.
 * @param {string} nameE - Nombre del campo del formulario que contiene el error.
 * @param {string} messegue - Mensaje de error a mostrar para el campo especificado.
 */
export const handleStatusError = (setErrorsForms, nameE, messegue) => {
    setErrorsForms(
        prev => ({
            ...prev, [nameE]: messegue
        })
    )
}

/**
 * Realiza una solicitud a la API para obtener y mostrar información de clientes.
 * 
 * @param {Function} setPeopleInfo - Función para establecer el estado con la información de los clientes.
 * @param {string} urlApi - URL de la API desde donde se obtendrán los datos de los clientes.
 * @returns {Promise<void>} - Retorna una promesa que se resuelve cuando se obtienen los datos o se captura un error.
 */
export const showCustomers = async (setPeopleInfo, urlApi) => {
    try {
        const response = await ApiService.get(urlApi);
        if (response) {
            setPeopleInfo(response);
        }
    } catch (error) {
        console.error("Ocurrió un error al intentar mostrar los datos", error);
    }
};
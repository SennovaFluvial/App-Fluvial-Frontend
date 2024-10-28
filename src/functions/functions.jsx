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

/**
 * Elimina un error específico del estado de errores de un formulario.
 *
 * @param {Function} setErrorsForms - Función que actualiza el estado de los errores del formulario.
 * @param {string} name - El nombre del campo cuyo error debe eliminarse.
 * 
 * @returns {void} - No retorna ningún valor, solo actualiza el estado de errores.
 */
export const clearError = (setErrorsForms, name) => {
    setErrorsForms(prevErrors => {
        const { [name]: removed, ...rest } = prevErrors;
        return rest;
    });
}

/**
 * Valida los campos obligatorios de un formulario antes de enviarlo.
 *
 * Esta función recorre los elementos del formulario y verifica si los campos
 * obligatorios están completos. Si algún campo requerido está vacío, se
 * establece un error correspondiente, exceptuando el campo 
 * "specialHandlingInstructions".
 *
 * @param {function} setErrorsForms - Función para establecer los errores de validación en el formulario.
 * @param {Object} formData - Objeto que contiene los datos del formulario, donde cada propiedad representa un campo.
 * @param {Object} event - El evento del formulario que contiene los elementos a validar.
 * @returns {boolean} - Devuelve `true` si hay errores en el formulario, `false` en caso contrario.
 *
 * @example
 * const hasErrors = validationFieldSubmit(setErrorsForms, formData, event);
 * if (hasErrors) {
 *     console.log("Hay errores en el formulario.");
 * } else {
 *     console.log("El formulario es válido.");
 * }
 */
export const validationFieldSubmit = (setErrorsForms, formData, event) => {
    const formElements = event.target.elements;
    let hasErrors = false;

    // Itera sobre los elementos del formulario
    for (let element of formElements) {
        // Verifica que el elemento tenga un nombre y sea un string en formData
        if (
            element.name &&
            typeof formData[element.name] === 'string' &&
            !formData[element.name].trim() &&
            element.name !== "specialHandlingInstructions" // Evita validar este campo
        ) {
            handleStatusError(setErrorsForms, element.name, "Campo obligatorio");
            hasErrors = true;
        }
    }

    return hasErrors;
}

/**
 * Realiza una solicitud HTTP GET a la API para obtener información sobre una empresa
 * y actualiza el campo correspondiente en el estado del formulario.
 *
 * @async
 * @function getCompanyUser
 * @param {string} url_api - La URL de la API desde donde se obtendrá la información de la empresa.
 * @param {string} fieldName - El nombre del campo en el estado `formData` que será actualizado con el nombre de la empresa.
 * @param {function} setFormData - La función que actualiza el estado del formulario (por ejemplo, `setState` en React).
 * 
 * @returns {Promise<void>} - No devuelve ningún valor, pero actualiza el estado del formulario si la solicitud es exitosa.
 * 
 * @throws {Error} - Lanza un error en caso de que la solicitud a la API falle.
 * 
 * @example
 * // Uso de la función para obtener el nombre de la empresa y actualizar el campo 'companyName'
 * getCompanyUser("/api/v1/companie/users", "companyName", setFormData);
 */
export const getCompanyUser = async (url_api, fieldName, setFormData) => {
    try {
        const response = await ApiService.get(url_api);

        if (response) {
            setFormData(
                prevState => ({
                    ...prevState, [fieldName]: response[0].company.name
                })
            );
        }

    } catch (error) {
        console.error("Error al intentar obtener el nombre de la empresa", error);
    }
}

/**
 * Función getInfoProducts
 *
 * Esta función asíncrona se encarga de obtener información sobre productos
 * desde una API y actualizar el estado de los campos en consecuencia.
 *
 * @param {function} setFieldsUpdate - Función para actualizar el estado de los campos.
 * @param {string} urlApi - La URL de la API desde la cual se obtiene la información de los productos.
 * 
 * @returns {Promise<void>} - No devuelve nada, pero actualiza el estado de los campos
 *                            si la respuesta es válida.
 *
 * @throws {Error} - Registra un error en la consola si la solicitud API falla.
 */
export const getInfoProducts = async (setFieldsUpdate, urlApi) => {
    try {
        const response = await ApiService.get(urlApi);

        if (response) {
            setFieldsUpdate(response);
        }

    } catch (error) {
        console.error("Error al intentar obtener la informacion de los productos", error);
    }
}

/**
 * Función idIdentifier
 *
 * Esta función asíncrona busca la identificación de una categoría de producto 
 * basándose en su nombre y actualiza el estado del formulario con la ID de 
 * la categoría correspondiente.
 *
 * @param {string} categoryName - El nombre de la categoría que se busca.
 * @param {function} setFormData - Función para actualizar el estado del formulario.
 * 
 * @returns {Promise<void>} - No devuelve nada, pero actualiza el estado 
 *                            del formulario si se encuentra la categoría.
 *
 * @throws {Error} - Registra un error en la consola si la solicitud API falla.
 */
export const idIdentifier = async (categoryName, setFormData) => {
    try {
        const response = await ApiService.get("/api/v1/product-category/all");

        if (response && Array.isArray(response)) {
            const filterElement = response.find(item => item.categoryName === categoryName);

            if (filterElement) {
                setFormData(prevState => ({
                    ...prevState,
                    category: {
                        ...prevState.category,
                        categoryId: filterElement.categoryId
                    }
                }));
            }
        }
    } catch (error) {
        console.error("Error fetching product categories:", error);
    }
};

/**
 * Maneja la cancelación de acciones y redirige según la página de origen.
 *
 * Esta función verifica el origen de la acción y redirige al usuario a la URL correspondiente
 * dependiendo de si la acción proviene del menú o de otra página específica.
 *
 * @param {Object} params - Los parámetros de la función.
 * @param {string} params.from - Indica de dónde se originó la acción. 
 * Si es 'menu', redirige a '/adminSection'.
 * @param {string} params.namePageList - El nombre de la página que determina la redirección condicional.
 * @param {string} params.urlPageList - La URL a la que redirigir si `from` no coincide con 'menu'.
 * @param {function} params.navigate - Función de navegación para redirigir a la URL correspondiente.
 * 
 * @returns {void} - Redirige a la URL correspondiente utilizando `navigate`.
 *
 * Ejemplo de uso:
 * ```javascript
 * handleCancel({
 *     from: 'menu',
 *     urlPageList: '/someOtherPage',
 *     navigate: navigateFunction
 * });
 * ```
 */
export const handleCancel = ({ from, urlPageList, navigate }) => {
    if (from === 'menu') {
        return navigate('/adminSection');
    } else {
        return navigate(urlPageList);
    }
};

/**
 * Completa los campos de un objeto de datos de formulario fusionando los valores de un elemento filtrado
 * obtenido de un arreglo de respuestas de la API según el ID proporcionado.
 *
 * @param {Object} params - El objeto de parámetros.
 * @param {Object} params.formData - El objeto de datos de formulario original que contiene los campos a actualizar.
 * @param {number} params.id - El ID utilizado para encontrar el elemento correspondiente en el arreglo de respuestas de la API.
 * @param {Array} params.arrayApiResponse - Un arreglo de objetos que representan las respuestas de la API,
 * cada uno conteniendo un ID y los campos correspondientes para actualizar en los datos del formulario.
 * 
 * @returns {Object} Un nuevo objeto de datos de formulario con campos actualizados basados en el elemento filtrado.
 */
export const complateFields = ({ formData, id, arrayApiResponse }) => {

    const copyFormData = { ...formData };

    const filteredElement = arrayApiResponse.find((itemFilter) => itemFilter.id === parseInt(id, 10));

    if (filteredElement) {
        Object.keys(filteredElement).forEach((key) => {
            if (key in copyFormData) {
                copyFormData[key] = filteredElement[key];
            }
        });
    }

    return copyFormData;
};

/**
 * Obtiene elementos de un endpoint específico.
 *
 * @param {string} urlEndpoint - La URL del endpoint desde el cual obtener los elementos.
 * @returns {Promise<Array>} Una promesa que resuelve en un arreglo de elementos obtenidos.
 */
export const getElementByEndpoint = async (urlEndpoint) => {
    try {
        const response = await ApiService.get(urlEndpoint);
        return response || [];
    } catch (error) {
        console.error(error);
        return [];
    }
};
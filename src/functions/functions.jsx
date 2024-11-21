import { ApiService } from "../class/ApiServices"
import { saveAs } from 'file-saver'

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
        const response = await ApiService.get(urlApi)
        if (response) {
            setPeopleInfo(response)
        }
    } catch (error) {
        console.error("Ocurrió un error al intentar mostrar los datos", error)
    }
}

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
        const { [name]: removed, ...rest } = prevErrors
        return rest
    })
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
 * const hasErrors = validationFieldSubmit(setErrorsForms, formData, event)
 * if (hasErrors) {
 *     console.log("Hay errores en el formulario.")
 * } else {
 *     console.log("El formulario es válido.")
 * }
 */
export const validationFieldSubmit = (setErrorsForms, formData, event) => {
    const formElements = event.target.elements
    let hasErrors = false

    // Itera sobre los elementos del formulario
    for (let element of formElements) {
        // Verifica que el elemento tenga un nombre y sea un string en formData
        if (
            element.name &&
            typeof formData[element.name] === 'string' &&
            !formData[element.name].trim() &&
            element.name !== "specialHandlingInstructions" // Evita validar este campo
        ) {
            handleStatusError(setErrorsForms, element.name, "Campo obligatorio")
            hasErrors = true
        }
    }

    return hasErrors
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
 * getCompanyUser("/api/v1/companie/users", "companyName", setFormData)
 */
export const getCompanyUser = async (url_api, fieldName, setFormData) => {
    try {
        const response = await ApiService.get(url_api)

        if (response) {
            setFormData(
                prevState => ({
                    ...prevState, [fieldName]: response[0].company.name
                })
            )
        }

    } catch (error) {
        console.error("Error al intentar obtener el nombre de la empresa", error)
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
        const response = await ApiService.get(urlApi)

        if (response) {
            setFieldsUpdate(response)
        }

    } catch (error) {
        console.error("Error al intentar obtener la informacion de los productos", error)
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
        const response = await ApiService.get("/api/v1/product-category/all")

        if (response && Array.isArray(response)) {
            const filterElement = response.find(item => item.categoryName === categoryName)

            if (filterElement) {
                setFormData(prevState => ({
                    ...prevState,
                    category: {
                        ...prevState.category,
                        categoryId: filterElement.categoryId
                    }
                }))
            }
        }
    } catch (error) {
        console.error("Error fetching product categories:", error)
    }
}

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
 * })
 * ```
 */
export const handleCancel = ({ from, urlPageList, navigate }) => {
    if (from === 'menu') {
        return navigate('/adminSection')
    } else {
        return navigate(urlPageList)
    }
}

/**
 * Completa los campos de un formulario con datos de un elemento filtrado
 * de una respuesta de API, asignando valores a campos anidados si es necesario.
 *
 * @param {Object} params - Objeto que contiene los parámetros necesarios.
 * @param {Object} params.formData - Datos del formulario que se van a completar.
 * @param {string|number} params.id - ID del elemento que se utilizará para buscar
 *                                      en la respuesta de la API.
 * @param {Array} params.arrayApiResponse - Array de objetos que representa la
 *                                           respuesta de la API.
 * @param {string} params.nameFieldId - Nombre del campo en los objetos de la
 *                                        respuesta de la API que se utilizará
 *                                        para buscar el elemento específico.
 * 
 * @returns {Object} - Un nuevo objeto que representa los datos del formulario
 *                     completos, con valores actualizados de acuerdo a los datos
 *                     del elemento filtrado.
 */
export const completeFields = ({ formData, id, arrayApiResponse, nameFieldId }) => {
    const copyFormData = { ...formData }
    const filteredElement = arrayApiResponse.find((itemFilter) => itemFilter[nameFieldId] === parseInt(id, 10))

    if (filteredElement) {
        Object.keys(copyFormData).forEach((key) => {

            if (copyFormData[key] && typeof copyFormData[key] === 'object') {

                Object.keys(copyFormData[key]).forEach((nestedKey) => {
                    if (nestedKey in filteredElement) {

                        copyFormData[key][nestedKey] = filteredElement[nestedKey]
                    }
                })
            } else if (key in filteredElement) {

                copyFormData[key] = filteredElement[key]
            }
        })
    }

    return copyFormData
}

/**
 * Obtiene elementos de un endpoint específico.
 *
 * @param {string} urlEndpoint - La URL del endpoint desde el cual obtener los elementos.
 * @returns {Promise<Array>} Una promesa que resuelve en un arreglo de elementos obtenidos.
 */
export const getElementByEndpoint = async (urlEndpoint) => {
    try {
        const response = await ApiService.get(urlEndpoint)
        return response || []
    } catch (error) {
        console.error(error)
        return []
    }
}

/**
 * Filtra y elimina caracteres no permitidos en una cadena.
 *
 * @function sanitizedValue
 * @param {string} value - La cadena de texto que se desea limpiar.
 * @returns {string} - La cadena limpia que contiene solo caracteres permitidos.
 *
 * @description
 * Esta función toma una cadena de entrada y elimina cualquier carácter que no sea 
 * letras, números, espacios, el símbolo "@", punto ".", o guión "-". Utiliza una expresión 
 * regular para reemplazar los caracteres no permitidos con una cadena vacía, devolviendo
 * así solo los caracteres válidos.
 *
 * @example
 * sanitizedValue("Hello!@World#2024") // "Hello@World2024"
 *
 * @example
 * sanitizedValue("user@example.com") // "user@example.com"
 */
export const sanitizedValue = (value) => {
    const validCharactersRegex = /[^a-zA-Z0-9\s@.\-áéíóúÁÉÍÓÚñÑ]/g
    return value.replace(validCharactersRegex, '')
}


/**
 * Realiza una solicitud a la API para descargar un archivo y lo guarda en el dispositivo con el nombre y la extensión especificada.
 *
 * @param {string} url_report_api - La URL de la API desde la cual se va a descargar el archivo.
 * @param {string} name_field - El nombre del archivo que se va a guardar.
 * @param {string} [extension='.pdf'] - La extensión del archivo. Por defecto, se establece como `.pdf`.
 *
 * @throws {Error} Lanza un error si la respuesta no es un archivo válido o si ocurre algún otro problema en el proceso.
 */
export const downloadReport = async (url_report_api, name_field, extension = '.pdf') => {
    try {
        // Realiza la solicitud a la API que ahora devuelve un Blob (archivo)
        const response = await ApiService.getReports(url_report_api)

        // Verifica si la respuesta contiene un Blob
        if (response && response instanceof Blob) {
            // Guardamos el archivo con la extensión especificada
            saveAs(response, `${name_field}${extension}`)
        } else {
            throw new Error('La respuesta no es un archivo válido.')
        }
    } catch (error) {
        console.error("Error al descargar el informe:", error)
        alert(`Hubo un error al intentar descargar el informe: ${error.message}`)
    }
}

/**
 * Obtiene el identificador de un documento basado en un número de documento específico.
 *
 * Esta función hace una solicitud a una API para obtener una lista de objetos y luego busca el objeto
 * cuyo valor en el campo `nameFielDocument` coincida con el `numDocument` proporcionado. Si encuentra el objeto,
 * retorna su identificador de lo contrario, retorna `null`.
 *
 * @param {Object} params - Parámetros para la solicitud.
 * @param {string} params.url_api - La URL de la API para obtener los datos.
 * @param {string} params.nameFielDocument - El nombre del campo en el objeto donde se encuentra el número de documento.
 * @param {string|number} params.numDocument - El número de documento para buscar.
 *
 * @returns {number|null} El identificador del documento si se encuentra, o `null` si no se encuentra o si ocurre un error.
 */
export const getIdForNumDocument = async ({ url_api, nameFielDocument, numDocument }) => {
    try {
        const response = await ApiService.get(url_api)
        // Verifica si response es un arreglo antes de hacer la búsqueda
        if (Array.isArray(response)) {
            // Retorna directamente el id si se encuentra, de lo contrario retorna null
            return response.find(item => item[nameFielDocument] === numDocument)?.id || null
        }
        return null
    } catch (error) {
        console.log('Error al intentar obtener el identificador por número de documento', numDocument, error)
        return null // Retorna null si hay un error
    }
}

/**
 * Obtiene los productos asociados a un número de documento.
 * 
 * @param {string} numDocument - El número de documento para el que se desean obtener los productos.
 * @returns {Array} Devuelve un arreglo de productos obtenidos de la API, o un arreglo vacío en caso de error o si no se pasa un número de documento.
 * 
 * @throws {Error} Si ocurre un error al hacer la solicitud a la API.
 */
export const getProductsByDocumentNumber = async (numDocument) => {
    if (!numDocument) {
        console.error("Número de documento es requerido.")
        return []
    }

    try {
        const response = await ApiService.get(`/api/v1/product/document/${numDocument}/products`)
        return response || []
    } catch (error) {
        console.error(`Error al obtener los productos para el documento ${numDocument}:`, error)
        return []
    }
}

/**
 * Filtra los productos que tienen un `id` presente en el arreglo de `ids`.
 *
 * Esta función toma dos parámetros:
 * - `products`: Un arreglo de objetos de productos. Cada objeto de producto debe tener una propiedad `id` que se utilizará para la comparación.
 * - `ids`: Un arreglo de valores `id` con los cuales se desea filtrar los productos. Solo los productos cuyos `id` estén en este arreglo serán devueltos.
 *
 * @param {Array} products - Un arreglo de objetos de productos, donde cada producto tiene una propiedad `id`.
 * @param {Array} ids - Un arreglo de `id`s que se utilizarán para filtrar los productos.
 *
 * @returns {Array} Un nuevo arreglo con los productos cuyo `id` está presente en el arreglo `ids`.
 *
 * @example
 * const products = [
 *   { id: 1, name: "Producto 1" },
 *   { id: 2, name: "Producto 2" },
 *   { id: 3, name: "Producto 3" },
 *   { id: 4, name: "Producto 4" }
 * ]
 * 
 * const ids = [1, 3]
 * 
 * const result = showProductsToSend(products, ids)
 * console.log(result)
 * // Resultado: [
 * //   { id: 1, name: "Producto 1" },
 * //   { id: 3, name: "Producto 3" }
 * // ]
 */
export const showProductsToSend = (products, ids) => {
    return products.filter((item) => ids.includes(item.id))
}

/**
 * Elimina un producto específico de las listas `productosIds` y `productsToSend` para actualizar el estado en la interfaz.
 * 
 * @param {function} setProductsToSend - Función para actualizar el estado de `productsToSend`, una lista de productos seleccionados.
 * @param {function} setFormData - Función para actualizar el estado de `formData`, que contiene los `productosIds`.
 * @param {number} id - El ID del producto que se desea eliminar de las listas `productosIds` y `productsToSend`.
 */
export const removeProductToSend = (setProductsToSend, setFormData, id) => {
    if (id) {
        setFormData(prevState => ({
            ...prevState,
            productosIds: prevState.productosIds.filter(productId => productId !== id)
        }))

        setProductsToSend(prevProductsToSend => prevProductsToSend.filter(product => product.id !== id))
    }
}

/**
 * Obtiene un elemento específico de una lista consultando un endpoint y buscando coincidencias por un campo.
 * @param {string} campoBuscar - El nombre del campo en el que se buscará la coincidencia.
 * @param {any} valorIdentificador - El valor a buscar dentro del campo especificado.
 * @param {string} apiUrl - La URL de la API REST de la cual obtener los datos.
 * @returns {Promise<Array<Object>>} - Retorna un array con el objeto encontrado o un array vacío si no hay coincidencias.
 */
export const getElementoPorCampo = async (campoBuscar, valorIdentificador, apiUrl) => {
    try {
        const respuesta = await ApiService.get(apiUrl)

        if (respuesta) {
            // Buscar coincidencia en el campo especificado
            const elemento = respuesta.find((item) => item[campoBuscar] == valorIdentificador)
            return elemento ? [elemento] : [] // Retorna un array con el elemento o un array vacío si no se encuentra
        }
    } catch (error) {
        console.log(`Error al filtrar la información con identificador ${valorIdentificador} con valor - ${campoBuscar}:`, error)
        return []
    }
}

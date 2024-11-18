import instance from "../config/AxiosApi";

/**
 * ApiService es una clase que proporciona métodos estáticos para interactuar con una API.
 * 
 * Incluye métodos para realizar solicitudes HTTP de diferentes tipos:
 * 
 * - `post(url_api, data, headers={})`: Envía una solicitud POST a la URL especificada con los datos y encabezados proporcionados.
 * - `put(url_api, data, headers={})`: Envía una solicitud PUT a la URL especificada con los datos y encabezados proporcionados.
 * - `get(url_api)`: Envía una solicitud GET a la URL especificada y devuelve los datos obtenidos.
 * 
 * Cada método maneja las solicitudes HTTP con encabezados predeterminados y personalizados según sea necesario,
 * y proporciona manejo de errores básico para cada solicitud.
 */
export class ApiService {

    /**
    * Envía una solicitud POST a la URL proporcionada con los datos y encabezados especificados.
    * 
    * @param {string} url_api - La URL a la que se enviará la solicitud POST.
    * @param {object} data - Los datos que se enviarán en el cuerpo de la solicitud POST.
    * @param {object} [headers={}] - Opcional. Un objeto de encabezados personalizados para incluir en la solicitud. 
    *                                 Si no se proporcionan encabezados, se usa un encabezado predeterminado.
    * 
    * @returns {Promise<void>} - Una promesa que se resuelve cuando la solicitud se completa. No devuelve datos específicos.
    * 
    * @throws {Error} - Lanza un error si la solicitud POST falla. El error puede contener información adicional sobre la respuesta del servidor.
    */
    static async post(url_api, data, headers = {}) {
        try {

            // Convierte los datos a formato JSON
            const jsonData = JSON.stringify(data);

            // Realiza una solicitud POST a la API con los datos y encabezados proporcionados
            const response = await instance.post(url_api, jsonData, {
                headers: {
                    'Content-Type': 'application/json',  // Encabezado predeterminado para especificar el tipo de contenido
                    ...headers // Combina encabezados predeterminados con los proporcionados por el usuario
                },
            });

            // Muestra un mensaje en la consola si la solicitud es exitosa
            // console.log("Respuesta del servidor:", response.data);
            return url_api == '/auth/log-in' ? response : response.data;

        } catch (error) {

            // Muestra un mensaje de error en la consola si ocurre un problema con la solicitud
            console.error('Error al crear el usuario:', error.response ? error.response.data : error.message);

            throw error;
        }
    }
    static async put(url_api, data, headers = {}) {
        try {

            // Convierte los datos a formato JSON
            const jsonData = JSON.stringify(data);


            // Realiza una solicitud POST a la API con los datos y encabezados proporcionados
            const response = await instance.put(url_api, jsonData, {
                headers: {
                    'Content-Type': 'application/json',  // Encabezado predeterminado para especificar el tipo de contenido
                    ...headers // Combina encabezados predeterminados con los proporcionados por el usuario
                },
            });

            // Muestra un mensaje en la consola si la solicitud es exitosa
            // console.log("Respuesta del servidor:", response.data);
            return response.data

        } catch (error) {

            // Muestra un mensaje de error en la consola si ocurre un problema con la solicitud
            console.error('Error al Actualizar el usuario:', error.response ? error.response.data : error.message);

            throw error;
        }
    }

    /**
     * Realiza una solicitud GET a la URL proporcionada y devuelve los datos obtenidos.
     * 
     * @param {string} url_api - La URL a la que se enviará la solicitud GET.
     * 
     * @returns {Promise<any>} - Una promesa que se resuelve con los datos obtenidos de la solicitud GET. 
     *                            Los datos devueltos son del tipo `any` ya que pueden variar dependiendo de la respuesta de la API.
     * 
     * @throws {Error} - Lanza un error si la solicitud GET falla. El error puede contener información adicional sobre la respuesta del servidor, si está disponible.
     */
    static async get(url_api) {
        try {

            // Realiza la solicitud GET a la API y espera la respuesta
            const response = await instance.get(url_api);

            // Devuelve los datos obtenidos
            return response.data;

        } catch (error) {

            // Muestra un mensaje de error en la consola, incluyendo información del error si está disponible
            console.error("Error al obtener los datos:", error.response ? error.response.data : error.message);
            throw error;
        }
    }

    static async getReports(url_api) {
        try {
            // Realiza la solicitud GET a la API, configurando la respuesta como 'blob'
            const response = await instance.get(url_api, { responseType: 'blob' });

            // Devuelve el blob obtenido (que es el archivo PDF)
            return response.data;  // Esto será un Blob
        } catch (error) {
            // Muestra un mensaje de error en la consola, incluyendo información del error si está disponible
            console.error("Error al obtener los datos:", error.response ? error.response.data : error.message);
            throw error;
        }
    }

}
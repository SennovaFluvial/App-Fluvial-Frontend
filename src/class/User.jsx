import instance from "../config/AxiosApi";

/**
 * Clase que gestiona operaciones relacionadas con el usuario.
 * @class
 */
export class User {

    /**
     * Registra un nuevo usuario.
     * 
     * Envía una solicitud POST a la ruta `/auth/sign-up` con los datos del usuario en formato JSON.
     * Si la solicitud es exitosa, devuelve un objeto que indica que el usuario fue registrado correctamente.
     * En caso de error, devuelve un objeto con un mensaje de error.
     * 
     * @param {Object} data - Los datos del usuario a registrar. Debe contener toda la información necesaria para el registro.
     * @param {string} data.username - Nombre de usuario.
     * @param {string} data.password - Contraseña del usuario.
     * @param {string} [data.email] - Correo electrónico del usuario (opcional).
     * @param {string} [data.fullName] - Nombre completo del usuario (opcional).
     * @param {string} [data.role] - Rol del usuario (opcional).
     * @returns {Promise<{success: boolean, message: string}>} - Un objeto que indica si el registro fue exitoso o no y un mensaje asociado.
     * 
     * @throws {Error} Lanza un error si la solicitud falla. El mensaje de error dependerá de la respuesta del servidor o del error de la solicitud.
     */
    static async sign_up(data) {
        try {
            const jsonData = JSON.stringify(data);

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            await instance.post("/auth/sign-up", jsonData, config);
            console.log('Usuario registrado');

            return { success: true, message: 'Usuario registrado correctamente' };

        } catch (error) {
            console.error('Error en el registro:', error.response ? error.response.data : error.message);
            return { success: false, message: 'Error al registrar el usuario. Intenta de nuevo.' };
        }
    }
}
import axios from "axios"; // Se importa 

// / Se crea una instancia de Axios con una configuración básica
const instance = axios.create({
    // Se define la URL base para todas las solicitudes realizadas con esta instancia de Axios
    baseURL: 'https://fluvial.up.railway.app/api'
})

// Se configura un interceptor de solicitud
// Los interceptores de solicitud se ejecutan ANTES de que la solicitud salga del cliente al servidor
instance.interceptors.request.use(config => {

    // Se obtiene el token almacenado en el navegador durante el inicio de sesión
    const token = localStorage.getItem('token')

    // Si el token existe, agrega un encabezado de autorización a la solicitud
    if (token) {

        // Se incluye el token en el encabezado de autorización
        config.headers.Authorization = `Bearer ${token}`;
    }

    // Se retorna la configuración de la solicitud
    return config

}, error => {
    // Si ocurre un error durante la configuración de la solicitud, se rechaza la promesa para que pueda ser manejado más adelante
    return Promise.reject(error);

})

export default instance;
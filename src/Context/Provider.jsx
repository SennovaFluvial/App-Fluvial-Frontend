import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import instance from '../config/AxiosApi';
import { useNavigate } from 'react-router';
// Crea un contexto para compartir el estado entre componentes.
const NewContext = createContext();

/**
 * Proveedor de contexto que envuelve a los componentes hijos y proporciona acceso al estado compartido.
 * @function
 * @param {Object} props - Las propiedades del componente.
 * @param {React.ReactNode} props.children - Los componentes hijos que estarán envueltos por este proveedor.
 * @returns {React.ReactElement} El componente `Provider` que envuelve a sus hijos con el contexto.
 */
export const Provider = ({ children }) => {

    const nav = useNavigate();

    const [users, setUsers] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [deptos, setDeptos] = useState([]);
    const [cities, setCities] = useState([]);
    const [customers, setCustomers] = useState([]);

    /* F U N C I O N E S */

    /**
     * Obtiene la lista de usuarios desde la API y actualiza el estado de los usuarios.
     * @async
     * @function
     * @returns {Promise<void>} No retorna ningún valor.
     * @throws {Error} Lanza un error si hay un problema al intentar obtener los datos de los usuarios.
     */
    const getUsers = useCallback(async () => {
        try {
            const response = await instance.get('/api/v1/users');
            setUsers(response.data)

        } catch (error) {
            console.log('error en obtener empleados')

        }
    }, [])

    /**
     * Obtiene la lista de empresas desde la API y actualiza el estado de las empresas.
     * @async
     * @function
     * @returns {Promise<void>} No retorna ningún valor.
     * @throws {Error} Lanza un error si hay un problema al intentar obtener los datos de las empresas.
     */
    const getCompanies = useCallback(async () => {
        try {
            const response = await instance.get('/api/v1/findAll');
            setCompanies(response.data);

        }
        catch (error) {
            // console.error('Error al intentar obtener los datos de las empresas:', error.response ? error.response.data : error.message);
            console.log('error en obtener empresas')
        }
    }, [])

    /**
     * Obtiene la lista de departamentos desde la API y actualiza el estado de los departamentos.
     * @async
     * @function
     * @returns {Promise<void>} No retorna ningún valor.
     * @throws {Error} Lanza un error si hay un problema al intentar obtener los datos de los departamentos.
     */
    const getDepto = useCallback(async () => {
        try {
            const response = await instance.get('/v1/all');
            setDeptos(response.data);

        } catch (error) {
            // console.error('Error al intentar obtener los datos de los departamentos:', error.response ? error.response.data : error.message);
            console.log('error en obtener departamentos')
        }
    }, [])


    /**
     * Actualiza la información de un usuario en la API.
     * @async
     * @function
     * @param {Object} params - Objeto que contiene los parámetros para actualizar el usuario.
     * @param {number} params.id_user - El identificador del usuario a actualizar.
     * @param {Object} params.dataUser - Los nuevos datos del usuario.
     * @returns {Promise<void>} No retorna ningún valor.
     * @throws {Error} Lanza un error si hay un problema al intentar actualizar los datos del usuario.
     */
    const updateUser = async ({ id_user, dataUser }) => {
        try {
            // Se configura el tipo especifico de dato a enviar en la solicitud JSON
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            // Convierte los datos a formato JSON
            const jsonData = JSON.stringify(dataUser);
            // Convierte los datos a formato JSON
            const response = await instance.put(`/auth/update/${id_user}`, jsonData, config);
            // console.log('Usuario actualizado:', response.data);

            // Actualiza la lista de usuarios
            getUsers();

            // Navega a la sección de administración
            nav('adminSection/show-users');

        } catch (error) {
            console.error('Error al actualizar el usuario:', error.response ? error.response.data : error.message);
        }
    }

    const createUser = async ({ dataUser }) => {
        try {
            // Se configura el tipo especifico de dato a enviar en la solicitud JSON
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            // Convierte los datos a formato JSON
            const jsonData = JSON.stringify(dataUser);
            // Convierte los datos a formato JSON
            const response = await instance.post('/auth/sign-up', jsonData, config);
            // console.log('Usuario actualizado:', response.data);

            // Actualiza la lista de usuarios
            getUsers();

            // Navega a la sección de administración
            nav('adminSection/show-users');

        } catch (error) {
            console.error('Error al actualizar el usuario:', error.response ? error.response.data : error.message);
        }
    }

    /**
     * Obtiene la lista de ciudades desde la API y actualiza el estado `cities`.
     * @async
     * @function
     * @returns {Promise<void>} No retorna ningún valor.
     * @throws {Error} Lanza un error si hay un problema al intentar obtener los datos de las ciudades.
     */
    const getCities = useCallback(async () => {
        try {
            const response = await instance.get('/api/all');
            setCities(response.data);

        } catch (error) {
            // console.error('Error al intentar obtener los datos de las ciudades:', error.response ? error.response.data : error.message);
            console.log('error en obtener ciudades')
        }
    }, [])


    const getCustomers = useCallback(async () => {
        try {
            const response = await instance.get('/api/customers');
            setCustomers(response.data);

        } catch (error) {
            // console.error('Error al actualizar el usuario:', error.response ? error.response.data : error.message);
            console.log('error en obtener clientes')
        }
    })



    /* LLAMADO FETCH */

    const fetchData = useCallback(async () => {
        try {
            await Promise.all([getUsers(), getCompanies(), getDepto(), getCities(), getCustomers()]);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, [])

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetchData(); // Solo si está autenticado, realiza las solicitudes
        }
    }, [fetchData]);

    // Devuelve el contexto con el estado y funciones disponibles para los componentes hijos.
    return (
        <NewContext.Provider value={{ users, getUsers, companies, getCompanies, deptos, updateUser, cities, customers, getCustomers }}>
            {children}
        </NewContext.Provider>

    )
}

/**
 * Hook personalizado para acceder al contexto `NewContext`.
 * @function
 * @returns {Object} El contexto proporcionado por `NewContext`, incluyendo el estado y funciones disponibles.
 * @example
 * const { users, companies, deptos, updateUser } = useNewContext();
 */
export const useNewContext = () => {
    return useContext(NewContext)
}



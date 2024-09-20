import { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios'; // Se importa la librería de axios
import Swal from 'sweetalert';

export const useControllerLogin = ({ setUser }) => {

    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const nav = useNavigate();

    /**
     * Función para manejar el inicio de sesión del usuario.
     * 
     * @param {React.FormEvent} event - Evento del formulario de inicio de sesión.
     */
    const login = async (event) => {
        event.preventDefault();

        if (!username || !password) {
            setError('Ingrese datos válidos');
            Swal('Error', 'Por favor, ingrese su nombre de usuario y contraseña.', 'error');
            return;
        }

        try {
            const response = await axios.post('https://fluvial.up.railway.app/auth/log-in', {
                username: username,
                password: password
            });

            // Verifica si la respuesta contiene un mensaje de error
            if (response.data.message === 'User not found') {
                setError('Usuario no encontrado con el correo ', response.data.username);
                Swal('Error', 'Usuario no encontrado.', 'error');
                return;
            }

            const currentTime = new Date().getTime();
            localStorage.setItem('token', response.data.jwt);
            localStorage.setItem('tokenTimestamp', currentTime);

            const user = {
                username: response.data.username,
                status: response.data.estado,
                companyStatus: response.data.companyStatus,
                rol: response.data.roles[0]
            };
            localStorage.setItem('user', JSON.stringify(user));

            if (user.status !== 'activo') {
                setError('El usuario se encuentra en un estado de Inactivo. Por favor, comuníquese con el gerente.');
                setUser(null);
                Swal('Error', 'El usuario se encuentra inactivo.', 'error');
                return;
            }

            if (user.companyStatus !== 'activo') {
                setError('La empresa a la que está asociado se encuentra inactiva.');
                setUser(null);
                Swal('Error', 'La empresa está inactiva.', 'error');
                return;
            }

            setUser(user);
            Swal('Éxito', 'Inicio de sesión exitoso.', 'success');
            nav('/adminSection');

        } catch (error) {
            // Manejo de errores específicos
            if (error.response) {
                const { status, data } = error.response;

                // Caso 1: Usuario no encontrado
                if (status === 200 && data.message === 'User not found') {
                    const errorMessage = 'Usuario no encontrado';
                    setError(errorMessage);
                    Swal('Error', errorMessage, 'error');
                    return;
                }

                // Caso 2: Contraseña incorrecta (código 401)
                if (status === 401) {
                    const errorMessage = 'Contraseña Incorrecta';
                    setError(errorMessage);
                    Swal('Error', errorMessage, 'error');
                    return;
                }
            }

            // Mensaje de error genérico
            const errorMessage = error.response?.data?.message || 'No fue posible el Login. Por favor, intenta nuevamente.';
            setError(errorMessage);
            Swal('Error', errorMessage, 'error');
            setUser(null);
        }
    };

    return {
        login,
        password,
        username,
        setUsername,
        setPassword
    }
}

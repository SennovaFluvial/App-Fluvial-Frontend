import React, { useState } from 'react'
import { useNavigate } from 'react-router';
// import { Link } from 'react-router-dom';
import axios from 'axios'; // Se importa la libreria de axios
import './assets/css/login.css'
import Logo from './assets/img/LogoSena.png'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert';

/**
 * Componente Login
 * 
 * Este componente proporciona una interfaz para que los usuarios inicien sesión. 
 * Valida las credenciales del usuario, maneja errores y redirige a la sección de administración si el inicio de sesión es exitoso.
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {Function} props.setUser - Función para actualizar el estado del usuario autenticado.
 * @returns {React.ReactNode} - Renderiza el formulario de inicio de sesión y mensajes de error.
 */
export const Login = ({ setUser }) => {

    // Estado para manejar la contraseña del usuario
    const [password, setPassword] = useState('')
    // Estado para manejar el nombre de usuario del usuario
    const [username, setUsername] = useState('')
    // Estado para manejar mensajes de error
    const [error, setError] = useState('')
    // Hook para redirigir a otras páginas
    const nav = useNavigate()

    /**
     * Función para manejar el inicio de sesión del usuario.
     * 
     * @param {React.FormEvent} event - Evento del formulario de inicio de sesión.
     */

    const login = async (event) => { // funcion asincrona

        event.preventDefault(); // Evita que la pagina se recarge cuando se envia el formulario.

        // Verifica que se hayan ingresado tanto el nombre de usuario como la contraseña
        if (!username || !password) {
            setError('Ingrese datos válidos'); // Muestra un mensaje de error si los datos no son válidos.
            Swal('Error', 'Por favor, ingrese su nombre de usuario y contraseña.', 'error');
            return;
        }

        try {
            // Realiza una solicitud POST para autenticar al usuario
            const response = await axios.post('https://fluvial.up.railway.app/auth/log-in', { // Esta es la url a la que se le pedira la respuesta.
                username: username, // Nombre de usuario proporcionado por el usuario
                password: password  // Contraseña proporcionada por el usuario
            });
            // Obtiene la hora actual del logueo
            const currentTime = new Date().getTime();

            // Almacena el token en el localStorage si la solicitud es exitosa
            localStorage.setItem('token', response.data.jwt); // Almacena el token JSON si la solicitud es exitosa.

            // Almacena la hora actual de logueo
            localStorage.setItem('tokenTimestamp', currentTime);
            // Crea un objeto de usuario con la información recibida
            const user = {
                username: response.data.username,
                status: response.data.estado,
                companyStatus: response.data.companyStatus,
                rol: response.data.roles[0]
            };
            // Almacena la información del usuario en el localStorage
            localStorage.setItem('user', JSON.stringify(user));

            // Verifica el estado del usuario
            if (user.status !== 'activo') {
                setError('El usuario se encuentra en un estado de Inactivo. Por favor, comuníquese con el gerente.');
                setUser(null);
                Swal('Error', 'El usuario se encuentra inactivo.', 'error');
                return;
            }

            // Verifica el estado de la empresa del usuario
            if (user.companyStatus !== 'activo') {
                setError('La empresa a la que está asociado se encuentra inactiva.');
                setUser(null);
                Swal('Error', 'La empresa está inactiva.', 'error');
                return;
            }

            // Actualiza el estado del usuario si todo es correcto
            setUser(user);
            Swal('Éxito', 'Inicio de sesión exitoso.', 'success');

            // Redirige a la sección del panel de administración
            nav('/adminSection');

        } catch (error) {
            setError('No fue posible el Login. Por favor, intenta nuevamente.');
            console.error('No fue posible el Login', error);
            Swal('Error', 'No fue posible el inicio de sesión. Intente de nuevo.', 'error');
            setUser(null);
        }
    };

    return (
        <>
            <div id="Login">
                <div className="hero-image">
                    <img src={Logo} alt="" className="logo" />
                </div>

                <div className="side-container">
                    <div className="top-side-container">
                        <h1 className="side-conainter__title">Sistemas de operaciones <br />
                            Logísticas del transporte <br />
                            Fluvial - Guaviare</h1>
                    </div>

                    <div className='circulo'>
                        <i className="fa-solid fa-circle-user"></i>
                    </div>

                    <div className="bottom-side-container">

                        <form onSubmit={login} className="login-form">

                            <h2 className="login-form__title">Iniciar Sesión</h2>

                            <section className="login-form-inputs">
                                <div className="input-form">
                                    <label className="input-form__label"><i className="fa-solid fa-user"></i> Usuario</label>
                                    <div className="input-with-icon">
                                        <input type="text" className="form-control" value={username} onChange={(param) => setUsername(param.target.value)} />
                                    </div>
                                </div>

                                <div className="input-form">
                                    <label className="input-form__label"><i className="fa-solid fa-lock"></i> Contraseña</label>
                                    <div className="input-with-icon">
                                        <input type="password" className="form-control" value={password} onChange={(param) => setPassword(param.target.value)} />
                                    </div>
                                </div>

                                <section className="login-form-button-wrapper">
                                    <button className="button"> Iniciar sesión </button>
                                    <br /><br />

                                    <button className="button button-home">
                                        <Link to={'/'} className="link-home">
                                            <i className="fa-solid fa-house"></i> Home page
                                        </Link>
                                    </button>

                                </section>

                                <p className="forgot-password-text">
                                    <Link to="">¿Olvidaste tu contraseña?</Link>
                                </p>
                            </section>

                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Se importa la libreria de axios

import './assets/css/login.css'
import Logo from './assets/img/LogoSena.png'


export const Login = ({ setUser }) => {

    const [password, setPassword] = useState('') // Hook para el estado de password del usuario.
    const [username, setusername] = useState('') // Hook para el estado de username del usuario.
    const [error, setError] = useState(''); // Hook para el estado de los mensajes de errores.

    const nav = useNavigate();

    const login = async (event) => { // funcion asincrona

        event.preventDefault(); // Evita que la pagina se recarge cuando se envia el formulario.

        try {
            const response = await axios.post('https://fluvial.up.railway.app/auth/log-in', { // Esta es la url a la que se le pedira la respuesta.
                username: username,     // Estos son los datos con los que se realizan la solicitud.
                password: password      // Estos son los datos con los que se realizan la solicitud.
            });

            localStorage.setItem('token', response.data.jwt); // Almacena el token JSON si la solicitud es exitosa.

            console.log('Autenticacion exitosa'); // Muestra un mensaje de consola si fue correcto todo.

            let userName = response.data.username;
            //let status = response.status;

            setUser({
                username: userName // Setea el estado del nombre para que se cambie por el data.name del usuario logueado
            });

            nav('/adminSection'); // Redirecciona hacia el componente donde se encontrara el menu del administrador dahsBoard

        } catch (error) { // En caso de error.

            setError('No fue posible el Login. Por favor, intenta nuevamente.'); // Muestra un mensaje de error

            console.error('No fue posible el Login', error); // Muestra un mensaje de consola que algo salio mal.

            setUser(null);
        }
    };

    return (
        <>
            <div id="Login" >
                <div className="hero-image">
                    <img src={Logo} alt="" className="logo" />
                </div>

                <div className="side-container">
                    <div className="top-side-container">
                        <h1 className="side-conainter__title">TRANSPORTE FLUVIAL GUAVIARE</h1>
                    </div>

                    <div className="bottom-side-container">
                        <form onSubmit={login} className="login-form">
                            <section className="login-form-title-wrapper">
                                <h2 className="login-form__title">Iniciar Sesión</h2>
                            </section>
                            <section className="login-form-inputs">
                                <div className="input-form">
                                    <label htmlFor="" className="input-form__label">Usuario</label>
                                    <input type="text" className="form-control" value={username} onChange={(param) => setusername(param.target.value)} />
                                </div>
                                <div className="input-form">
                                    <label htmlFor="" className="input-form__label">Contraseña</label>
                                    <input type="password" className="form-control" value={password} onChange={(param) => setPassword(param.target.value)} />
                                </div>
                            </section>
                            <section className="login-form-button-wrapper">
                                <Link to={'/DashBoard'}>
                                    <button className="button" > Iniciar sesión </button>
                                </Link>
                            </section>

                            {error ? <p className="error-message alert alert-danger">{error}</p> : ''}
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
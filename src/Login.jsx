import './assets/css/login.css'
import Logo from './assets/img/LogoSena.png'
import { Link } from 'react-router-dom';
import { useControllerLogin } from './controllers/ControllerLogin';
import  styles  from './assets/css/login.module.css'

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

    const { login, password, username, setUsername, setPassword } = useControllerLogin({ setUser });

    return (
        <>
            <div id="Login" className={styles.Login}>
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
                                            <i className="fa-solid fa-house"></i> Volver
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
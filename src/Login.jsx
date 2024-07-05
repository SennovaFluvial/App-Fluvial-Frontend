import React from 'react'

import './assets/css/login.css'
import Logo from './assets/img/LogoSena.png'


export const Login = () => {
    return (
        <>
            <div className="hero-image">
                <img src={Logo} alt="" className="logo" />
            </div>

            <div className="side-container">
                <div className="top-side-container">
                    <h1 className="side-conainter__title">TRNASPORTE FLUVIAL GUAVIARE</h1>
                </div>

                <div className="bottom-side-container">
                    <form action="" method="GET" className="login-form">
                        <section className="login-form-title-wrapper">
                            <h2 className="login-form__title">Iniciar Sesión</h2>
                        </section>
                        <section className="login-form-inputs">
                            <div className="input-form">
                                <label htmlFor="" className="input-form__label">Usuario</label>
                                <input type="text" className="input-form__input" />
                            </div>
                            <div className="input-form">
                                <label htmlFor="" className="input-form__label">Contraseña</label>
                                <input type="password" className="input-form__input" />
                            </div>
                        </section>
                        <section className="login-form-button-wrapper">
                            <button className="button">Iniciar sesión</button>
                        </section>
                    </form>
                </div>
            </div>
        </>
    )
}
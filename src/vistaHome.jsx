import './StylesHomePage.css'

import logoSena from './img/LogoSena.png'

const Items = ({ texto, tipo }) => {
    return (
        <button className={tipo == 1 ? 'Btn_inicioSession' : 'btn btn-primary'}>{texto}</button>
    )
}


export const VistaHomePageOff = () => {
    return (
        <>
            <nav class="navbar navbar-expand-lg bg-body-tertiary fixed-top">
                <div class="container-fluid barraNavegacion">
                    <a class="navbar-brand" href="#">
                        <img src={logoSena} alt="Logo App" width="60" class="d-inline-block align-text-top" />
                        <label className='nombreApp'>APP FLUVIAL</label>
                    </a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="nav ms-auto">
                            <li class="nav-item">
                                <a class="nav-link active enlace" href="#">inicio</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link enlace" href="#">Blog</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link enlace">¿Quiénes somos?</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link enlace">Horarios</a>
                            </li>
                        </ul>
                    </div>


                    <Items texto='Iniciar Sesión' tipo={1} id='colorButton'></Items>

                </div>
            </nav>
        </>
    )
}

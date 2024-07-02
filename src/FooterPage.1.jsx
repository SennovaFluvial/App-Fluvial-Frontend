
export const FooterPage = () => {
    return (
        <>
            <footer className="py-5 footerPage">
                <div className="container">
                    <h2>Acerda de...</h2>
                </div>
                <div className="row">

                    <div className="col-md-4">

                    </div>
                    <div className="col-md-4">
                        <h3>Directrices y Servicios</h3>
                        <ul className="list-unstyled py-2">
                            <li className='py-2'>Politicas y privacidad.</li>
                            <li className='py-2'>Terminos y condiciones.</li>
                            <li className='py-2'>Seguridad</li>
                            <li className='py-2'>Servicios</li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <h3>Colaboradores</h3>
                        <ul className="list-unstyled py-2">
                            <li className='py-2'>Asociados</li>
                            <li className='py-2'>Contribuyentes</li>
                        </ul>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4 text-center text-center">
                        <a href="#"><i class="fa-brands fa-facebook iconoF"></i></a>
                        <a href="#"><i class="fa-brands fa-whatsapp iconoF"></i></a>
                        <a href="#"><i class="fa-brands fa-instagram iconoF"></i></a>


                    </div>
                    <div className="col-md-4 text-center">
                        <b>Correo electrónico de soporte:</b> support@appfluvial.com
                    </div>
                    <div className="col-md-4 text-center">
                        <i class="fa-solid fa-phone-volume iconoF phone"></i> Teléfono: +57 345 258 252
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12 mt-5 text-center">
                        <b>© 2024 Todos los derechos reservados</b>
                    </div>
                </div>
            </footer>
        </>
    );
};

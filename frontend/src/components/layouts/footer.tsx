import "../../styles/layouts/footer.css"; 

const Footer = () => {
    return (
        <footer className="footer pt-5 pb-4">
            <div className="container-fluid px-5">
                <div className="row justify-content-between g-0">
                    {/* Sección de Marca */}
                    <div className="col-md-4 mb-5 mb-md-0">
                        <h5 className="footer-brand mb-4">CANELA ARTESANIAS</h5>
                        <p className="footer-description">
                            Artesanias y objetos de decoracions. Piezas únicas creadas con materiales excepcionales para espacios que inspiran.
                        </p>
                    </div>

                    {/* Sección de Navegación */}
                    <div className="col-md-2 mb-5 mb-md-0">
                        <h6 className="footer-section-title mb-4">NAVEGACIÓN</h6>
                        <ul className="list-unstyled footer-links">
                            <li><a href="/">Inicio</a></li>
                            <li><a href="/producto">Productos</a></li>
                            <li><a href="/contacto">Contacto</a></li>
                        </ul>
                    </div>

                    {/* Sección de Contacto */}
                    <div className="col-md-3">
                        <h6 className="footer-section-title mb-4">CONTACTO</h6>
                        <ul className="list-unstyled footer-contact">
                            <li>info@luxeshowroom.com</li>
                            <li>+34 912 345 678</li>
                            <li>Calle del Diseño 42, Madrid</li>
                        </ul>
                    </div>
                </div>

                <hr className="footer-divider my-5" />

                <div className="footer-bottom text-center">
                    <p className="mb-0">
                        Swer 2026. Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
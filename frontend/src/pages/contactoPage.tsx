
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import "../styles/contactPage.css";

const ContactPage: React.FC = () => {
    return (
        <section className="contact-section py-5 vw-100">
            <div className="container-fluid px-5">
                {/* Encabezado Editorial */}
                <div className="text-center mb-5 pt-4">
                    <span className="contact-label d-block mb-2">HABLEMOS</span>
                    <h2 className="contact-title">Contacto</h2>
                    <p className="contact-subtitle mx-auto">
                        Estamos aquí para ayudarte. Visítanos en nuestro showroom o <br />
                        envíanos un mensaje y te responderemos a la brevedad.
                    </p>
                </div>

                <div className="row g-5 align-items-start justify-content-center">
                    {/* Información de Contacto */}
                    <div className="col-lg-4">
                        <div className="contact-info-wrapper pe-lg-5">
                        
                            <div className="info-item d-flex align-items-center mb-4">
                                <div className="icon-box me-3"><MapPin size={20} /></div>
                                <div>
                                <h6 className="mb-0 fw-bold">Dirección</h6>
                                <p className="mb-0 text-muted">Calle del Diseño 42, 28001 Madrid</p>
                                </div>
                            </div>

                            <div className="info-item d-flex align-items-center mb-4">
                                <div className="icon-box me-3"><Phone size={20} /></div>
                                <div>
                                <h6 className="mb-0 fw-bold">Teléfono</h6>
                                <p className="mb-0 text-muted">+34 912 345 678</p>
                                </div>
                            </div>

                            <div className="info-item d-flex align-items-center mb-4">
                                <div className="icon-box me-3"><Mail size={20} /></div>
                                <div>
                                <h6 className="mb-0 fw-bold">Email</h6>
                                <p className="mb-0 text-muted">info@luxeshowroom.com</p>
                                </div>
                            </div>

                            <div className="info-item d-flex align-items-center mb-4">
                                <div className="icon-box me-3"><Clock size={20} /></div>
                                <div>
                                <h6 className="mb-0 fw-bold">Horario</h6>
                                <p className="mb-0 text-muted">Lun - Sab: 10:00 - 20:00</p>
                                </div>
                            </div>

                        </div>
                </div>

                    {/* Formulario de Contacto */}
                    <div className="col-lg-7">
                        <div className="contact-form-card p-4 p-md-5">
                            <form>
                                <div className="row">
                                <div className="col-md-6 mb-4">
                                    <label className="form-label small fw-bold">Nombre</label>
                                    <input type="text" className="form-control custom-input" placeholder="Tu nombre" />
                                </div>
                                <div className="col-md-6 mb-4">
                                    <label className="form-label small fw-bold">Email</label>
                                    <input type="email" className="form-control custom-input" placeholder="tu@email.com" />
                                </div>
                                </div>
                                
                                <div className="mb-4">
                                <label className="form-label small fw-bold">Asunto</label>
                                <input type="text" className="form-control custom-input" placeholder="Asunto del mensaje" />
                                </div>

                                <div className="mb-5">
                                <label className="form-label small fw-bold">Mensaje</label>
                                <textarea className="form-control custom-input" placeholder="Escríbenos tu consulta..."></textarea>
                                </div>

                                <button type="submit" className="btn btn-send px-5 py-3">
                                Enviar Mensaje
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactPage;
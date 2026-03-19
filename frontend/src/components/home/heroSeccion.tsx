import { ArrowRight } from "lucide-react";
import "../../styles/home/heroSeccion.css";
import imgHero from "../../utils/homePage/heroImg.webp";

const HeroSection: React.FC = () => {
    return (
        <section className="hero-section position-relative d-flex align-items-center">
            {/* Imagen de fondo */}
            <img
                src={imgHero}
                alt="Hero Canela Artesanias"
                className="hero-image"
            />

            {/* Overlay sutil */}
            <div className="hero-overlay position-absolute w-100 h-100" />

            {/* Contenido alineado a la izquierda */}
            <div className="container position-relative text-white" style={{ zIndex: 2 }}>
                <div className="hero-content py-5 text-start">
                    <span className="hero-label d-block mb-2">COLECCIÓN 2026</span>
                    <h1 className="hero-title mb-3">
                        El arte de decorar <br /> con estilo
                    </h1>
                    <p className="hero-description mb-5">
                        Descubre nuestra selección curada de adornos y velas de diseño.
                        Piezas que transforman espacios en experiencias.
                    </p>
                    <a
                        href="/producto"
                        className="btn btn-hero d-inline-flex align-items-center gap-2"
                    >
                        Ver Colección
                        <ArrowRight size={20} />
                    </a>
                </div>
            </div>
        </section>
    );
}

export default HeroSection;
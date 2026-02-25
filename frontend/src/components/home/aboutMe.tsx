import "../../styles/home/aboutMe.css"
import profileImg from "../../utils/homePage/perfilImg.webp"

export function AboutMe() {
  return (
    <section className="about-me-section py-5">
      <div className="container py-md-5">
        <div className="row align-items-center">
          {/* Imagen a la izquierda */}
          <div className="col-md-6 mb-4 mb-md-0">
            <div className="profile-img-wrapper">
              <img src={profileImg} alt="Showroom" className="profile-img shadow-sm" />
            </div>
          </div>

          {/* Contenido a la derecha */}
          <div className="col-md-6 ps-md-5">
            <h2 className="section-title mb-4">
              Diseño que inspira, <br />
              calidad que perdura
            </h2>
            
            <p className="section-description mb-4">
              En LUXE creemos que cada pieza de mobiliario cuenta una historia. 
              Trabajamos con artesanos y diseñadores de todo el mundo para traer a tu hogar 
              piezas que combinan belleza, funcionalidad y materiales de la más alta calidad.
            </p>
            
            <p className="section-description mb-5">
              Cada producto en nuestra colección ha sido cuidadosamente seleccionado, 
              buscando ese equilibrio perfecto entre la estética contemporánea y la 
              atemporalidad que define el verdadero diseño.
            </p>

            {/* Nueva Sección de Métricas usando Grid de Bootstrap */}
            <div className="row stats-container pt-4">
              <div className="col-4">
                <h3 className="stat-number">150<sup>+</sup></h3>
                <p className="stat-label">Piezas únicas</p>
              </div>
              <div className="col-4 border-start border-secondary border-opacity-25">
                <h3 className="stat-number">40<sup>+</sup></h3>
                <p className="stat-label">Diseñadores</p>
              </div>
              <div className="col-4 border-start border-secondary border-opacity-25">
                <h3 className="stat-number">12</h3>
                <p className="stat-label">Años de experiencia</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
import { Link } from 'react-router-dom'
import { API_URL, REPO_URL } from '../config/api.js'
import '../styles/Footer.css'
import Logo from './Logo.jsx'

const ANIO_ACTUAL = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="footer">
      <div className="contenedor footer__contenido">
        <div className="footer__marca">
          <Logo tamano={32} />
          <div>
            <p className="footer__nombre">Sabores de México</p>
            <p className="footer__lema">Recetas tradicionales de todos los rincones del país.</p>
          </div>
        </div>

        <nav aria-label="Enlaces del pie de página">
          <ul className="footer__enlaces">
            <li>
              <Link to="/">Inicio</Link>
            </li>
            <li>
              <Link to="/acerca">Acerca de</Link>
            </li>
            <li>
              <Link to="/contacto">Contacto</Link>
            </li>
            <li>
              <a href={API_URL} target="_blank" rel="noreferrer">
                API (JSON)
              </a>
            </li>
            <li>
              <a href={REPO_URL} target="_blank" rel="noreferrer">
                Repositorio
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="contenedor footer__legal">
        <p>© {ANIO_ACTUAL} Kevin Llamas · Proyecto final de Programación Web.</p>
        <p>Fotografías de Wikimedia Commons bajo licencias libres; créditos en cada receta.</p>
      </div>
    </footer>
  )
}

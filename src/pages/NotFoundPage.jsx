import { Link, useLocation, useNavigate } from 'react-router-dom'
import Icono from '../components/Icono.jsx'
import { useTituloPagina } from '../hooks/useTituloPagina.js'
import '../styles/StaticPages.css'

/** Página que se muestra cuando la URL no coincide con ninguna ruta (ruta comodín "*"). */
export default function NotFoundPage() {
  useTituloPagina('Página no encontrada')
  const navigate = useNavigate()
  const { pathname, key } = useLocation()

  // Navegación programática: si se llegó escribiendo la URL no hay página anterior, así que va al inicio.
  const regresar = () => (key === 'default' ? navigate('/') : navigate(-1))

  return (
    <section className="contenedor seccion no-encontrado">
      <p className="no-encontrado__codigo" aria-hidden="true">
        4<span>0</span>4
      </p>
      <h1>Este platillo no está en el menú</h1>
      <p className="no-encontrado__texto">
        La página <code>{pathname}</code> no existe o se cambió de lugar.
      </p>
      <div className="no-encontrado__acciones">
        <Link to="/" className="boton boton--primario">
          Ir al inicio
        </Link>
        <button type="button" className="boton boton--secundario" onClick={regresar}>
          <Icono nombre="izquierda" />
          Regresar
        </button>
      </div>
    </section>
  )
}

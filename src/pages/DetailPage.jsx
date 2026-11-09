import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage.jsx'
import Icono from '../components/Icono.jsx'
import Loader from '../components/Loader.jsx'
import RecipeDetail from '../components/RecipeDetail.jsx'
import { useTituloPagina } from '../hooks/useTituloPagina.js'
import '../styles/DetailPage.css'

export default function DetailPage({ recetas, cargando, error, onReintentar }) {
  // Parámetro dinámico de la ruta /recetas/:id
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  const indice = recetas.findIndex((receta) => String(receta.id) === id)
  const receta = recetas[indice]
  const anterior = recetas[indice - 1]
  const siguiente = recetas[indice + 1]

  useTituloPagina(receta?.nombre ?? (cargando ? 'Cargando receta' : 'Receta no encontrada'))

  // Navegación programática: regresa a la página anterior o, si se entró directo por URL, al inicio.
  function volver() {
    if (location.key === 'default') navigate('/')
    else navigate(-1)
  }

  if (cargando) {
    return (
      <div className="contenedor seccion">
        <Loader mensaje="Cargando receta..." />
      </div>
    )
  }

  if (error) {
    return (
      <div className="contenedor seccion">
        <ErrorMessage titulo="¡Ups! No pudimos cargar la receta" mensaje={error} onReintentar={onReintentar} />
      </div>
    )
  }

  if (!receta) {
    return (
      <div className="contenedor seccion">
        <ErrorMessage
          titulo="Receta no encontrada"
          mensaje={`No existe ninguna receta con el identificador "${id}".`}
          ayuda="Puede que el enlace esté mal escrito o que la receta ya no exista."
        >
          <Link to="/" className="boton boton--primario">
            Ver todas las recetas
          </Link>
        </ErrorMessage>
      </div>
    )
  }

  return (
    <div className="contenedor seccion pagina-detalle">
      <button type="button" className="boton boton--fantasma pagina-detalle__volver" onClick={volver}>
        <Icono nombre="izquierda" />
        Volver
      </button>

      {/* key reinicia el estado (ingredientes marcados) al cambiar de receta */}
      <RecipeDetail key={receta.id} receta={receta} />

      <nav className="pagina-detalle__navegacion" aria-label="Otras recetas">
        {anterior ? (
          <Link to={`/recetas/${anterior.id}`} className="receta-vecina">
            <span className="receta-vecina__etiqueta">
              <Icono nombre="izquierda" tamano={14} /> Anterior
            </span>
            <span className="receta-vecina__nombre">{anterior.nombre}</span>
          </Link>
        ) : (
          <span />
        )}
        {siguiente && (
          <Link to={`/recetas/${siguiente.id}`} className="receta-vecina receta-vecina--siguiente">
            <span className="receta-vecina__etiqueta">
              Siguiente <Icono nombre="derecha" tamano={14} />
            </span>
            <span className="receta-vecina__nombre">{siguiente.nombre}</span>
          </Link>
        )}
      </nav>
    </div>
  )
}

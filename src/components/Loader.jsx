import '../styles/Loader.css'

/** Indicador visual que se muestra mientras se obtienen los datos de la API. */
export default function Loader({ mensaje = 'Cargando recetas...' }) {
  return (
    <div className="loader" role="status" aria-live="polite">
      <div className="loader__spinner" aria-hidden="true">
        <span />
      </div>
      <p className="loader__mensaje">{mensaje}</p>
    </div>
  )
}

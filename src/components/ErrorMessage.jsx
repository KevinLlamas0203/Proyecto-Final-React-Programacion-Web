import '../styles/ErrorMessage.css'
import Icono from './Icono.jsx'

/**
 * Mensaje amigable para cuando algo falla (la API no responde, no hay internet, etc.).
 * Si recibe la función onReintentar muestra un botón para volver a intentarlo.
 */
export default function ErrorMessage({
  titulo = '¡Ups! No pudimos cargar las recetas',
  mensaje,
  ayuda = 'Revisa tu conexión a internet e inténtalo de nuevo en unos segundos.',
  onReintentar,
  children,
}) {
  return (
    <div className="error-mensaje" role="alert">
      <div className="error-mensaje__icono">
        <Icono nombre="alerta" tamano={32} />
      </div>
      <h2 className="error-mensaje__titulo">{titulo}</h2>
      {mensaje && <p className="error-mensaje__texto">{mensaje}</p>}
      {ayuda && <p className="error-mensaje__ayuda">{ayuda}</p>}

      <div className="error-mensaje__acciones">
        {onReintentar && (
          <button type="button" className="boton boton--primario" onClick={onReintentar}>
            <Icono nombre="recargar" />
            Reintentar
          </button>
        )}
        {children}
      </div>
    </div>
  )
}

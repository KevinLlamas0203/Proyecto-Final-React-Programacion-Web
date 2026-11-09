import Icono from './Icono.jsx'

const ETIQUETAS = ['Sin picante', 'Poco picante', 'Picante', 'Muy picante']

/** Muestra el nivel de picante (0 a 3) con tres flamas. */
export default function NivelPicante({ nivel = 0 }) {
  return (
    <span className="nivel-picante" title={ETIQUETAS[nivel]}>
      <span className="nivel-picante__flamas" aria-hidden="true">
        {[1, 2, 3].map((n) => (
          <Icono
            key={n}
            nombre="flama"
            tamano={16}
            className={n <= nivel ? 'nivel-picante__flama--activa' : 'nivel-picante__flama'}
          />
        ))}
      </span>
      <span>{ETIQUETAS[nivel]}</span>
    </span>
  )
}

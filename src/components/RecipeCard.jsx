import { Link } from 'react-router-dom'
import '../styles/RecipeCard.css'
import { formatearTiempo, usarImagenRespaldo } from '../utils/formato.js'
import Icono from './Icono.jsx'

/**
 * Tarjeta reutilizable con la vista previa de una receta.
 * Toda la información le llega por props desde el componente de lista.
 */
export default function RecipeCard({ id, nombre, imagen, categoria, region, tiempoPreparacion }) {
  return (
    <article className="tarjeta">
      <div className="tarjeta__imagen-contenedor">
        <img
          src={imagen}
          alt={nombre}
          className="tarjeta__imagen"
          loading="lazy"
          width="480"
          height="360"
          onError={usarImagenRespaldo}
        />
        <span className="etiqueta tarjeta__categoria">{categoria}</span>
      </div>

      <div className="tarjeta__cuerpo">
        <h3 className="tarjeta__titulo">{nombre}</h3>

        <ul className="tarjeta__meta">
          <li>
            <Icono nombre="ubicacion" tamano={15} />
            {region}
          </li>
          <li>
            <Icono nombre="reloj" tamano={15} />
            {formatearTiempo(tiempoPreparacion)}
          </li>
        </ul>

        {/* Link cambia de vista sin recargar la página */}
        <Link to={`/recetas/${id}`} className="boton boton--primario tarjeta__boton">
          Ver más
          <Icono nombre="derecha" tamano={16} />
        </Link>
      </div>
    </article>
  )
}

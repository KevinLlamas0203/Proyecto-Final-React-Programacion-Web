import { useState } from 'react'
import '../styles/RecipeDetail.css'
import { formatearTiempo, usarImagenRespaldo } from '../utils/formato.js'
import Icono from './Icono.jsx'
import NivelPicante from './NivelPicante.jsx'

/** Muestra la información completa de una receta seleccionada. */
export default function RecipeDetail({ receta }) {
  const {
    nombre,
    descripcion,
    imagen,
    categoria,
    region,
    tiempoPreparacion,
    porciones,
    dificultad,
    picante,
    ingredientes = [],
    preparacion = [],
    creditoImagen,
  } = receta

  // Permite al usuario ir marcando los ingredientes que ya tiene.
  const [marcados, setMarcados] = useState(() => new Set())

  function alternarIngrediente(indice) {
    setMarcados((anteriores) => {
      const nuevos = new Set(anteriores)
      if (nuevos.has(indice)) nuevos.delete(indice)
      else nuevos.add(indice)
      return nuevos
    })
  }

  return (
    <article className="detalle">
      <div className="detalle__cabecera">
        <figure className="detalle__figura">
          <img
            src={imagen}
            alt={nombre}
            className="detalle__imagen"
            width="960"
            height="720"
            onError={usarImagenRespaldo}
          />
          {creditoImagen && (
            <figcaption className="detalle__credito">
              Foto:{' '}
              <a href={creditoImagen.fuente} target="_blank" rel="noreferrer">
                {creditoImagen.autor}
              </a>{' '}
              · {creditoImagen.licencia}
            </figcaption>
          )}
        </figure>

        <div className="detalle__info">
          <div className="detalle__etiquetas">
            <span className="etiqueta">{categoria}</span>
            <span className="etiqueta etiqueta--secundaria">
              <Icono nombre="ubicacion" tamano={13} />
              {region}
            </span>
          </div>

          <h1 className="detalle__titulo">{nombre}</h1>
          <p className="detalle__descripcion">{descripcion}</p>

          <dl className="detalle__datos">
            <div className="detalle__dato">
              <dt>
                <Icono nombre="reloj" tamano={16} />
                Tiempo
              </dt>
              <dd>{formatearTiempo(tiempoPreparacion)}</dd>
            </div>
            <div className="detalle__dato">
              <dt>
                <Icono nombre="personas" tamano={16} />
                Porciones
              </dt>
              <dd>{porciones}</dd>
            </div>
            <div className="detalle__dato">
              <dt>
                <Icono nombre="dificultad" tamano={16} />
                Dificultad
              </dt>
              <dd>{dificultad}</dd>
            </div>
            <div className="detalle__dato">
              <dt>
                <Icono nombre="flama" tamano={16} />
                Picante
              </dt>
              <dd>
                <NivelPicante nivel={picante} />
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="detalle__cuerpo">
        <section className="detalle__seccion detalle__ingredientes" aria-labelledby="titulo-ingredientes">
          <h2 id="titulo-ingredientes">Ingredientes</h2>
          <p className="detalle__progreso">
            Tienes {marcados.size} de {ingredientes.length}
          </p>
          <ul>
            {ingredientes.map((ingrediente, indice) => (
              <li key={ingrediente}>
                <label className={`ingrediente${marcados.has(indice) ? ' ingrediente--marcado' : ''}`}>
                  <input
                    type="checkbox"
                    checked={marcados.has(indice)}
                    onChange={() => alternarIngrediente(indice)}
                  />
                  <span className="ingrediente__casilla" aria-hidden="true">
                    <Icono nombre="check" tamano={14} />
                  </span>
                  <span>{ingrediente}</span>
                </label>
              </li>
            ))}
          </ul>
        </section>

        <section className="detalle__seccion detalle__preparacion" aria-labelledby="titulo-preparacion">
          <h2 id="titulo-preparacion">Preparación</h2>
          <ol>
            {preparacion.map((paso, indice) => (
              <li key={paso} className="paso">
                <span className="paso__numero" aria-hidden="true">
                  {indice + 1}
                </span>
                <p>{paso}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </article>
  )
}

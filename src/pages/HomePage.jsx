import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage.jsx'
import Loader from '../components/Loader.jsx'
import RecipeList from '../components/RecipeList.jsx'
import SearchFilters from '../components/SearchFilters.jsx'
import { useTituloPagina } from '../hooks/useTituloPagina.js'
import '../styles/HomePage.css'
import { normalizarTexto, usarImagenRespaldo } from '../utils/formato.js'

const CATEGORIA_TODAS = 'Todas'
// Recetas que se muestran en el mosaico de la portada (por id).
const IDS_PORTADA = [4, 6, 1]

export default function HomePage({ recetas, cargando, error, onReintentar }) {
  useTituloPagina()

  // Los filtros se guardan en la URL (?q=...&categoria=...) para no perderlos al volver del detalle.
  const [parametros, setParametros] = useSearchParams()
  const busqueda = parametros.get('q') ?? ''
  const categoriaActiva = parametros.get('categoria') ?? CATEGORIA_TODAS

  const categorias = useMemo(() => [...new Set(recetas.map((r) => r.categoria))], [recetas])
  const totalRegiones = useMemo(() => new Set(recetas.map((r) => r.region)).size, [recetas])

  const recetasPortada = useMemo(() => {
    const elegidas = IDS_PORTADA.map((id) => recetas.find((r) => r.id === id)).filter(Boolean)
    return elegidas.length === IDS_PORTADA.length ? elegidas : recetas.slice(0, 3)
  }, [recetas])

  const recetasFiltradas = useMemo(() => {
    const termino = normalizarTexto(busqueda)

    return recetas.filter((receta) => {
      if (categoriaActiva !== CATEGORIA_TODAS && receta.categoria !== categoriaActiva) return false
      if (!termino) return true

      const textoReceta = normalizarTexto(
        [receta.nombre, receta.region, receta.categoria, ...(receta.ingredientes ?? [])].join(' '),
      )
      return textoReceta.includes(termino)
    })
  }, [recetas, busqueda, categoriaActiva])

  function actualizarParametro(clave, valor, valorPorDefecto = '') {
    setParametros(
      (anteriores) => {
        const nuevos = new URLSearchParams(anteriores)
        if (!valor || valor === valorPorDefecto) nuevos.delete(clave)
        else nuevos.set(clave, valor)
        return nuevos
      },
      { replace: true },
    )
  }

  const hayFiltros = busqueda !== '' || categoriaActiva !== CATEGORIA_TODAS

  return (
    <>
      <section className="hero">
        <div className="contenedor hero__contenido">
          <div className="hero__texto">
            <p className="hero__antetitulo">Recetario de cocina mexicana</p>
            <h1 className="hero__titulo">
              El sabor de México, <em>receta por receta</em>
            </h1>
            <p className="hero__descripcion">
              Del pozole de Jalisco a la cochinita pibil de Yucatán: descubre platillos tradicionales,
              sus ingredientes y cómo prepararlos paso a paso.
            </p>
            <a href="#recetas" className="boton boton--primario hero__cta">
              Explorar recetas
            </a>

            {!cargando && !error && recetas.length > 0 && (
              <dl className="hero__estadisticas">
                <div>
                  <dt>Recetas</dt>
                  <dd>{recetas.length}</dd>
                </div>
                <div>
                  <dt>Regiones</dt>
                  <dd>{totalRegiones}</dd>
                </div>
                <div>
                  <dt>Categorías</dt>
                  <dd>{categorias.length}</dd>
                </div>
              </dl>
            )}
          </div>

          <div className="hero__mosaico" aria-hidden="true">
            {recetasPortada.length > 0
              ? recetasPortada.map((receta) => (
                  <img key={receta.id} src={receta.imagen} alt="" onError={usarImagenRespaldo} />
                ))
              : [1, 2, 3].map((n) => <div key={n} className="hero__mosaico-vacio" />)}
          </div>
        </div>
      </section>

      <section className="contenedor seccion" id="recetas" aria-labelledby="titulo-recetas">
        <div className="seccion__encabezado">
          <h2 id="titulo-recetas">Nuestras recetas</h2>
          {!cargando && !error && (
            <p className="seccion__contador" aria-live="polite">
              {recetasFiltradas.length === recetas.length
                ? `${recetas.length} recetas`
                : `${recetasFiltradas.length} de ${recetas.length} recetas`}
            </p>
          )}
        </div>

        {cargando && <Loader />}

        {!cargando && error && <ErrorMessage mensaje={error} onReintentar={onReintentar} />}

        {!cargando && !error && (
          <>
            <SearchFilters
              busqueda={busqueda}
              onBusquedaChange={(valor) => actualizarParametro('q', valor)}
              categorias={categorias}
              categoriaActiva={categoriaActiva}
              onCategoriaChange={(valor) => actualizarParametro('categoria', valor, CATEGORIA_TODAS)}
              hayFiltros={hayFiltros}
              onLimpiar={() => setParametros({}, { replace: true })}
            />
            <RecipeList recetas={recetasFiltradas} />
          </>
        )}
      </section>
    </>
  )
}

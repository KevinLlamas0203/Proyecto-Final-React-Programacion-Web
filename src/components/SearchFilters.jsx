import '../styles/SearchFilters.css'
import Icono from './Icono.jsx'

/** Barra de búsqueda y botones de categoría. El estado vive en la página de inicio. */
export default function SearchFilters({
  busqueda,
  onBusquedaChange,
  categorias,
  categoriaActiva,
  onCategoriaChange,
  hayFiltros,
  onLimpiar,
}) {
  return (
    <section className="filtros" aria-label="Filtros de búsqueda">
      <div className="filtros__busqueda">
        <Icono nombre="buscar" />
        <label htmlFor="buscador" className="visualmente-oculto">
          Buscar recetas
        </label>
        <input
          id="buscador"
          type="search"
          placeholder="Busca por nombre, ingrediente o región..."
          value={busqueda}
          onChange={(evento) => onBusquedaChange(evento.target.value)}
          autoComplete="off"
        />
      </div>

      <div className="filtros__categorias" role="group" aria-label="Filtrar por categoría">
        {['Todas', ...categorias].map((categoria) => (
          <button
            key={categoria}
            type="button"
            className={`chip${categoria === categoriaActiva ? ' chip--activo' : ''}`}
            aria-pressed={categoria === categoriaActiva}
            onClick={() => onCategoriaChange(categoria)}
          >
            {categoria}
          </button>
        ))}

        {hayFiltros && (
          <button type="button" className="filtros__limpiar" onClick={onLimpiar}>
            <Icono nombre="cerrar" tamano={14} />
            Limpiar filtros
          </button>
        )}
      </div>
    </section>
  )
}

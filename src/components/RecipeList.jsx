import '../styles/RecipeList.css'
import RecipeCard from './RecipeCard.jsx'

/** Recorre el arreglo de recetas y renderiza una tarjeta por cada una. */
export default function RecipeList({ recetas }) {
  if (recetas.length === 0) {
    return (
      <p className="lista-recetas__vacia">
        No encontramos recetas que coincidan con tu búsqueda. Prueba con otro nombre, ingrediente o
        categoría.
      </p>
    )
  }

  return (
    <ul className="lista-recetas">
      {recetas.map((receta) => (
        <li key={receta.id}>
          <RecipeCard
            id={receta.id}
            nombre={receta.nombre}
            imagen={receta.imagen}
            categoria={receta.categoria}
            region={receta.region}
            tiempoPreparacion={receta.tiempoPreparacion}
          />
        </li>
      ))}
    </ul>
  )
}

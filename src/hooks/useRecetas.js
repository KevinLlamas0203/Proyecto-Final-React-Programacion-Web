import { API_URL, TIEMPO_LIMITE_MS } from '../config/api.js'
import { useFetch } from './useFetch.js'

const SIN_RECETAS = []

/**
 * Hook específico del recetario: reutiliza useFetch para traer las recetas
 * desde el JSON alojado en GitHub y valida que la respuesta sea un arreglo.
 */
export function useRecetas() {
  const { data, cargando, error, recargar } = useFetch(API_URL, { tiempoLimite: TIEMPO_LIMITE_MS })

  const formatoInvalido = data !== null && !Array.isArray(data)

  return {
    recetas: Array.isArray(data) ? data : SIN_RECETAS,
    cargando,
    error: formatoInvalido ? 'La API devolvió los datos con un formato inesperado.' : error,
    recargar,
  }
}

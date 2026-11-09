/** Convierte minutos a un texto legible: 150 -> "2 h 30 min". */
export function formatearTiempo(minutos) {
  const horas = Math.floor(minutos / 60)
  const resto = minutos % 60
  if (horas === 0) return `${resto} min`
  return resto === 0 ? `${horas} h` : `${horas} h ${resto} min`
}

/** Quita acentos y mayúsculas para que la búsqueda encuentre "pozole" al escribir "POZOLE" o "Yucatan". */
export function normalizarTexto(texto = '') {
  return texto
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
}

export const IMAGEN_RESPALDO = '/placeholder.svg'

/** Si una imagen no carga, la reemplaza por una imagen local de respaldo. */
export function usarImagenRespaldo(evento) {
  const imagen = evento.currentTarget
  if (!imagen.src.endsWith(IMAGEN_RESPALDO)) {
    imagen.src = IMAGEN_RESPALDO
  }
}

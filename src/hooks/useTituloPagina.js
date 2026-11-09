import { useEffect } from 'react'

const NOMBRE_SITIO = 'Sabores de México'

/** Cambia el título de la pestaña del navegador según la página visitada. */
export function useTituloPagina(titulo) {
  useEffect(() => {
    document.title = titulo ? `${titulo} | ${NOMBRE_SITIO}` : `${NOMBRE_SITIO} | Recetario de cocina mexicana`
  }, [titulo])
}

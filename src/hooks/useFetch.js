import { useCallback, useEffect, useState } from 'react'

/**
 * Custom hook genérico para consumir una API con fetch.
 * Maneja tres estados: los datos, si se están cargando y el posible error.
 * También cancela la petición si el componente se desmonta o si la API tarda demasiado.
 */
export function useFetch(url, { tiempoLimite = 10000 } = {}) {
  const [data, setData] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  // Cada vez que cambia este contador se vuelve a ejecutar la petición (botón "Reintentar").
  const [intento, setIntento] = useState(0)

  useEffect(() => {
    let activo = true
    let excedioTiempo = false
    const controlador = new AbortController()
    const temporizador = setTimeout(() => {
      excedioTiempo = true
      controlador.abort()
    }, tiempoLimite)

    async function obtenerDatos() {
      setCargando(true)
      setError(null)

      try {
        const respuesta = await fetch(url, { signal: controlador.signal })

        if (!respuesta.ok) {
          throw new Error(`El servidor respondió con el código ${respuesta.status}.`)
        }

        const json = await respuesta.json()
        if (activo) setData(json)
      } catch (err) {
        // Si el componente ya no está en pantalla no actualizamos nada.
        if (!activo) return

        console.error('Error al consumir la API:', err)

        if (excedioTiempo) {
          setError('La API tardó demasiado en responder.')
        } else if (err instanceof SyntaxError) {
          setError('La información recibida no tiene un formato válido.')
        } else if (!navigator.onLine) {
          setError('Parece que no tienes conexión a internet.')
        } else {
          setError('No fue posible obtener la información del servidor.')
        }
      } finally {
        clearTimeout(temporizador)
        if (activo) setCargando(false)
      }
    }

    obtenerDatos()

    // Limpieza: se ejecuta al desmontar el componente o antes de repetir la petición.
    return () => {
      activo = false
      clearTimeout(temporizador)
      controlador.abort()
    }
  }, [url, tiempoLimite, intento])

  const recargar = useCallback(() => setIntento((n) => n + 1), [])

  return { data, cargando, error, recargar }
}

import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Regresa el scroll al inicio cada vez que cambia la ruta. */
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

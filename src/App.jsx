import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer.jsx'
import Navbar from './components/Navbar.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import { useRecetas } from './hooks/useRecetas.js'
import AboutPage from './pages/AboutPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import DetailPage from './pages/DetailPage.jsx'
import HomePage from './pages/HomePage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

/**
 * Componente raíz: define la estructura general (navegación, contenido y pie de página)
 * y las rutas de la aplicación. Las recetas se piden UNA sola vez, al cargar la app,
 * y se comparten con las páginas que las necesitan mediante props.
 */
export default function App() {
  const { recetas, cargando, error, recargar } = useRecetas()

  return (
    <div className="app">
      <ScrollToTop />
      <Navbar />

      <main className="app__main">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage recetas={recetas} cargando={cargando} error={error} onReintentar={recargar} />
            }
          />
          <Route
            path="/recetas/:id"
            element={
              <DetailPage recetas={recetas} cargando={cargando} error={error} onReintentar={recargar} />
            }
          />
          <Route path="/acerca" element={<AboutPage />} />
          <Route path="/contacto" element={<ContactPage />} />
          {/* Ruta comodín: cualquier URL que no exista muestra la página 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

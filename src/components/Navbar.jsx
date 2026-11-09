import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import '../styles/Navbar.css'
import Logo from './Logo.jsx'

const ENLACES = [
  { ruta: '/', texto: 'Inicio' },
  { ruta: '/acerca', texto: 'Acerca de' },
  { ruta: '/contacto', texto: 'Contacto' },
]

export default function Navbar() {
  // Controla si el menú desplegable (versión móvil) está abierto.
  const [menuAbierto, setMenuAbierto] = useState(false)

  const cerrarMenu = () => setMenuAbierto(false)

  return (
    <header className="navbar">
      <div className="navbar__contenido contenedor">
        <Link to="/" className="navbar__marca" onClick={cerrarMenu}>
          <Logo />
          <span>
            Sabores de <strong>México</strong>
          </span>
        </Link>

        <button
          type="button"
          className={`navbar__toggle${menuAbierto ? ' navbar__toggle--abierto' : ''}`}
          aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuAbierto}
          aria-controls="menu-principal"
          onClick={() => setMenuAbierto((abierto) => !abierto)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav
          id="menu-principal"
          className={`navbar__menu${menuAbierto ? ' navbar__menu--abierto' : ''}`}
          aria-label="Navegación principal"
        >
          <ul>
            {ENLACES.map(({ ruta, texto }) => (
              <li key={ruta}>
                <NavLink
                  to={ruta}
                  end={ruta === '/'}
                  onClick={cerrarMenu}
                  className={({ isActive }) => `navbar__enlace${isActive ? ' navbar__enlace--activo' : ''}`}
                >
                  {texto}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

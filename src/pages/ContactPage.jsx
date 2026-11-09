import { useState } from 'react'
import Icono from '../components/Icono.jsx'
import { GITHUB_URL, REPO_URL } from '../config/api.js'
import { useTituloPagina } from '../hooks/useTituloPagina.js'
import '../styles/StaticPages.css'

const VALORES_INICIALES = { nombre: '', correo: '', asunto: 'Sugerir una receta', mensaje: '' }
const ASUNTOS = ['Sugerir una receta', 'Reportar un error', 'Comentario general']

function validar(valores) {
  const errores = {}
  if (valores.nombre.trim().length < 2) errores.nombre = 'Escribe tu nombre (mínimo 2 caracteres).'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valores.correo.trim()))
    errores.correo = 'Escribe un correo electrónico válido.'
  if (valores.mensaje.trim().length < 10) errores.mensaje = 'El mensaje debe tener al menos 10 caracteres.'
  return errores
}

export default function ContactPage() {
  useTituloPagina('Contacto')

  const [valores, setValores] = useState(VALORES_INICIALES)
  const [errores, setErrores] = useState({})
  const [enviadoPor, setEnviadoPor] = useState(null)

  function manejarCambio(evento) {
    const { name, value } = evento.target
    setValores((anteriores) => ({ ...anteriores, [name]: value }))
    // Si el campo tenía un error, se quita en cuanto el usuario lo corrige.
    if (errores[name]) setErrores((anteriores) => ({ ...anteriores, [name]: undefined }))
  }

  function manejarEnvio(evento) {
    evento.preventDefault()
    const nuevosErrores = validar(valores)
    setErrores(nuevosErrores)

    const camposConError = Object.keys(nuevosErrores)
    if (camposConError.length > 0) {
      // Lleva el cursor al primer campo que hay que corregir.
      evento.currentTarget.elements[camposConError[0]].focus()
      return
    }

    setEnviadoPor(valores.nombre.trim())
    setValores(VALORES_INICIALES)
  }

  return (
    <div className="contenedor seccion pagina-estatica">
      <header className="pagina-estatica__encabezado">
        <p className="pagina-estatica__antetitulo">Contacto</p>
        <h1>¿Tienes una receta familiar?</h1>
        <p className="pagina-estatica__intro">
          Compártela, sugiere un platillo que debería estar en el recetario o avísanos si encontraste un
          error. Nos encantará leerte.
        </p>
      </header>

      <div className="contacto">
        <aside className="contacto__info">
          <div className="contacto__dato">
            <span className="contacto__icono">
              <Icono nombre="codigo" />
            </span>
            <div>
              <h2>GitHub</h2>
              <a href={GITHUB_URL} target="_blank" rel="noreferrer">
                @KevinLlamas0203
              </a>
            </div>
          </div>
          <div className="contacto__dato">
            <span className="contacto__icono">
              <Icono nombre="libro" />
            </span>
            <div>
              <h2>Repositorio</h2>
              <a href={REPO_URL} target="_blank" rel="noreferrer">
                Proyecto-Final-React
              </a>
            </div>
          </div>
          <div className="contacto__dato">
            <span className="contacto__icono">
              <Icono nombre="reloj" />
            </span>
            <div>
              <h2>Tiempo de respuesta</h2>
              <p>De 24 a 48 horas hábiles.</p>
            </div>
          </div>
        </aside>

        <form className="formulario" onSubmit={manejarEnvio} noValidate>
          {enviadoPor && (
            <div className="formulario__exito" role="status">
              <Icono nombre="check" />
              <p>
                ¡Gracias, {enviadoPor}! Recibimos tu mensaje.
                <button type="button" onClick={() => setEnviadoPor(null)}>
                  Enviar otro
                </button>
              </p>
            </div>
          )}

          <div className="campo">
            <label htmlFor="nombre">Nombre</label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              value={valores.nombre}
              onChange={manejarCambio}
              aria-invalid={Boolean(errores.nombre)}
              aria-describedby={errores.nombre ? 'error-nombre' : undefined}
              autoComplete="name"
            />
            {errores.nombre && (
              <p id="error-nombre" className="campo__error">
                {errores.nombre}
              </p>
            )}
          </div>

          <div className="campo">
            <label htmlFor="correo">Correo electrónico</label>
            <input
              id="correo"
              name="correo"
              type="email"
              value={valores.correo}
              onChange={manejarCambio}
              aria-invalid={Boolean(errores.correo)}
              aria-describedby={errores.correo ? 'error-correo' : undefined}
              autoComplete="email"
            />
            {errores.correo && (
              <p id="error-correo" className="campo__error">
                {errores.correo}
              </p>
            )}
          </div>

          <div className="campo">
            <label htmlFor="asunto">Asunto</label>
            <select id="asunto" name="asunto" value={valores.asunto} onChange={manejarCambio}>
              {ASUNTOS.map((asunto) => (
                <option key={asunto}>{asunto}</option>
              ))}
            </select>
          </div>

          <div className="campo">
            <label htmlFor="mensaje">Mensaje</label>
            <textarea
              id="mensaje"
              name="mensaje"
              rows="5"
              value={valores.mensaje}
              onChange={manejarCambio}
              aria-invalid={Boolean(errores.mensaje)}
              aria-describedby={errores.mensaje ? 'error-mensaje' : undefined}
            />
            {errores.mensaje && (
              <p id="error-mensaje" className="campo__error">
                {errores.mensaje}
              </p>
            )}
          </div>

          <button type="submit" className="boton boton--primario formulario__enviar">
            <Icono nombre="correo" />
            Enviar mensaje
          </button>
          <p className="formulario__nota">
            Formulario demostrativo: los mensajes no se envían a ningún servidor.
          </p>
        </form>
      </div>
    </div>
  )
}

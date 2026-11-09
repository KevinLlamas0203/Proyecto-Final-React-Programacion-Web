import Icono from '../components/Icono.jsx'
import { API_URL, REPO_URL } from '../config/api.js'
import { useTituloPagina } from '../hooks/useTituloPagina.js'
import '../styles/StaticPages.css'

const TECNOLOGIAS = ['React 19', 'Vite', 'React Router DOM', 'Fetch API', 'CSS3 (Grid y Flexbox)', 'GitHub', 'Netlify']

const CONCEPTOS = [
  { titulo: 'Componentes y props', texto: 'Tarjeta, lista, detalle y navegación reutilizables que reciben su información por props.' },
  { titulo: 'useState', texto: 'Maneja la lista de recetas, el estado de carga, los errores, el menú móvil y el formulario.' },
  { titulo: 'useEffect', texto: 'Hace la petición a la API automáticamente la primera vez que se carga la aplicación.' },
  { titulo: 'Custom hooks', texto: 'useFetch encapsula el consumo de la API y useRecetas lo reutiliza para el recetario.' },
  { titulo: 'Enrutamiento', texto: 'Rutas para inicio, detalle con parámetro dinámico (/recetas/:id), páginas estáticas y 404.' },
  { titulo: 'Diseño responsivo', texto: 'La interfaz se adapta a celulares, tabletas y computadoras de escritorio.' },
]

const EJEMPLO_JSON = `{
  "id": 6,
  "nombre": "Birria",
  "descripcion": "Guiso tapatío de carne de chivo o de res...",
  "imagen": "https://raw.githubusercontent.com/.../birria.jpg",
  "categoria": "Plato fuerte",
  "region": "Jalisco",
  "tiempoPreparacion": 240,
  "porciones": 8,
  "dificultad": "Media",
  "picante": 2,
  "ingredientes": ["2 kg de carne de chivo o de res", "..."],
  "preparacion": ["Hidrata los chiles y licúalos...", "..."],
  "creditoImagen": {
    "autor": "Equipo 9mkt",
    "licencia": "CC BY-SA 3.0",
    "fuente": "https://commons.wikimedia.org/..."
  }
}`

export default function AboutPage() {
  useTituloPagina('Acerca de')

  return (
    <div className="contenedor seccion pagina-estatica">
      <header className="pagina-estatica__encabezado">
        <p className="pagina-estatica__antetitulo">Acerca de</p>
        <h1>Un recetario hecho con React</h1>
        <p className="pagina-estatica__intro">
          <strong>Sabores de México</strong> es el proyecto final integrador de la materia de
          Programación Web. Reúne recetas tradicionales de distintas regiones del país y las muestra en
          una aplicación web que consume su información desde un archivo JSON propio, publicado en
          GitHub y utilizado como si fuera una API externa.
        </p>
      </header>

      <section className="bloque" aria-labelledby="titulo-api">
        <div className="bloque__texto">
          <h2 id="titulo-api">
            <Icono nombre="datos" tamano={22} /> La API
          </h2>
          <p>
            Los datos viven en el archivo <code>api/recetas.json</code> del repositorio. Contiene un
            arreglo con más de 15 recetas; cada una tiene un identificador único, nombre, descripción,
            imagen pública y campos propios del tema como categoría, región, tiempo de preparación,
            porciones, dificultad, nivel de picante, ingredientes y pasos.
          </p>
          <div className="bloque__acciones">
            <a href={API_URL} target="_blank" rel="noreferrer" className="boton boton--primario">
              Ver el JSON <Icono nombre="enlace" tamano={16} />
            </a>
            <a href={REPO_URL} target="_blank" rel="noreferrer" className="boton boton--secundario">
              Ver repositorio <Icono nombre="codigo" tamano={16} />
            </a>
          </div>
        </div>
        <pre className="bloque__codigo" tabIndex={0} aria-label="Ejemplo de un registro del JSON">
          <code>{EJEMPLO_JSON}</code>
        </pre>
      </section>

      <section aria-labelledby="titulo-conceptos">
        <h2 id="titulo-conceptos">
          <Icono nombre="libro" tamano={22} /> Conceptos aplicados
        </h2>
        <ul className="rejilla-tarjetas">
          {CONCEPTOS.map(({ titulo, texto }) => (
            <li key={titulo} className="mini-tarjeta">
              <h3>{titulo}</h3>
              <p>{texto}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="titulo-tecnologias">
        <h2 id="titulo-tecnologias">
          <Icono nombre="codigo" tamano={22} /> Tecnologías
        </h2>
        <ul className="lista-chips">
          {TECNOLOGIAS.map((tecnologia) => (
            <li key={tecnologia} className="chip chip--estatico">
              {tecnologia}
            </li>
          ))}
        </ul>
      </section>

      <section className="nota" aria-labelledby="titulo-creditos">
        <h2 id="titulo-creditos">Créditos de las imágenes</h2>
        <p>
          Todas las fotografías provienen de Wikimedia Commons y se usan bajo licencias libres (Creative
          Commons o dominio público). El autor y la licencia de cada foto aparecen en la página de su
          receta.
        </p>
      </section>
    </div>
  )
}

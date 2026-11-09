// URL "raw" del archivo JSON alojado en GitHub. La aplicación la consume como si fuera una API externa.
// Se puede sobrescribir con la variable de entorno VITE_API_URL (útil para probar el manejo de errores).
export const API_URL =
  import.meta.env.VITE_API_URL ||
  'https://raw.githubusercontent.com/KevinLlamas0203/Proyecto-Final-React-Programacion-Web/main/api/recetas.json'

export const REPO_URL = 'https://github.com/KevinLlamas0203/Proyecto-Final-React-Programacion-Web'

export const GITHUB_URL = 'https://github.com/KevinLlamas0203'

// Tiempo máximo (en milisegundos) que se espera la respuesta de la API antes de mostrar un error.
export const TIEMPO_LIMITE_MS = 10000

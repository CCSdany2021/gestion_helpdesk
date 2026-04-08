import axios from 'axios'

// Configuración base de Axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor para inyectar Token/API Key
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    // Si se requiere API Key con Scope
    const apiKey = localStorage.getItem('api_key')
    if (apiKey) {
      config.headers['X-API-KEY'] = apiKey
    }
    
    return config
  },
  (error) => Promise.reject(error)
)

// Interceptor para manejo global de errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response ? error.response.status : null

    if (status === 401) {
      // Token expirado o inválido
      console.error('No autorizado - Redirigiendo a login')
      localStorage.removeItem('token')
      // window.location.href = '/login'
    } else if (status === 403) {
      console.error('Sin permisos para esta acción')
    } else if (status >= 500) {
      console.error('Error en el servidor principal (SGE)')
    }

    return Promise.reject(error)
  }
)

export default api

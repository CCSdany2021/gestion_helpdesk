import api from './api'

const pqrsfService = {
  // Solicitudes
  getSolicitudes: async (params = {}) => {
    const { data } = await api.get('/pqrsf/solicitudes/', { params })
    return data
  },

  getSolicitudById: async (id) => {
    const { data } = await api.get(`/pqrsf/solicitudes/${id}/`)
    return data
  },

  createSolicitud: async (payload) => {
    // Si incluye archivos, usar FormData
    const config = payload instanceof FormData 
      ? { headers: { 'Content-Type': 'multipart/form-data' } }
      : {}
    const { data } = await api.post('/pqrsf/solicitudes/', payload, config)
    return data
  },

  patchEstado: async (id, estado, observacion = '') => {
    const { data } = await api.patch(`/pqrsf/solicitudes/${id}/estado/`, {
      estado,
      observacion
    })
    return data
  },

  // Dashboard
  getDashboardStats: async () => {
    const { data } = await api.get('/pqrsf/dashboard/')
    return data
  },

  // Core (SGE)
  getDependencias: async () => {
    const { data } = await api.get('/dependencias/')
    return data
  },

  getUsuarios: async () => {
    const { data } = await api.get('/usuarios/')
    return data
  }
}

export default pqrsfService

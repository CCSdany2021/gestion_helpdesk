import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simular check de sesión inicial de SGE
    const savedToken = localStorage.getItem('token')
    if (savedToken) {
      // Aquí se llamaría a GET /api/v1/usuarios/me/
      setUser({
        id: 1,
        nombre: 'Santiago García',
        email: 'santiago@calasanz.edu.co',
        rol: 'admin', // user, dependency, admin
        dependencia: 'Sistemas'
      })
    }
    setLoading(false)
  }, [])

  const login = async (token, apiKey) => {
    localStorage.setItem('token', token)
    if (apiKey) localStorage.setItem('api_key', apiKey)
    
    // Simular set user
    setUser({
      id: 1,
      nombre: 'Santiago García',
      rol: 'admin'
    })
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('api_key')
    setUser(null)
    window.location.href = '/login'
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

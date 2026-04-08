import { Routes, Route, Navigate } from 'react-router-dom'
import DashboardLayout from './layouts/DashboardLayout'
import Dashboard from './modules/pqrsf/pages/Dashboard'
import NuevaSolicitud from './modules/pqrsf/pages/NuevaSolicitud'
import HistorialSolicitudes from './modules/pqrsf/pages/HistorialSolicitudes'
import DetalleSolicitud from './modules/pqrsf/pages/DetalleSolicitud'
import BandejaGestion from './modules/pqrsf/pages/BandejaGestion'
import GestionCalidad from './modules/pqrsf/pages/GestionCalidad'
import Analisis from './modules/pqrsf/pages/Analisis'
import { AuthProvider } from './modules/pqrsf/store/AuthContext'

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<div className="min-h-screen flex items-center justify-center bg-gray-50 uppercase font-black text-gray-300">Login Form</div>} />

        {/* Protected Routes (Dashboard) */}
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          
          {/* PQRSF Routes */}
          <Route path="pqrsf">
            <Route path="nueva" element={<NuevaSolicitud />} />
            <Route path="mis-solicitudes" element={<HistorialSolicitudes />} />
            <Route path="detalle/:id" element={<DetalleSolicitud />} />
            <Route path="gestion" element={<BandejaGestion />} />
            <Route path="calidad" element={<GestionCalidad />} />
            <Route path="analisis" element={<Analisis />} />
          </Route>
        </Route>

        {/* 404 */}
        <Route path="*" element={<div className="min-h-screen flex items-center justify-center font-bold">404 - No Encontrado</div>} />
      </Routes>
    </AuthProvider>
  )
}

export default App

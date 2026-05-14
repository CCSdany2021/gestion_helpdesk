import React, { useState } from 'react'
import { Card, Badge, Button, Avatar } from '@/components/ui'
import { 
  Search, 
  Filter, 
  Download, 
  ChevronRight,
  Clock,
  CheckCircle,
  FileText,
  Calendar,
  Building2
} from 'lucide-react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { generateFullData } from '../services/mockData'

const mockData = generateFullData()

const StatusBadge = ({ status }) => {
  const config = {
    'En Proceso': { icon: Clock, bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-100' },
    'Atendido': { icon: CheckCircle, bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-100' },
  }
  
  const { icon: Icon, bg, text, border } = config[status] || config['En Proceso']
  
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${bg} ${text} ${border}`}>
      <Icon size={12} />
      {status}
    </span>
  )
}

const TypeBadge = ({ type }) => {
  const colors = {
    'Petición': 'bg-indigo-50 text-indigo-700 border-indigo-100',
    'Queja': 'bg-amber-50 text-amber-700 border-amber-100',
    'Reclamo': 'bg-red-50 text-red-700 border-red-100',
    'Sugerencia': 'bg-emerald-50 text-emerald-700 border-emerald-100',
  }
  
  return (
    <span className={`px-2 py-0.5 rounded text-xs font-medium border ${colors[type] || colors['Petición']}`}>
      {type}
    </span>
  )
}

const HistorialSolicitudes = () => {
  const [activeTab, setActiveTab] = useState('TODOS')
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8
  const navigate = useNavigate()

  const tabs = [
    { label: 'TODOS', count: mockData.length },
    { label: 'EN PROCESO', count: mockData.filter(i => i.estado === 'En Proceso').length },
    { label: 'ATENDIDOS', count: mockData.filter(i => i.estado === 'Atendido').length },
  ]

  const filteredData = mockData.filter(item => {
    const matchesTab = activeTab === 'TODOS' || 
                      (activeTab === 'EN PROCESO' && item.estado === 'En Proceso') ||
                      (activeTab === 'ATENDIDOS' && item.estado === 'Atendido')
    
    const matchesSearch = item.id.includes(search) || 
                         item.asunto.toLowerCase().includes(search.toLowerCase()) ||
                         item.solicitante.toLowerCase().includes(search.toLowerCase())
    
    return matchesTab && matchesSearch
  })

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card className="p-1">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 p-4">
          {/* Tabs */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            {tabs.map((tab) => (
              <button
                key={tab.label}
                onClick={() => { setActiveTab(tab.label); setCurrentPage(1); }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                  activeTab === tab.label 
                    ? "bg-white text-indigo-600 shadow-sm" 
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {tab.label}
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  activeTab === tab.label ? "bg-indigo-100 text-indigo-600" : "bg-slate-200 text-slate-500"
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="flex items-center gap-3 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text"
                placeholder="Buscar por radicado o asunto..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button variant="outline" size="md">
              <Filter size={18} />
              Filtros
            </Button>
          </div>
        </div>
      </Card>

      {/* Table Card */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Radicado</th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Asunto</th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">Dependencia</th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">Fecha</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Detalle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {paginatedData.map((item) => (
                <motion.tr 
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                  onClick={() => navigate(`/pqrsf/detalle/${item.id}`)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                        <FileText size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-indigo-600">#{item.id}</p>
                        <p className="text-xs text-slate-400">SGE · Calasanz</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <StatusBadge status={item.estado} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <TypeBadge type={item.tipo} />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-700 truncate max-w-[250px]">{item.asunto}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center gap-1.5 text-sm text-slate-600">
                      <Building2 size={14} />
                      {item.dependencia}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-sm text-slate-500 flex items-center justify-center gap-1">
                      <Calendar size={14} />
                      {item.fecha}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button 
                      variant="primary" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        navigate(`/pqrsf/detalle/${item.id}`)
                      }}
                    >
                      Ver
                      <ChevronRight size={16} />
                    </Button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Mostrando {startIndex + 1} - {Math.min(startIndex + itemsPerPage, filteredData.length)} de {filteredData.length}
          </p>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => Math.max(1, p-1))}
            >
              <ChevronRight size={16} className="rotate-180" />
            </Button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = i + 1
              return (
                <Button
                  key={page}
                  variant={currentPage === page ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className="w-8"
                >
                  {page}
                </Button>
              )
            })}
            <Button 
              variant="outline" 
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => Math.min(totalPages, p+1))}
            >
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default HistorialSolicitudes
import React, { useState } from 'react'
import { Card, Badge, Button, Avatar } from '@/components/ui'
import { 
  Search, 
  Filter, 
  ClipboardCheck,
  Clock,
  CheckCircle,
  MessageSquare,
  ShieldCheck,
  ChevronRight,
  FileText,
  Calendar,
  Building2,
  User
} from 'lucide-react'
import { motion } from 'framer-motion'
import { generateFullData } from '../services/mockData'

const mockPQRSF = generateFullData()

const StatusBadge = ({ status }) => {
  const config = {
    'En Proceso': { icon: Clock, bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-100' },
    'Atendido': { icon: CheckCircle, bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-100' },
  }
  
  const { icon: Icon, bg, text, border } = config[status] || config['En Proceso']
  
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${bg} ${text} ${border}`}>
      <Icon size={12} />
      {status}
    </span>
  )
}

const GestionCalidad = () => {
  const [activeTab, setActiveTab] = useState('TODOS')
  const [search, setSearch] = useState('')
  const [selectedTicket, setSelectedTicket] = useState(null)

  const tabs = [
    { label: 'TODOS', count: mockPQRSF.length },
    { label: 'EN PROCESO', count: mockPQRSF.filter(i => i.estado === 'En Proceso').length },
    { label: 'ATENDIDOS', count: mockPQRSF.filter(i => i.estado === 'Atendido').length },
  ]

  const filteredData = mockPQRSF.filter(item => {
    const matchesTab = activeTab === 'TODOS' || 
                      (activeTab === 'EN PROCESO' && item.estado === 'En Proceso') ||
                      (activeTab === 'ATENDIDOS' && item.estado === 'Atendido')
    
    const matchesSearch = item.solicitante.toLowerCase().includes(search.toLowerCase()) || 
                         item.id.includes(search) || 
                         item.asunto.toLowerCase().includes(search.toLowerCase())
    
    return matchesTab && matchesSearch
  })

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-5 hover:shadow-md transition-shadow" style={{ borderTop: '4px solid #6366F1' }}>
          <p className="text-sm font-medium text-slate-500">Total Radicados</p>
          <p className="text-3xl font-bold text-slate-800 mt-1">{mockPQRSF.length}</p>
        </Card>
        <Card className="p-5 hover:shadow-md transition-shadow" style={{ borderTop: '4px solid #10B981' }}>
          <p className="text-sm font-medium text-slate-500">Atendidos</p>
          <p className="text-3xl font-bold text-slate-800 mt-1">{mockPQRSF.filter(i => i.estado === 'Atendido').length}</p>
        </Card>
        <Card className="p-5 hover:shadow-md transition-shadow" style={{ borderTop: '4px solid #F59E0B' }}>
          <p className="text-sm font-medium text-slate-500">En Proceso</p>
          <p className="text-3xl font-bold text-slate-800 mt-1">{mockPQRSF.filter(i => i.estado === 'En Proceso').length}</p>
        </Card>
      </div>

      {/* Header Card */}
      <Card className="p-1">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 p-4">
          {/* Tabs */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            {tabs.map((tab) => (
              <button
                key={tab.label}
                onClick={() => { setActiveTab(tab.label); setSelectedTicket(null); }}
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
          <div className="relative flex-1 lg:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text"
              placeholder="Buscar por usuario o ID..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </Card>

      {/* Master-Detail View */}
      <Card className="overflow-hidden" style={{ minHeight: '500px' }}>
        <div className="flex flex-col md:flex-row">
          {/* Left Panel (List) */}
          <div className="w-full md:w-[350px] border-b md:border-b-0 md:border-r border-slate-100 flex flex-col flex-shrink-0">
            <div className="p-4 border-b border-slate-100 bg-slate-50">
              <div className="grid grid-cols-2 gap-2 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <div>Ticket</div>
                <div>Estado</div>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              {filteredData.map(item => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={() => setSelectedTicket(item)}
                  className={`p-4 border-b border-slate-100 cursor-pointer transition-all hover:bg-slate-50 ${
                    selectedTicket?.id === item.id ? 'bg-indigo-50 border-l-4 border-l-indigo-500' : 'border-l-4 border-l-transparent'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <p className={`text-sm font-semibold truncate flex-1 pr-2 ${
                      selectedTicket?.id === item.id ? 'text-indigo-600' : 'text-slate-800'
                    }`}>{item.solicitante}</p>
                    <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                      item.estado === 'Atendido' ? 'bg-emerald-500' : 'bg-amber-500'
                    }`} />
                  </div>
                  <p className="text-xs text-slate-500 truncate mb-2">{item.asunto}</p>
                  <div className="flex justify-between items-center text-xs text-slate-400">
                    <span>ID: {item.id}</span>
                    <span>{item.fecha}</span>
                  </div>
                </motion.div>
              ))}
              {filteredData.length === 0 && (
                <div className="p-8 text-center text-sm text-slate-400">
                  No hay tickets
                </div>
              )}
            </div>
          </div>

          {/* Right Panel (Detail) */}
          <div className="flex-1 flex flex-col overflow-y-auto p-6 md:p-8">
            {selectedTicket ? (
              <div className="max-w-3xl">
                {/* Header */}
                <div className="mb-6 pb-6 border-b border-slate-100">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <h2 className="text-xl font-bold text-slate-800">{selectedTicket.asunto}</h2>
                    <StatusBadge status={selectedTicket.estado} />
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <div className="flex items-center gap-2">
                      <Avatar name={selectedTicket.solicitante} size="sm" />
                      <span className="font-medium text-slate-700">{selectedTicket.solicitante}</span>
                    </div>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {selectedTicket.fecha}
                    </span>
                    <span>•</span>
                    <span className="text-indigo-600 font-medium">Folio: {selectedTicket.id}</span>
                  </div>
                </div>
                
                {/* Timeline */}
                <div className="space-y-6">
                  {/* Request */}
                  <div className="flex gap-4">
                    <div className="h-12 w-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0">
                      <User size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-semibold text-slate-800">{selectedTicket.solicitante}</h4>
                        <span className="text-xs text-slate-400">{selectedTicket.fecha}</span>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {selectedTicket.descripcion}
                      </p>
                    </div>
                  </div>

                  {/* Response */}
                  {selectedTicket.respuesta && (
                    <div className="flex gap-4">
                      <div className="h-12 w-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
                        <ShieldCheck size={20} />
                      </div>
                      <div className="flex-1 bg-emerald-50/50 p-5 rounded-xl border border-emerald-100">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-semibold text-slate-800">{selectedTicket.dependencia}</h4>
                            <Badge variant="success" size="sm">✓ Respuesta Institucional</Badge>
                          </div>
                          <span className="text-xs text-slate-400">{selectedTicket.fechaRespuesta}</span>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          {selectedTicket.respuesta}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="mt-8 pt-6 border-t border-slate-100 flex gap-3">
                  <Button variant="outline" size="sm">
                    <FileText size={16} />
                    Ver historial completo
                  </Button>
                  <Button variant="outline" size="sm">
                    <ShieldCheck size={16} />
                    Auditoría SGC
                  </Button>
                </div>
              </div>
            ) : (
              <div className="m-auto text-center py-12">
                <div className="h-16 w-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ClipboardCheck size={32} />
                </div>
                <p className="text-lg font-semibold text-slate-600 mb-2">Trazabilidad SGC</p>
                <p className="text-sm text-slate-400 max-w-sm mx-auto">Seleccione un requerimiento de la lista para auditar el historial e intercambio de respuestas.</p>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}

export default GestionCalidad
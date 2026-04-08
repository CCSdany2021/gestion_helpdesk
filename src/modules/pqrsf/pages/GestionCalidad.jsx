import React, { useState } from 'react'
import { Card, Badge, Button, Input, cn } from '@/components/ui'
import { 
  Search, 
  Filter, 
  Download, 
  ExternalLink, 
  Calendar,
  Users,
  Grid,
  ClipboardCheck,
  Clock,
  Eye,
  MessageSquare,
  FileText,
  RotateCcw,
  ChevronRight,
  ShieldCheck,
  UserCircle
} from 'lucide-react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { generateFullData } from '../services/mockData'

const mockPQRSF = generateFullData()

const GestionCalidad = () => {
  const [activeTab, setActiveTab] = useState('TODOS')
  const [search, setSearch] = useState('')
  const [selectedTicket, setSelectedTicket] = useState(null)
  const navigate = useNavigate()

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
    <div className="space-y-6 pt-2 pb-2">
      {/* Stats Quick Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-white border-l-4 border-[#0460D9]">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Radicados</p>
          <p className="text-3xl font-black text-[#002855] mt-2">{mockPQRSF.length}</p>
        </Card>
        <Card className="p-6 bg-white border-l-4 border-emerald-500">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Atendidos</p>
          <p className="text-3xl font-black text-[#002855] mt-2">{mockPQRSF.filter(i => i.estado === 'Atendido').length}</p>
        </Card>
        <Card className="p-6 bg-white border-l-4 border-amber-500">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">En Proceso</p>
          <p className="text-3xl font-black text-[#002855] mt-2">{mockPQRSF.filter(i => i.estado === 'En Proceso').length}</p>
        </Card>
      </div>

      <Card className="rounded-none border-none shadow-sm p-1 bg-white">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="flex items-center overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.label}
                onClick={() => { setActiveTab(tab.label); setSelectedTicket(null); }}
                className={cn(
                  "px-6 py-4 flex items-center gap-2 border-b-2 text-[10px] font-black transition-all",
                  activeTab === tab.label 
                    ? "border-[#0460D9] text-[#0460D9]" 
                    : "border-transparent text-slate-400 hover:text-slate-600"
                )}
              >
                {tab.label}
                <span className={cn(
                  "h-5 w-7 flex items-center justify-center rounded-none text-[9px] font-bold",
                  activeTab === tab.label ? "bg-[#0460D9] text-white" : "bg-slate-50 text-slate-400"
                )}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 px-4 py-2 w-full lg:w-auto">
             <div className="relative flex-1 lg:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                <input 
                  type="text"
                  placeholder="FILTRAR POR USUARIO O ID..."
                  className="w-full pl-10 pr-4 py-3 bg-[#F8FAFC] text-[10px] font-black uppercase tracking-widest border-none focus:ring-1 focus:ring-[#0460D9]/20 font-bold outline-none"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
             </div>
          </div>
        </div>
      </Card>

      {/* Trazabilidad Master-Detail View */}
      <div className="flex bg-white h-[calc(100vh-230px)] min-h-[600px] border border-slate-100 shadow-premium overflow-hidden mt-6 rounded-[5px]">
        
        {/* Left Panel (Master) */}
        <div className="w-1/3 md:w-[350px] border-r border-slate-100 flex flex-col bg-slate-50 flex-shrink-0">
            <div className="p-4 border-b border-slate-200 bg-white grid grid-cols-2 gap-2 text-center text-[9px] font-black uppercase tracking-widest text-slate-400">
               <div>TICKET</div>
               <div>ESTADO</div>
            </div>
            
            <div className="flex-1 overflow-y-auto custom-scrollbar">
               {filteredData.map(item => (
                  <div 
                     key={item.id}
                     onClick={() => setSelectedTicket(item)}
                     className={`p-5 border-b border-slate-100 cursor-pointer transition-all ${selectedTicket?.id === item.id ? 'bg-[#0460D9]/5 border-l-4 border-[#0460D9]' : 'hover:bg-slate-100 border-l-4 border-transparent bg-white'}`}
                  >
                     <div className="flex justify-between items-start mb-2">
                        <p className={`text-[11px] font-black uppercase tracking-tight leading-tight flex-1 pr-2 truncate ${selectedTicket?.id === item.id ? 'text-[#0460D9]' : 'text-[#002855]'}`}>{item.solicitante}</p>
                        <div className={`w-2 h-2 rounded-full mt-1 flex-shrink-0 shadow-sm ${item.estado==='Atendido'?'bg-emerald-500':'bg-amber-500'}`} />
                     </div>
                     <p className="text-[10px] text-slate-500 font-bold truncate mb-3">{item.asunto}</p>
                     <div className="flex justify-between items-center text-[9px] text-slate-400 font-bold tracking-widest uppercase">
                        <span>ID: {item.id}</span>
                        <span>{item.fecha}</span>
                     </div>
                  </div>
               ))}
               {filteredData.length === 0 && (
                  <div className="p-8 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                     No hay tickets
                  </div>
               )}
            </div>
        </div>

        {/* Right Panel (Detail) */}
        <div className="flex-1 flex flex-col bg-white overflow-y-auto custom-scrollbar relative p-8 md:p-12">
           {selectedTicket ? (
              <div className="max-w-3xl">
                  {/* Cabecera del Ticket */}
                  <div className="mb-10 pb-6 border-b border-slate-100">
                     <div className="flex items-start justify-between gap-4 mb-4">
                        <h2 className="text-2xl font-black text-[#002855] text-balance leading-tight">{selectedTicket.asunto}</h2>
                        <div className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-widest border border-dashed rounded-[3px] flex-shrink-0 ${selectedTicket.estado==='Atendido' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-amber-50 text-amber-600 border-amber-200'}`}>
                           {selectedTicket.estado}
                        </div>
                     </div>
                     <p className="text-[10px] uppercase tracking-widest text-[#64748B] font-bold">
                        Creado por <span className="text-[#0460D9]">{selectedTicket.solicitante}</span>  •  {selectedTicket.fecha}  (FOLIO: {selectedTicket.id})
                     </p>
                  </div>
                  
                  {/* Hilo de Conversación */}
                  <div className="space-y-12">
                     {/* Mensaje 1: El Solicitante */}
                     <div className="flex gap-5">
                        <div className="w-12 h-12 rounded-full bg-[#0460D9]/10 text-[#0460D9] flex items-center justify-center font-black flex-shrink-0 border border-[#0460D9]/20 shadow-sm relative z-10">
                           <UserCircle size={22} />
                        </div>
                        <div className="flex-1">
                           <div className="flex items-center justify-between mb-3 border-b border-transparent">
                              <h4 className="text-[11px] font-black uppercase tracking-widest text-[#002855]">{selectedTicket.solicitante}</h4>
                              <span className="text-[10px] font-bold text-slate-400">{selectedTicket.fecha}</span>
                           </div>
                           <p className="text-[13px] text-slate-700 leading-relaxed font-medium">
                              {selectedTicket.descripcion}
                           </p>
                        </div>
                     </div>

                     {/* Mensaje 2: La Dependencia (Sólo si está Atendido u hay respuesta) */}
                     {selectedTicket.respuesta && (
                     <div className="flex gap-5 relative">
                        {/* Línea conectora */}
                        <div className="absolute -top-12 left-6 w-px h-12 bg-slate-200 -z-10"></div>
                        
                        <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-black flex-shrink-0 border border-emerald-100 shadow-sm relative z-10">
                           <ShieldCheck size={22} />
                        </div>
                        <div className="flex-1 bg-emerald-50/50 p-6 rounded-lg border border-emerald-100">
                           <div className="flex items-center justify-between mb-3">
                              <h4 className="text-[11px] font-black uppercase tracking-widest text-[#002855]">
                                 {selectedTicket.dependencia} 
                                 <span className="text-emerald-500 ml-2 italic hidden md:inline">✓ Respuesta Institucional</span>
                              </h4>
                              <span className="text-[10px] font-bold text-slate-400">{selectedTicket.fechaRespuesta}</span>
                           </div>
                           <p className="text-[13px] text-slate-700 leading-relaxed font-medium">
                              {selectedTicket.respuesta}
                           </p>
                        </div>
                     </div>
                     )}
                  </div>
              </div>
           ) : (
              <div className="m-auto text-center">
                  <div className="w-20 h-20 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-6">
                     <ClipboardCheck size={36} />
                  </div>
                  <p className="text-[14px] font-black text-slate-400 uppercase tracking-widest">Trazabilidad SGC</p>
                  <p className="text-[11px] font-medium text-slate-400 mt-2 max-w-sm mx-auto">Selecciona un requerimiento de la lista lateral para auditar el historial e intercambio de respuestas institucionales.</p>
              </div>
           )}
        </div>

      </div>
    </div>
  )
}

export default GestionCalidad

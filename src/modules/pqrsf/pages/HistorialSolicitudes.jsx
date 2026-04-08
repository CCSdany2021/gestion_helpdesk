import React, { useState } from 'react'
import { Card, Badge, Button, cn } from '@/components/ui'
import { 
  Search, 
  Filter, 
  Download, 
  Users,
  MessageSquare,
  FileText,
  RotateCcw,
  ChevronRight,
  UserCircle,
  History,
  AlertCircle
} from 'lucide-react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { generateFullData } from '../services/mockData'

const mockFullAdmin = generateFullData()

const HistorialSolicitudes = () => {
  const [activeTab, setActiveTab] = useState('TODOS')
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8
  const navigate = useNavigate()

  const tabs = [
    { label: 'TODOS', count: mockFullAdmin.length },
    { label: 'EN PROCESO', count: mockFullAdmin.filter(i => i.estado === 'En Proceso').length },
    { label: 'ATENDIDOS', count: mockFullAdmin.filter(i => i.estado === 'Atendido').length },
  ]

  const filteredData = mockFullAdmin.filter(item => {
    const matchesTab = activeTab === 'TODOS' || 
                      (activeTab === 'EN PROCESO' && item.estado === 'En Proceso') ||
                      (activeTab === 'ATENDIDOS' && item.estado === 'Atendido')
    
    const matchesSearch = item.id.includes(search) || 
                         item.asunto.toLowerCase().includes(search.toLowerCase()) ||
                         item.solicitante.toLowerCase().includes(search.toLowerCase())
    
    return matchesTab && matchesSearch
  })

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage)

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <div className="space-y-6 pt-2">
      <Card className="rounded-none border-none shadow-sm p-1 bg-white">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="flex items-center overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.label}
                onClick={() => { setActiveTab(tab.label); setCurrentPage(1); }}
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
                  placeholder="FILTRAR HISTORIAL TOTAL..."
                  className="w-full pl-10 pr-4 py-3 bg-[#F8FAFC] text-[10px] font-black uppercase tracking-widest border-none outline-none focus:ring-1 focus:ring-[#0460D9]/20 font-bold"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
             </div>
          </div>
        </div>
      </Card>

      <Card className="rounded-none border-none shadow-premium overflow-x-auto bg-white p-8">
        <table className="w-full text-left border-collapse min-w-[1000px]">
          <thead>
            <tr className="border-b border-slate-100 italic">
              <th className="pb-8 text-[11px] font-black uppercase tracking-[0.15em] text-[#64748B]">Radicado Folio</th>
              <th className="pb-8 text-[11px] font-black uppercase tracking-[0.15em] text-[#64748B] text-center px-4">Estado Actual</th>
              <th className="pb-8 text-[11px] font-black uppercase tracking-[0.15em] text-[#64748B] px-4">Asunto del Ciudadano</th>
              <th className="pb-8 text-[11px] font-black uppercase tracking-[0.15em] text-[#64748B] text-center px-4">Área Responsable</th>
              <th className="pb-8 text-[11px] font-black uppercase tracking-[0.15em] text-[#64748B] text-center px-4 whitespace-nowrap">Fecha Suministrada</th>
              <th className="pb-8 text-[11px] font-black uppercase tracking-[0.15em] text-[#002855] text-right">Trazabilidad</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {paginatedData.map((item) => (
              <tr key={item.id} className="group hover:bg-slate-50/50 transition-colors cursor-pointer" onClick={() => navigate(`/pqrsf/detalle/${item.id}`)}>
                <td className="py-8">
                  <p className="text-[12px] font-black text-[#0460D9] leading-none group-hover:underline uppercase">#{item.id}</p>
                  <p className="text-[8px] font-bold text-slate-300 uppercase mt-2 tracking-widest">SGE · CALASANZ</p>
                </td>
                <td className="py-8 text-center px-4 whitespace-nowrap">
                   <div className={cn(
                     "inline-flex items-center gap-2 px-4 py-1.5 text-[9px] font-black uppercase border",
                     item.estado === 'Atendido' ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-amber-50 text-amber-600 border-amber-100"
                   )}>
                     <div className={cn("h-1.5 w-1.5", item.estado === 'Atendido' ? "bg-emerald-500" : "bg-amber-500")}></div>
                     {item.estado.toUpperCase()}
                   </div>
                </td>
                <td className="py-8 px-4 flex flex-col pt-10">
                   <p className="text-[11px] font-bold text-slate-700 uppercase tracking-tight truncate max-w-[280px]">{item.asunto}</p>
                   <p className="text-[9px] text-slate-400 mt-1 font-bold italic uppercase">{item.tipo} INSTITUCIONAL</p>
                </td>
                <td className="py-8 text-center px-4">
                   <span className="px-4 py-2 bg-slate-50 text-slate-600 text-[10px] font-black uppercase border border-slate-100/50 italic">
                     {item.dependencia.toUpperCase()}
                   </span>
                </td>
                <td className="py-8 text-center text-[10px] font-bold text-slate-500 uppercase">{item.fecha}</td>
                <td className="py-8 text-right px-4">
                   <button className="h-10 px-6 bg-[#0460D9] text-white text-[10px] font-black uppercase tracking-widest hover:bg-[#002855] transition-all rounded-[5px]">
                     VER DETALLE
                   </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <div className="flex items-center justify-between px-2 pb-12">
         <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Auditoría Privada del Sistema • Calasanz Suba 2026</p>
         <div className="flex gap-2">
            <button onClick={() => setCurrentPage(p => Math.max(1, p-1))} disabled={currentPage === 1} className="p-2 border border-slate-200 text-slate-200 self-center">
              <ChevronRight size={16} className="rotate-180" />
            </button>
            <button className="h-8 w-8 bg-[#0460D9] text-white text-[10px] font-black">{currentPage}</button>
            <button onClick={() => setCurrentPage(p => Math.min(totalPages, p+1))} disabled={currentPage === totalPages} className="p-2 border border-slate-200 text-slate-300 self-center">
              <ChevronRight size={16} />
            </button>
         </div>
      </div>
    </div>
  )
}

export default HistorialSolicitudes

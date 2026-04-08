import React, { useState, useEffect } from 'react'
import { Card, Badge, Button, Input, cn } from '@/components/ui'
import { 
  ArrowLeft, 
  Clock, 
  MessageSquare, 
  CheckCircle2, 
  Send, 
  FileText, 
  ShieldCheck, 
  HelpCircle,
  MoreVertical,
  Paperclip,
  UserCircle,
  History,
  Archive,
  Download
} from 'lucide-react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { generateFullData } from '../services/mockData'

const DetalleSolicitud = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [comment, setComment] = useState('')
  const [attachments, setAttachments] = useState([])
  const [ticketData, setTicketData] = useState(null)

  useEffect(() => {
    const dataSource = generateFullData()
    const found = dataSource.find(t => t.id === id)
    if (found) {
      setTicketData({
        ...found,
        lineaTiempo: [
          { fecha: found.fecha + ' 08:00', mensaje: found.descripcion, user: found.solicitante.toUpperCase() },
          found.estado === 'Atendido' ? { fecha: found.fechaRespuesta + ' 15:00', mensaje: found.respuesta, user: found.dependencia } : null
        ].filter(Boolean)
      })
    } else {
      setTicketData({
         id: id,
         asunto: `RADICADO #${id} REGISTRADO`,
         dependencia: 'COORDINACIÓN GENERAL',
         solicitante: 'USUARIO DEL SISTEMA',
         creadoPor: 'ESTUDIANTE SGE: CUENTA INSTITUCIONAL',
         estado: 'Atendido',
         descripcion: 'Buenos días cordial saludo quisiera solicitar información sobre los procesos del colegio.',
         respuesta: 'Cordial saludo, su solicitud ha sido atendida satisfactoriamente según el protocolo institucional.',
         lineaTiempo: [
            { fecha: '2026-03-10 09:00', mensaje: 'Buenos días cordial saludo quisiera solicitar información sobre los procesos del colegio.', user: 'CIUDADANO' },
            { fecha: '2026-03-12 11:00', mensaje: 'Cordial saludo, su solicitud ha sido atendida satisfactoriamente según el protocolo institucional.', user: 'ADMINISTRACIÓN' }
         ]
      })
    }
  }, [id])

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)
    setAttachments([...attachments, ...files.map(f => f.name)])
  }

  if (!ticketData) return null

  return (
    <div className="w-full space-y-8 pb-20 pt-2 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between bg-white p-6 shadow-premium border border-slate-100 gap-6">
         <div className="flex items-center gap-6">
            <button 
              onClick={() => navigate(-1)}
              className="h-12 w-12 border border-slate-100 flex items-center justify-center hover:bg-slate-50 transition-all text-slate-400 group"
            >
               <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            </button>
            <div>
               <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">Radicado Folio</span>
                  <Badge variant="outline" className="text-[10px] bg-slate-50 border-slate-200">SGE-2026</Badge>
               </div>
               <h2 className="text-xl font-black text-[#002855] tracking-tighter italic uppercase leading-none">{ticketData.asunto}</h2>
            </div>
         </div>
         <div className="flex items-center gap-4">
            <div className={cn(
              "px-8 py-3 text-[10px] font-black uppercase tracking-widest border shadow-sm",
              ticketData.estado === 'Atendido' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-amber-50 text-amber-600 border-amber-200'
            )}>
              {ticketData.estado.toUpperCase()}
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <div className="space-y-8">
           <Card className="p-10 bg-white shadow-premium rounded-none border-none border-l-4 border-primary">
               {/* Metadata Grid con DisplayName */}
               <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-16 p-8 bg-slate-50/50 border border-slate-100 italic">
                  <div>
                     <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Responsable</p>
                     <p className="text-[11px] font-black text-[#002855] uppercase">{ticketData.dependencia}</p>
                  </div>
                  <div>
                     <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Solicitante</p>
                     <p className="text-[11px] font-black text-[#002855] uppercase italic">{ticketData.solicitante}</p>
                  </div>
                  <div className="lg:col-span-1 border-l border-slate-200 pl-4">
                     <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mb-1">Cuenta Origen (DisplayName)</p>
                     <p className="text-[10px] font-black text-slate-700 uppercase italic truncate">{ticketData.creadoPor}</p>
                  </div>
                  <div>
                     <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">ID Único</p>
                     <p className="text-[11px] font-black text-[#0460D9] uppercase italic">#{ticketData.id}</p>
                  </div>
                  <div className="flex justify-end items-center">
                     <Button variant="outline" size="sm" className="bg-white hover:bg-slate-50 border-slate-200 text-[9px] font-black">
                        <Download size={14} className="mr-2" /> PDF HISTÓRICO
                     </Button>
                  </div>
               </div>

              <div className="mb-12">
                 <div className="flex items-center gap-3 mb-8">
                    <History size={20} className="text-[#0460D9]" />
                    <h3 className="text-xs font-black uppercase tracking-[0.25em] text-[#002855]">Historial de la Solicitud</h3>
                 </div>

                 <div className="relative pl-12 space-y-12">
                    <div className="absolute left-[20px] top-4 bottom-4 w-[1px] bg-slate-100"></div>
                    {ticketData.lineaTiempo.map((event, idx) => (
                      <div key={idx} className="relative group">
                         {/* Subtitulos de flujo de conversación */}
                         <div className={cn(
                           "mb-4 text-[9px] font-black uppercase tracking-[0.3em] px-3 py-1 inline-block",
                           idx === 0 ? "text-amber-600 bg-amber-50" : "text-emerald-600 bg-emerald-50"
                         )}>
                            {idx === 0 ? "Descripción de la Solicitud" : "Respuesta Institucional"}
                         </div>

                         <div className="absolute -left-12 h-10 w-10 bg-white border-2 border-slate-100 flex items-center justify-center z-10 shadow-sm group-hover:border-[#0460D9] transition-all">
                            <div className={cn("h-2 w-2", idx === 0 ? "bg-amber-400" : "bg-emerald-400")}></div>
                          </div>
                         <div className={cn(
                           "bg-white border p-8 shadow-sm hover:shadow-premium transition-all",
                           idx === 0 ? "border-amber-100" : "border-emerald-100"
                         )}>
                            <div className="flex items-center justify-between mb-4">
                               <span className={cn(
                                 "text-[10px] font-black uppercase tracking-widest",
                                 idx === 0 ? "text-amber-800" : "text-emerald-800"
                               )}>{event.user}</span>
                               <span className="text-[9px] font-bold text-slate-500 uppercase italic">{event.fecha}</span>
                            </div>
                            <p className="text-[12px] font-bold text-slate-800 uppercase tracking-tight italic leading-relaxed">
                               "{event.mensaje}"
                            </p>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>

              {ticketData.estado === 'En Proceso' && (
                <div className="mt-20 pt-12 border-t border-slate-100">
                   <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
                      <div className="h-14 w-14 bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-300">
                         <UserCircle size={32} />
                      </div>
                      <div className="flex flex-col">
                         <span className="text-[10px] font-black text-[#001d3d] uppercase tracking-widest">Registrar Respuesta Técnica</span>
                         <span className="text-[9px] font-bold text-slate-300 uppercase italic">{ticketData.dependencia}</span>
                      </div>
                   </div>
                   
                   <div className="space-y-6">
                      <div className="relative">
                         <textarea 
                           className="w-full min-h-[180px] p-8 bg-[#FDFDFD] border border-slate-100 text-[12px] font-bold uppercase tracking-wider outline-none focus:ring-2 focus:ring-[#0460D9]/10 resize-none transition-all"
                           placeholder="Escriba aquí la respuesta final para el ciudadano..."
                           value={comment}
                           onChange={(e) => setComment(e.target.value)}
                         />
                         <div className="absolute right-6 bottom-6 flex gap-4">
                            <label className="h-12 px-6 bg-white border border-slate-200 text-slate-400 text-[9px] font-black uppercase tracking-widest flex items-center gap-3 cursor-pointer hover:border-[#0460D9] hover:text-[#0460D9] transition-all">
                               <Paperclip size={14} /> Adjuntar Evidencia
                               <input type="file" multiple className="hidden" onChange={handleFileChange} />
                            </label>
                         </div>
                      </div>

                      {attachments.length > 0 && (
                        <div className="flex flex-wrap gap-3">
                           {attachments.map((file, idx) => (
                             <div key={idx} className="px-4 py-3 bg-emerald-50 text-emerald-600 text-[9px] font-black uppercase tracking-widest border border-emerald-100 flex items-center gap-3 shadow-sm italic">
                               <FileText size={14} /> {file}
                             </div>
                           ))}
                        </div>
                      )}

                      <div className="flex justify-end pt-8">
                         <Button size="lg" className="px-16 h-14 !rounded-none bg-[#0460D9] text-white font-black uppercase tracking-widest shadow-2xl shadow-blue-500/20">
                            CERRAR Y NOTIFICAR <Send size={16} className="ml-3" />
                         </Button>
                      </div>
                   </div>
                </div>
              )}
           </Card>
        </div>
      </div>
    </div>
  )
}

export default DetalleSolicitud

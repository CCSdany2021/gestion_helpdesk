import React, { useState, useEffect } from 'react'
import { Card, Badge, Button, Avatar } from '@/components/ui'
import { 
  ArrowLeft, 
  Clock, 
  MessageSquare, 
  CheckCircle2, 
  Send, 
  FileText, 
  ShieldCheck, 
  Paperclip,
  Download,
  Calendar,
  User,
  Building2,
  ChevronRight,
  AlertCircle,
  CheckCircle
} from 'lucide-react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { generateFullData } from '../services/mockData'

const StatusBadge = ({ status }) => {
  const config = {
    'En Proceso': { icon: Clock, bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-100' },
    'Atendido': { icon: CheckCircle, bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-100' },
    'Pendiente': { icon: AlertCircle, bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-100' },
  }
  
  const { icon: Icon, bg, text, border } = config[status] || config['En Proceso']
  
  return (
    <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border ${bg} ${text} ${border}`}>
      <Icon size={18} />
      {status}
    </span>
  )
}

const InfoItem = ({ icon: Icon, label, value, highlight }) => (
  <div className="flex items-start gap-3">
    <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 flex-shrink-0">
      <Icon size={18} />
    </div>
    <div>
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <p className={`text-sm font-semibold ${highlight ? 'text-indigo-600' : 'text-slate-800'}`}>{value}</p>
    </div>
  </div>
)

const TimelineItem = ({ event, isLast, index }) => {
  const isRequest = index === 0
  
  return (
    <div className="relative flex gap-4">
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-5 top-12 bottom-0 w-0.5 bg-slate-200"></div>
      )}
      
      {/* Icon */}
      <div className={`h-10 w-10 rounded-full flex items-center justify-center z-10 flex-shrink-0 ${
        isRequest ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'
      }`}>
        {isRequest ? <MessageSquare size={18} /> : <CheckCircle2 size={18} />}
      </div>
      
      {/* Content */}
      <div className="flex-1 pb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            isRequest ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'
          }`}>
            {isRequest ? 'Solicitud' : 'Respuesta'}
          </span>
          <span className="text-xs text-slate-500 flex items-center gap-1">
            <Calendar size={12} />
            {event.fecha}
          </span>
        </div>
        
        <Card className="p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Avatar name={event.user} size="sm" />
              <span className="text-sm font-semibold text-slate-800">{event.user}</span>
            </div>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">{event.mensaje}</p>
        </Card>
      </div>
    </div>
  )
}

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
          { fecha: '15/03/2026 - 09:30 AM', mensaje: found.descripcion, user: found.solicitante },
          found.estado === 'Atendido' ? { fecha: '17/03/2026 - 02:15 PM', mensaje: found.respuesta, user: found.dependencia } : null
        ].filter(Boolean)
      })
    } else {
      setTicketData({
         id: id,
         asunto: 'Solicitud de información sobre procesos institucionales',
         dependencia: 'Coordinación General',
         solicitante: 'Juan Pérez',
         creadoPor: 'juan.perez@calasanz.edu.co',
         tipo: 'Petición',
         estado: 'Atendido',
         descripcion: 'Buenos días, cordial saludo. Quisiera solicitar información sobre los procesos de matrículas y requisitos de inscripción para el próximo año escolar.',
         respuesta: 'Cordial saludo. Le informamos que los requisitos de matrícula están disponibles en nuestra página web www.calasanz.edu.co en la sección de admissions. Cualquier duda adicional puede comunicarse al área de secretaría.',
         fecha: '15/03/2026',
         fechaRespuesta: '17/03/2026',
         lineaTiempo: [
            { fecha: '15/03/2026 - 09:30 AM', mensaje: 'Buenos días, cordial saludo. Quisiera solicitar información sobre los procesos de matrículas y requisitos de inscripción para el próximo año escolar.', user: 'Juan Pérez' },
            { fecha: '17/03/2026 - 02:15 PM', mensaje: 'Cordial saludo. Le informamos que los requisitos de matrícula están disponibles en nuestra página web. Cualquier duda adicional puede comunicarse al área de secretaría.', user: 'Coordinación General' }
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
    <div className="space-y-6">
      {/* Header Card */}
      <Card className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => navigate(-1)}
              className="h-12 w-12"
            >
              <ArrowLeft size={20} />
            </Button>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-slate-500">Radicado</span>
                <Badge variant="primary">SGE-2026</Badge>
              </div>
              <h1 className="text-xl font-bold text-slate-800">{ticketData.asunto}</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <StatusBadge status={ticketData.estado} />
            <Button variant="outline">
              <Download size={18} />
              Exportar PDF
            </Button>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Timeline */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
                <Clock size={20} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-800">Historial de la Solicitud</h2>
                <p className="text-sm text-slate-500">Seguimiento completo del radicado</p>
              </div>
            </div>
            
            <div className="pl-2">
              {ticketData.lineaTiempo.map((event, idx) => (
                <TimelineItem 
                  key={idx} 
                  event={event} 
                  isLast={idx === ticketData.lineaTiempo.length - 1}
                  index={idx}
                />
              ))}
            </div>
          </Card>

          {/* Response Form */}
          {ticketData.estado === 'En Proceso' && (
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center">
                  <Send size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-800">Responder Solicitud</h2>
                  <p className="text-sm text-slate-500">Ingrese la respuesta oficial</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <textarea 
                  className="w-full min-h-[160px] p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none"
                  placeholder="Escriba aquí la respuesta para el ciudadano..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 cursor-pointer hover:border-indigo-300 hover:bg-indigo-50/50 transition-all">
                    <Paperclip size={18} />
                    Adjuntar archivo
                    <input type="file" multiple className="hidden" onChange={handleFileChange} />
                  </label>
                  
                  {attachments.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {attachments.map((file, idx) => (
                        <span key={idx} className="px-3 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-lg flex items-center gap-2">
                          <FileText size={14} />
                          {file}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex justify-end pt-4">
                  <Button size="lg">
                    <Send size={18} />
                    Enviar Respuesta
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          {/* Request Info */}
          <Card className="p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Información de la Solicitud</h3>
            <div className="space-y-4">
              <InfoItem 
                icon={User} 
                label="Solicitante" 
                value={ticketData.solicitante}
                highlight
              />
              <InfoItem 
                icon={Building2} 
                label="Dependencia" 
                value={ticketData.dependencia}
              />
              <InfoItem 
                icon={Calendar} 
                label="Fecha de Creación" 
                value={ticketData.fecha}
              />
              <InfoItem 
                icon={FileText} 
                label="Tipo" 
                value={ticketData.tipo || 'Petición'}
              />
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Acciones Rápidas</h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <ChevronRight size={18} />
                Asignar a otra dependencia
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <ShieldCheck size={18} />
                Escalear a Calidad
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <AlertCircle size={18} />
                Reportar problema
              </Button>
            </div>
          </Card>

          {/* SLA Info */}
          <Card className="p-6 bg-gradient-to-br from-indigo-500 to-indigo-600 text-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">Estado del SLA</h3>
              <Clock size={20} className="text-white/70" />
            </div>
            <div className="text-3xl font-bold mb-2">4.2 días</div>
            <p className="text-sm text-white/80 mb-4">Tiempo promedio de respuesta</p>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full w-[75%] bg-white rounded-full"></div>
            </div>
            <p className="text-xs text-white/70 mt-2">75% del tiempo permitido consumido</p>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default DetalleSolicitud
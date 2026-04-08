import React, { useState } from 'react'
import { Card, Input, Button, Badge, cn } from '@/components/ui'
import { 
  Send, 
  Upload, 
  X, 
  FileText, 
  HelpCircle, 
  AlertTriangle, 
  MessageSquare, 
  CheckCircle2, 
  ArrowRight,
  Info
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const pqrsfTypes = [
  { id: 'P', label: 'Petición', icon: HelpCircle, color: 'bg-blue-500', description: 'Solicitud formal de información o servicios.' },
  { id: 'Q', label: 'Queja', icon: AlertTriangle, color: 'bg-red-500', description: 'Manifestación de inconformidad por una situación.' },
  { id: 'R', label: 'Reclamo', icon: FileText, color: 'bg-orange-500', description: 'Exigencia por la prestación deficiente de un servicio.' },
  { id: 'S', label: 'Sugerencia', icon: MessageSquare, color: 'bg-emerald-500', description: 'Idea para mejorar la prestación del servicio.' },
  { id: 'F', label: 'Felicitación', icon: CheckCircle2, color: 'bg-pink-500', description: 'Expresión de satisfacción por el servicio recibido.' },
]

const NuevaSolicitud = () => {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    tipo: '',
    asunto: '',
    descripcion: '',
    afectado: '',
    dependencia: '',
  })
  const [files, setFiles] = useState([])

  const handleTypeSelect = (type) => {
    setFormData({ ...formData, tipo: type })
    setStep(2)
  }

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files)
    setFiles([...files, ...selectedFiles])
  }

  const removeFile = (idx) => {
    setFiles(files.filter((_, i) => i !== idx))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Enviando:', formData, files)
    setStep(3)
  }

  return (
    <div className="w-full py-2">
      {/* Stepper Superior */}
      <div className="flex items-center justify-between mb-12 px-12 relative">
        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-slate-200 -z-0"></div>
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex flex-col items-center gap-2 relative z-10 bg-app-bg px-4">
            <div className={`
              h-8 w-8 flex items-center justify-center font-black text-[10px] transition-all duration-500
              ${step === s ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-125' : step > s ? 'bg-primary-dark text-white' : 'bg-white border border-slate-200 text-slate-300'}
            `}>
              {step > s ? <CheckCircle2 size={16} /> : s}
            </div>
            <span className={`text-[9px] font-black uppercase tracking-widest ${step === s ? 'text-primary' : 'text-slate-400'}`}>
              {s === 1 ? 'Categoría' : s === 2 ? 'Información' : 'Finalizar'}
            </span>
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {pqrsfTypes.map((type) => (
              <Card 
                key={type.id}
                onClick={() => handleTypeSelect(type.id)}
                className="p-8 cursor-pointer border border-slate-100 hover:border-primary transition-all group relative active:scale-[0.98]"
              >
                <div className={cn(
                  "h-12 w-12 flex items-center justify-center text-white mb-6 transition-transform group-hover:scale-110 shadow-lg",
                  type.id === 'P' ? 'bg-[#0460D9]' : type.id === 'Q' ? 'bg-red-600' : type.id === 'R' ? 'bg-orange-500' : type.id === 'S' ? 'bg-emerald-600' : 'bg-primary-dark'
                )}>
                  <type.icon size={24} />
                </div>
                <h3 className="font-black text-sm text-slate-900 uppercase tracking-widest">{type.label}</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight leading-relaxed mt-2">{type.description}</p>
                <div className="absolute bottom-6 right-6 text-slate-200 group-hover:text-primary transition-colors">
                  <ArrowRight size={18} />
                </div>
              </Card>
            ))}
          </motion.div>
        )}

        {step === 2 && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            <div className="lg:col-span-2">
              <Card className="p-10 border-t-4 border-primary">
                <div className="flex items-center gap-4 mb-10">
                   <div className="h-10 w-10 bg-slate-50 text-primary border border-slate-100 flex items-center justify-center">
                    <FileText size={20} />
                   </div>
                   <div>
                     <h2 className="text-xl font-black text-primary tracking-tight">DATOS DEL RADICADO</h2>
                     <Badge variant="info">TIPO SELECCIONADO: {pqrsfTypes.find(t => t.id === formData.tipo)?.label}</Badge>
                   </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <Input 
                    label="Asunto de la solicitud" 
                    placeholder="ESCRIBA EL ASUNTO AQUÍ..." 
                    value={formData.asunto}
                    onChange={(e) => setFormData({...formData, asunto: e.target.value.toUpperCase()})}
                    required
                  />
                  
                  <div className="space-y-2">
                    <label className="subtitle-premium block">Descripción Detallada</label>
                    <textarea 
                      className="input-field min-h-[150px] resize-none"
                      placeholder="DETALLE LOS HECHOS CON CLARIDAD..."
                      value={formData.descripcion}
                      onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                      required
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                     <div className="space-y-2">
                       <label className="subtitle-premium block">Dependencia Destino</label>
                       <select 
                        className="input-field uppercase font-bold text-[11px] tracking-widest cursor-pointer"
                        value={formData.dependencia}
                        onChange={(e) => setFormData({...formData, dependencia: e.target.value})}
                       >
                         <option value="">-- SELECCIONAR ÁREA --</option>
                         <option value="acad">SECCIÓN JARDÍN - TERCERO</option>
                         <option value="acad">SECCIÓN CUARTO - SÉPTIMO</option>
                         <option value="acad">SECCIÓN OCTAVO - UNDÉCIMO</option>
                         <option value="fin">TESORERÍA / FINANCIERA</option>
                         <option value="sist">SISTEMAS / IT</option>
                         <option value="admin">DIRECCIÓN ADMINISTRATIVA</option>
                         <option value="rect">RECTORÍA / SECRETARÍA</option>
                       </select>
                     </div>
                     <Input 
                        label="Nombre Completo del Afectado" 
                        placeholder="NOMBRE Y APELLIDO..." 
                        value={formData.afectado}
                        onChange={(e) => setFormData({...formData, afectado: e.target.value.toUpperCase()})}
                     />
                  </div>

                  <div className="pt-8 flex items-center justify-between border-t border-slate-100">
                    <Button variant="outline" type="button" onClick={() => setStep(1)} size="md">
                      VOLVER
                    </Button>
                    <Button type="submit" size="lg" className="px-12">
                      RADICAR PROCESO <Send size={16} className="ml-2" />
                    </Button>
                  </div>
                </form>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="p-8 bg-[#002855] text-white border-none shadow-2xl relative overflow-hidden">
                <div className="relative z-10">
                  <h4 className="text-[11px] font-black uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                    <Upload size={16} className="text-accent" /> Evidencias
                  </h4>
                  <p className="text-[9px] text-slate-400 font-bold uppercase mb-6 leading-relaxed">PDF, JPG, PNG (MÁX 10MB)</p>
                  
                  <label className="block border-2 border-dashed border-slate-700 p-8 text-center hover:bg-[#003875] transition-all cursor-pointer group">
                    <input type="file" multiple className="hidden" onChange={handleFileChange} />
                    <HelpCircle className="mx-auto text-slate-600 group-hover:text-accent mb-3 transition-colors" size={32} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Cargar Archivo</span>
                  </label>

                  <div className="mt-6 space-y-2">
                    {files.map((file, i) => (
                      <div key={i} className="flex items-center justify-between bg-black/20 p-3 text-[9px] font-black uppercase tracking-widest">
                        <span className="truncate max-w-[140px]">{file.name}</span>
                        <button onClick={() => removeFile(i)} className="text-red-400 hover:text-white">
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              <div className="bg-amber-50 border border-amber-100 p-6 flex gap-4 text-amber-800">
                <Info size={24} className="flex-shrink-0" />
                <div className="text-[10px] uppercase font-bold tracking-tight">
                   <p className="font-black text-amber-900 mb-1">IMPORTANTE:</p>
                   <p className="opacity-80 leading-relaxed">La radicación es un proceso formal. El tiempo legal de respuesta es de 15 días hábiles.</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="h-28 w-28 bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center mb-8 shadow-2xl shadow-emerald-500/10">
              <CheckCircle2 size={56} />
            </div>
            <h1 className="text-3xl font-black text-[#0460D9] tracking-tighter uppercase">¡Trámite Radicado!</h1>
            <p className="subtitle-premium !text-emerald-600 mt-2">FOLIO ASIGNADO: #PQRSF-2026-0042</p>
            <p className="text-slate-400 max-w-sm mt-6 text-[11px] font-bold uppercase tracking-tight leading-relaxed">
              SU SOLICITUD HA ENTRADO EN FASE DE REVISIÓN TÉCNICA. RECIBIRÁ UNA NOTIFICACIÓN EN SU CORREO INSTITUCIONAL.
            </p>
            
            <div className="mt-12 flex gap-4">
               <Button variant="outline" onClick={() => navigate('/pqrsf/mis-solicitudes')} size="lg">
                 VER SEGUIMIENTO
               </Button>
               <Button onClick={() => setStep(1)} size="lg" className="px-10">
                 NUEVO TRÁMITE
               </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default NuevaSolicitud

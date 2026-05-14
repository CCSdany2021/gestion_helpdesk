import React, { useState } from 'react'
import { Card, Input, Button, Badge } from '@/components/ui'
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
  ArrowLeft,
  User,
  Building2
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const pqrsfTypes = [
  { id: 'P', label: 'Petición', icon: HelpCircle, color: 'bg-indigo-500', description: 'Solicitud formal de información o servicios.' },
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
    setStep(3)
  }

  const selectedType = pqrsfTypes.find(t => t.id === formData.tipo)

  return (
    <div className="space-y-6">
      {/* Step Indicator */}
      <div className="flex items-center justify-center gap-4">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`h-10 w-10 rounded-full flex items-center justify-center font-semibold ${
              step >= s ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'
            }`}>
              {step > s ? <CheckCircle2 size={20} /> : s}
            </div>
            <span className={`text-sm font-medium ${step >= s ? 'text-slate-800' : 'text-slate-400'}`}>
              {s === 1 ? 'Tipo' : s === 2 ? 'Detalles' : 'Confirmación'}
            </span>
            {s < 3 && <div className={`w-12 h-0.5 ${step > s ? 'bg-indigo-600' : 'bg-slate-200'}`} />}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-slate-800">Seleccione el tipo de solicitud</h1>
              <p className="text-slate-500 mt-2">Elija la categoría que mejor describe su necesidad</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {pqrsfTypes.map((type) => (
                <Card 
                  key={type.id}
                  className="p-6 cursor-pointer hover:shadow-lg hover:border-indigo-300 transition-all group text-center relative"
                  onClick={() => handleTypeSelect(type)}
                >
                  <div className={`h-14 w-14 ${type.color} rounded-xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg`}>
                    <type.icon size={28} />
                  </div>
                  <h3 className="text-base font-semibold text-slate-800 mb-2">{type.label}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{type.description}</p>
                  <div className="absolute top-4 right-4 text-slate-300 group-hover:text-indigo-600 transition-colors">
                    <ArrowRight size={20} />
                  </div>
                </Card>
              ))}
            </div>
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
              <Card className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-12 w-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center">
                    <FileText size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-800">Detalles de la Solicitud</h2>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="primary">{selectedType?.label}</Badge>
                    </div>
                  </div>
                  <button onClick={() => setStep(1)} className="ml-auto text-slate-400 hover:text-slate-600">
                    <ArrowLeft size={20} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <Input 
                    label="Asunto" 
                    placeholder="Breve descripción del tema"
                    value={formData.asunto}
                    onChange={(e) => setFormData({...formData, asunto: e.target.value})}
                    required
                  />
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700">Descripción detallada</label>
                    <textarea 
                      className="input-field min-h-[140px] resize-none"
                      placeholder="Describa los hechos con claridad..."
                      value={formData.descripcion}
                      onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                      required
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-slate-700">Dependencia</label>
                      <select 
                        className="input-field"
                        value={formData.dependencia}
                        onChange={(e) => setFormData({...formData, dependencia: e.target.value})}
                      >
                        <option value="">Seleccionar...</option>
                        <option value="acad">Sección Jardín - Tercero</option>
                        <option value="acad">Sección Cuarto - Séptimo</option>
                        <option value="acad">Sección Octavo - Undécimo</option>
                        <option value="fin">Tesorería</option>
                        <option value="sist">Sistemas / IT</option>
                        <option value="admin">Dirección Administrativa</option>
                        <option value="rect">Rectoría / Secretaría</option>
                      </select>
                    </div>
                    <Input 
                      label="Nombre del afectado (opcional)" 
                      placeholder="Nombre completo"
                      value={formData.afectado}
                      onChange={(e) => setFormData({...formData, afectado: e.target.value})}
                    />
                  </div>

                  {/* File Upload */}
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-slate-700">Adjuntos (opcional)</label>
                    <label className="flex items-center justify-center gap-2 p-6 border-2 border-dashed border-slate-200 rounded-xl cursor-pointer hover:border-indigo-300 hover:bg-indigo-50/50 transition-all">
                      <Upload size={24} className="text-slate-400" />
                      <span className="text-slate-500">Haga clic para adjuntar archivos</span>
                      <input type="file" multiple className="hidden" onChange={handleFileChange} />
                    </label>
                    {files.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {files.map((file, idx) => (
                          <div key={idx} className="flex items-center gap-2 px-3 py-2 bg-indigo-50 text-indigo-700 rounded-lg text-sm">
                            <FileText size={16} />
                            <span>{file.name}</span>
                            <button type="button" onClick={() => removeFile(idx)} className="hover:text-indigo-900">
                              <X size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button type="button" variant="outline" onClick={() => setStep(1)}>
                      <ArrowLeft size={18} />
                      Volver
                    </Button>
                    <Button type="submit" className="ml-auto">
                      <Send size={18} />
                      Radicar Solicitud
                    </Button>
                  </div>
                </form>
              </Card>
            </div>

            {/* Summary Sidebar */}
            <div className="space-y-4">
              <Card className="p-6">
                <h3 className="font-semibold text-slate-800 mb-4">Resumen</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center">
                      <FileText size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Tipo</p>
                      <p className="text-sm font-semibold text-slate-800">{selectedType?.label}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-slate-100 text-slate-600 rounded-lg flex items-center justify-center">
                      <Building2 size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Dependencia</p>
                      <p className="text-sm font-semibold text-slate-800">{formData.dependencia || 'Sin asignar'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-slate-100 text-slate-600 rounded-lg flex items-center justify-center">
                      <Upload size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Adjuntos</p>
                      <p className="text-sm font-semibold text-slate-800">{files.length} archivos</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-indigo-50 border-indigo-100">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <HelpCircle size={18} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-1">¿Necesita ayuda?</h4>
                    <p className="text-sm text-slate-600">Si tiene dudas sobre el proceso, puede contactarnos por los canales oficiales.</p>
                  </div>
                </div>
              </Card>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-center py-12"
          >
            <Card className="p-12 text-center max-w-md">
              <div className="h-20 w-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={40} />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Solicitud Radicada</h2>
              <p className="text-slate-500 mb-6">Su solicitud ha sido creada exitosamente. Puede hacer seguimiento con el número de radicado.</p>
              
              <div className="bg-slate-50 rounded-xl p-4 mb-6">
                <p className="text-xs text-slate-500 mb-1">Número de Radicado</p>
                <p className="text-2xl font-bold text-indigo-600">PQRS-2026-0142</p>
              </div>

              <div className="flex gap-4 justify-center">
                <Button variant="outline" onClick={() => {
                  setStep(1)
                  setFormData({ tipo: '', asunto: '', descripcion: '', afectado: '', dependencia: '' })
                  setFiles([])
                }}>
                  Nueva Solicitud
                </Button>
                <Button onClick={() => window.location.href = '/pqrsf/mis-solicitudes'}>
                  Ver mis solicitudes
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default NuevaSolicitud
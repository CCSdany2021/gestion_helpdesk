import React, { useState, useMemo } from 'react'
import { Card, Badge, cn } from '@/components/ui'
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, LabelList
} from 'recharts'
import { 
  Filter, 
  Download, 
  TrendingUp, 
  Users, 
  Clock, 
  FileText,
  ShieldCheck,
  BarChart3,
  UserCheck,
  Eye,
  X,
  MessageCircle,
  CalendarClock,
  FileCheck2
} from 'lucide-react'
import { generateFullData } from '../services/mockData'

const allTickets = generateFullData()

const getTypeColor = (tipo) => {
    const t = (tipo || '').toLowerCase();
    if (t.includes('petición') || t.includes('peticion')) return 'bg-blue-100 text-blue-800 border-blue-200';
    if (t.includes('queja')) return 'bg-red-100 text-red-800 border-red-200';
    if (t.includes('reclamo')) return 'bg-orange-100 text-orange-800 border-orange-200';
    if (t.includes('sugerencia')) return 'bg-teal-100 text-teal-800 border-teal-200';
    if (t.includes('atención') || t.includes('padre')) return 'bg-purple-100 text-purple-800 border-purple-200';
    if (t.includes('felicitación') || t.includes('felicitacion')) return 'bg-pink-100 text-pink-800 border-pink-200';
    return 'bg-slate-100 text-slate-800 border-slate-200';
}

// Helper to parse DD/MM/YYYY
const parseDate = (dateStr) => {
  if (!dateStr || dateStr === '--') return null;
  const [d, m, y] = dateStr.split('/');
  return new Date(y, m - 1, d);
}

const calculateResponseDays = (start, end) => {
  const ds = parseDate(start);
  const de = parseDate(end);
  if (!ds || !de) return null;
  const diffTime = Math.abs(de - ds);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
}

const Analisis = () => {
  const [selectedArea, setSelectedArea] = useState('TODAS')
  const [selectedTipo, setSelectedTipo] = useState('TODOS')
  const [selectedTicket, setSelectedTicket] = useState(null)
  
  const stats = useMemo(() => {
    // Aplicamos AMBOS filtros
    const filtered = allTickets.filter(t => {
      const matchArea = selectedArea === 'TODAS' || t.dependencia === selectedArea;
      const matchTipo = selectedTipo === 'TODOS' || t.tipo === selectedTipo;
      return matchArea && matchTipo;
    });
      
    const total = filtered.length;
    const atendidos = filtered.filter(t => t.estado === 'Atendido').length;
    const enProceso = filtered.filter(t => t.estado === 'En Proceso').length;
    
    // Average response time & SLA
    let totalDays = 0;
    let countResponded = 0;
    let countOportuno = 0; // Tickets respondidos oportunamente (<= 5 días)
    
    filtered.forEach(t => {
      if (t.estado === 'Atendido' && t.fechaRespuesta !== '--') {
        const days = calculateResponseDays(t.fecha, t.fechaRespuesta);
        if (days !== null) {
          totalDays += days;
          countResponded++;
          if (days <= 5) countOportuno++;
        }
      }
    });
    const avgResponseTime = countResponded > 0 ? (totalDays / countResponded).toFixed(1) : 0;
    const slaRate = countResponded > 0 ? ((countOportuno / countResponded) * 100).toFixed(1) : 0;

    // Dependencias proporciones basadas en los datos filtrados
    const areasMap = {};
    filtered.forEach(t => {
      areasMap[t.dependencia] = (areasMap[t.dependencia] || 0) + 1;
    });
    const areasData = Object.entries(areasMap).map(([name, count]) => ({
      name,
      count,
      pct: ((count / (total || 1)) * 100).toFixed(1) + '%'
    })).sort((a, b) => b.count - a.count);

    const dataMonthly = [
      { name: 'ENE-2026', total: filtered.filter(t => t.fecha.includes('/01/2026')).length },
      { name: 'FEB-2026', total: filtered.filter(t => t.fecha.includes('/02/2026')).length },
      { name: 'MAR-2026', total: filtered.filter(t => t.fecha.includes('/03/2026')).length },
    ];

    const typeMap = {};
    filtered.forEach(t => {
      typeMap[t.tipo] = (typeMap[t.tipo] || 0) + 1;
    });
    const COLORS = ['#2563EB', '#1e40af', '#F59E0B', '#EF4444', '#10B981', '#8B5CF6'];
    const dataByAsunto = Object.entries(typeMap).map(([name, value], idx) => ({
      name,
      value,
      color: COLORS[idx % COLORS.length]
    }));

    return { total, atendidos, enProceso, avgResponseTime, slaRate, areasData, dataMonthly, dataByAsunto, filtered };
  }, [selectedArea, selectedTipo]);

  const uniqueAreas = useMemo(() => ['TODAS', ...new Set(allTickets.map(t => t.dependencia))], []);
  const uniqueTipos = useMemo(() => ['TODOS', ...new Set(allTickets.map(t => t.tipo))], []);

  const handleExportExcel = () => {
    // Agregamos estructura ISO y tag de charset utf-8
    let tableHtml = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
      <head><meta charset="UTF-8"></head>
      <body>
      <table border="1">
      <tr style="background-color: #1e3a8a; color: white; font-weight: bold;">
        <th>ID</th><th>FECHA</th><th>TIPO</th><th>ASUNTO</th><th>SOLICITANTE</th><th>DEPENDENCIA</th><th>ESTADO</th><th>RESPUESTA</th>
      </tr>`;
    
    // Exportamos los datos filtrados en pantalla
    stats.filtered.forEach(t => {
      tableHtml += `<tr>
        <td>${t.id}</td><td>${t.fecha}</td><td>${t.tipo}</td><td>${t.asunto}</td>
        <td>${t.solicitante}</td><td>${t.dependencia}</td><td>${t.estado}</td><td>${t.respuesta}</td>
      </tr>`;
    });
    tableHtml += '</table></body></html>';

    // Agregamos BOM Universal (\uFEFF) para forzar en sistemas como Windows/Excel
    const blob = new Blob(['\uFEFF' + tableHtml], { type: 'application/vnd.ms-excel;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `AUDITORIA_PQRSF_CALASANZ_FILTRADO.xls`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  const handleExportPDF = () => {
    window.print();
  }

  return (
    <div className="space-y-6 pt-2 pb-20 no-print">
      {/* Header and Filters */}
      <Card className="rounded-xl border border-blue-900/10 shadow-lg p-6 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-950 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
          <BarChart3 size={150} />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto flex-1">
             <div className="p-4 bg-white/10 rounded-xl backdrop-blur-md border border-white/20 shadow-inner hidden md:block">
                <Filter size={24} className="text-blue-100" />
             </div>
             
             {/* Filtro Dependencia */}
             <div className="w-full md:w-64">
                <p className="text-[10px] font-bold text-blue-200 uppercase tracking-widest mb-1.5 ml-1">Filtro Dependencia</p>
                <div className="relative">
                  <select 
                    value={selectedArea}
                    onChange={(e) => setSelectedArea(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-600 text-white text-xs font-semibold rounded-lg px-3 py-2.5 outline-none focus:ring-2 focus:ring-blue-400 appearance-none transition-all cursor-pointer hover:bg-slate-700"
                  >
                    {uniqueAreas.map(area => (
                      <option key={area} value={area} className="text-white bg-slate-800 font-medium">{area}</option>
                    ))}
                  </select>
                </div>
             </div>

             {/* Filtro Tipo PQRSF */}
             <div className="w-full md:w-64">
                <p className="text-[10px] font-bold text-blue-200 uppercase tracking-widest mb-1.5 ml-1">Filtro Naturaleza SGC</p>
                <div className="relative">
                  <select 
                    value={selectedTipo}
                    onChange={(e) => setSelectedTipo(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-600 text-white text-xs font-semibold rounded-lg px-3 py-2.5 outline-none focus:ring-2 focus:ring-blue-400 appearance-none transition-all cursor-pointer hover:bg-slate-700"
                  >
                    {uniqueTipos.map(tipo => (
                      <option key={tipo} value={tipo} className="text-white bg-slate-800 font-medium">{tipo}</option>
                    ))}
                  </select>
                </div>
             </div>

          </div>
          <div className="flex gap-4 w-full md:w-auto mt-4 md:mt-0">
            <button 
              onClick={handleExportExcel}
              className="flex-1 md:flex-none h-11 px-5 bg-emerald-500 text-white text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-emerald-400 transition-all rounded-lg shadow-lg shadow-emerald-500/30"
            >
              <Download size={14} /> Data EXCEL
            </button>
            <button 
              onClick={handleExportPDF}
              className="flex-1 md:flex-none h-11 px-5 bg-red-500 text-white text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-red-400 transition-all rounded-lg shadow-lg shadow-red-500/30"
            >
              <FileText size={14} /> Inf. PDF
            </button>
          </div>
        </div>
      </Card>

      {/* Primary KPI Section for Deep Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <KPIItem title="Radicados" value={stats.total} subtitle="Total Solicitudes" icon={<FileText className="text-blue-600"/>} bgColor="bg-blue-50" colorClass="text-blue-600" />
        <KPIItem title="Atendidos" value={stats.atendidos} subtitle={`${((stats.atendidos/stats.total)*100 || 0).toFixed(1)}% Éxito`} icon={<ShieldCheck className="text-emerald-500"/>} bgColor="bg-emerald-50" colorClass="text-emerald-600" />
        <KPIItem title="En Proceso" value={stats.enProceso} subtitle={`${((stats.enProceso/stats.total)*100 || 0).toFixed(1)}% Base`} icon={<Clock className="text-amber-500"/>} bgColor="bg-amber-50" colorClass="text-amber-600" />
        <KPIItem title="Tiempo Promedio" value={`${stats.avgResponseTime}d`} subtitle="Velocidad Promedio" icon={<CalendarClock className="text-purple-500"/>} bgColor="bg-purple-50" colorClass="text-purple-600" />
        <KPIItem title="Efectividad SLA" value={`${stats.slaRate}%`} subtitle="Respondido en ≤ 5 días" icon={<UserCheck className="text-indigo-500"/>} bgColor="bg-indigo-50" colorClass="text-indigo-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6 bg-white shadow-xl shadow-slate-200/50 rounded-xl border border-slate-100 flex flex-col">
          <div className="mb-6 flex items-center gap-3">
             <div className="p-2 bg-blue-100 rounded-lg">
                <BarChart3 size={20} className="text-blue-700" />
             </div>
             <div>
               <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Frecuencia de Radicados</h3>
               <p className="text-xs text-slate-500 font-medium">Histórico Mensual 2026</p>
             </div>
          </div>
          <div className="h-[300px] w-full flex-grow">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.dataMonthly} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" fontSize={12} fontWeight={600} tick={{fill: '#64748B'}} axisLine={false} tickLine={false} />
                <YAxis fontSize={12} fontWeight={600} tick={{fill: '#64748B'}} axisLine={false} tickLine={false} />
                <RechartsTooltip cursor={{fill: '#F1F5F9'}} contentStyle={{fontSize: '12px', fontWeight: 'bold', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Bar dataKey="total" fill="#2563EB" radius={[6, 6, 0, 0]} barSize={45}>
                  <LabelList dataKey="total" position="top" style={{ fontSize: '13px', fontWeight: 'bold', fill: '#1E293B' }} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Distribución por Tipo de Requerimiento */}
        <Card className="p-6 bg-white shadow-xl shadow-slate-200/50 rounded-xl border border-slate-100 flex flex-col">
          <div className="mb-2 flex items-center gap-3">
             <div className="p-2 bg-emerald-100 rounded-lg">
                <TrendingUp size={20} className="text-emerald-700" />
             </div>
             <div>
               <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">{selectedTipo === 'TODOS' ? 'Naturaleza SGE' : 'Impacto por Dependencia'}</h3>
               <p className="text-xs text-slate-500 font-medium">{selectedTipo === 'TODOS' ? 'Composición de Solicitudes' : 'A quiénes afecta esto'}</p>
             </div>
          </div>
          <div className="h-[220px] w-full relative flex-grow">
             <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                 <Pie
                   data={selectedTipo === 'TODOS' ? stats.dataByAsunto : Object.entries(stats.dataByAsunto).length > 0 ? stats.areasData.slice(0,5).map((a, i) => ({name: a.name, value: a.count, color: ['#2563EB', '#1e40af', '#F59E0B', '#EF4444', '#10B981', '#8B5CF6'][i%6]})) : []}
                   innerRadius={65}
                   outerRadius={95}
                   paddingAngle={4}
                   dataKey="value"
                   stroke="none"
                 >
                   {(selectedTipo === 'TODOS' ? stats.dataByAsunto : stats.areasData.slice(0,5)).map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={entry.color || ['#2563EB', '#1e40af', '#F59E0B', '#EF4444', '#10B981', '#8B5CF6'][index%6]} />
                   ))}
                 </Pie>
                 <RechartsTooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontWeight: 'bold'}} />
               </PieChart>
             </ResponsiveContainer>
             <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-3xl font-black text-slate-800">{stats.total}</span>
                <span className="text-[10px] font-bold text-slate-400 tracking-wider">TICKETS</span>
             </div>
          </div>
          <div className="mt-4 space-y-3 max-h-[120px] overflow-y-auto pr-2 custom-scrollbar">
             {(selectedTipo === 'TODOS' ? stats.dataByAsunto : stats.areasData).map((item, idx) => {
                const color = item.color || ['#2563EB', '#1e40af', '#F59E0B', '#EF4444', '#10B981', '#8B5CF6'][idx%6];
                return (
                <div key={item.name} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                  <div className="flex items-center gap-3">
                     <div className="h-3 w-3 rounded-full shadow-sm" style={{backgroundColor: color}}></div>
                     <span className="text-xs font-bold text-slate-600 truncate max-w-[120px]" title={item.name}>{item.name}</span>
                  </div>
                  <span className="text-xs font-black text-slate-800 bg-white px-2 py-1 rounded shadow-sm">{item.count || item.value} ({(((item.count || item.value)/stats.total)*100).toFixed(0)}%)</span>
                </div>
             )})}
          </div>
        </Card>
      </div>

      {/* Matriz de Datos en Vivo / Data Grid */}
      <Card className="p-6 bg-white shadow-xl shadow-slate-200/50 rounded-xl border border-slate-100 overflow-hidden flex flex-col">
          <div className="mb-6 flex items-center gap-3">
             <div className="p-2 bg-indigo-100 rounded-lg">
                <FileCheck2 size={20} className="text-indigo-700" />
             </div>
             <div>
               <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Matriz de Solicitudes Filtradas</h3>
               <p className="text-xs text-slate-500 font-medium">Registro directo de trazabilidad SGC</p>
             </div>
          </div>
          <div className="overflow-x-auto rounded-lg border border-slate-200">
             <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                   <tr className="bg-slate-800 text-white">
                      <th className="p-3 text-xs font-bold tracking-wider">ID / RAD.</th>
                      <th className="p-3 text-xs font-bold tracking-wider">FECHA</th>
                      <th className="p-3 text-xs font-bold tracking-wider">TIPO</th>
                      <th className="p-3 text-xs font-bold tracking-wider">ASUNTO</th>
                      <th className="p-3 text-xs font-bold tracking-wider">DEPENDENCIA</th>
                      <th className="p-3 text-xs font-bold tracking-wider">ESTADO</th>
                      <th className="p-3 text-xs font-bold tracking-wider text-center">ACCIÓN</th>
                   </tr>
                </thead>
                <tbody>
                   {stats.filtered.slice(0, 50).map((ticket, idx) => (
                      <tr key={ticket.id} className={`border-b border-slate-100 hover:bg-blue-50 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
                         <td className="p-3 text-xs font-bold text-slate-700">#{ticket.id}</td>
                         <td className="p-3 text-xs text-slate-600 font-medium">{ticket.fecha}</td>
                         <td className="p-3">
                            <span className={cn("px-2 py-1 text-[10px] font-bold rounded-full uppercase truncate max-w-[100px] inline-block border", getTypeColor(ticket.tipo))}>{ticket.tipo}</span>
                         </td>
                         <td className="p-3 text-xs text-slate-700 truncate max-w-[200px] font-medium" title={ticket.asunto}>{ticket.asunto}</td>
                         <td className="p-3 text-[11px] font-bold text-slate-500 truncate max-w-[150px]" title={ticket.dependencia}>{ticket.dependencia}</td>
                         <td className="p-3">
                            <span className={`px-2 py-1 text-[10px] font-bold rounded-full uppercase ${ticket.estado === 'Atendido' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                               {ticket.estado}
                            </span>
                         </td>
                         <td className="p-3 flex justify-center">
                            <button 
                               onClick={() => setSelectedTicket(ticket)}
                               className="p-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors shadow-sm"
                               title="Ver Detalle"
                            >
                               <Eye size={16} />
                            </button>
                         </td>
                      </tr>
                   ))}
                </tbody>
             </table>
             {stats.filtered.length > 50 && (
                <div className="p-3 bg-slate-50 text-center text-xs font-medium text-slate-500 border-t border-slate-200">
                   Mostrando 50 de {stats.filtered.length} registros. Exportar para ver el listado completo.
                </div>
             )}
             {stats.filtered.length === 0 && (
                <div className="p-6 bg-slate-50 text-center text-sm font-medium text-slate-500 border-t border-slate-200">
                   No hay radicados que cumplan con estos filtros.
                </div>
             )}
          </div>
      </Card>
      
      <div className="text-center pt-6 opacity-60">
         <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">SISTEMA INTEGRAL DE GESTIÓN DE CALIDAD</p>
      </div>

      {/* Modal / Dialog Modal for Ticket Details */}
      {selectedTicket && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all relative">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-900 to-blue-800 p-6 flex items-center justify-between sticky top-0 z-[101] border-b border-blue-950">
               <div>
                  <h2 className="text-xl font-black text-white flex items-center gap-3">
                     <FileText className="text-blue-300" />
                     Ticket #{selectedTicket.id}
                  </h2>
                  <p className="text-blue-200 text-xs font-medium mt-1">Detalle del requerimiento - SGC</p>
               </div>
               <button 
                  onClick={() => setSelectedTicket(null)}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
               >
                  <X size={20} />
               </button>
            </div>
            
            {/* Modal Body */}
            <div className="p-8 space-y-8">
               
               {/* Contexto */}
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 shadow-sm">
                     <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Fecha Radicación</p>
                     <p className="text-sm font-black text-slate-800">{selectedTicket.fecha}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 shadow-sm">
                     <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Categoría</p>
                     <span className={cn("inline-block mt-1 px-2 py-1 text-xs font-bold rounded-lg border", getTypeColor(selectedTicket.tipo))}>{selectedTicket.tipo}</span>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 shadow-sm">
                     <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Estado</p>
                     <span className={`inline-block mt-1 px-2 py-1 text-xs font-bold rounded-lg text-white ${selectedTicket.estado==='Atendido' ? 'bg-emerald-500' : 'bg-amber-500'}`}>{selectedTicket.estado}</span>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 shadow-sm">
                     <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Fecha Cierre</p>
                     <p className="text-sm font-black text-slate-800">{selectedTicket.fechaRespuesta || '--'}</p>
                  </div>
               </div>

               {/* Dependencia & Usuario */}
               <div className="flex flex-col md:flex-row gap-4 bg-blue-50/50 p-5 rounded-xl border border-blue-100 shadow-sm">
                  <div className="flex-1">
                     <p className="text-[10px] font-bold text-blue-500 uppercase flex items-center gap-2 mb-2"><Users size={14}/> Solicitante</p>
                     <p className="text-sm font-bold text-slate-800">{selectedTicket.solicitante}</p>
                     <p className="text-xs text-slate-600 mt-1">{selectedTicket.creadoPor}</p>
                     {selectedTicket.email && <p className="text-xs text-blue-600 mt-1">{selectedTicket.email}</p>}
                  </div>
                  <div className="hidden md:block w-px bg-blue-200"></div>
                  <div className="flex-1">
                     <p className="text-[10px] font-bold text-blue-500 uppercase flex items-center gap-2 mb-2"><TrendingUp size={14}/> Tramitado por</p>
                     <p className="text-sm font-bold text-slate-800">{selectedTicket.dependencia}</p>
                  </div>
               </div>

               {/* Contenido (Petición) */}
               <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2 border-b border-slate-100 pb-2">
                     <FileText size={16} /> Detalles del Asunto
                  </h4>
                  <p className="text-lg font-bold text-slate-800 mb-3 leading-tight">{selectedTicket.asunto}</p>
                  <div className="bg-slate-50 p-5 rounded-xl text-sm text-slate-700 leading-relaxed border border-slate-100 shadow-inner italic">
                     "{selectedTicket.descripcion}"
                  </div>
               </div>

               {/* Respuesta */}
               <div className="mt-8">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2 border-b border-slate-100 pb-2">
                     <MessageCircle size={16} /> Decisión y Respuesta SGC
                  </h4>
                  {selectedTicket.respuesta ? (
                     <div className="bg-emerald-50 border-l-4 border-emerald-500 p-5 rounded-r-xl shadow-sm">
                        <p className="text-sm text-emerald-900 leading-relaxed font-medium">
                           {selectedTicket.respuesta}
                        </p>
                     </div>
                  ) : (
                     <div className="bg-amber-50 border-l-4 border-amber-500 p-5 rounded-r-xl shadow-sm">
                        <p className="text-sm text-amber-800 font-medium flex items-center gap-2">
                           <Clock size={16}/> En proceso de validación por la dependencia encargada. No hay respuesta definitiva aún.
                        </p>
                     </div>
                  )}
               </div>

            </div>
            {/* Modal Footer */}
            <div className="bg-slate-50 p-6 rounded-b-2xl border-t border-slate-200 flex justify-end">
               <button 
                  onClick={() => setSelectedTicket(null)}
                  className="px-6 py-2 bg-slate-800 text-white text-sm font-bold rounded-lg hover:bg-slate-700 transition-colors shadow-md"
               >
                  Cerrar Detalles
               </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

const KPIItem = ({ title, value, subtitle, icon, bgColor, colorClass, isText }) => (
  <Card className={`p-5 bg-white shadow-lg shadow-slate-200/40 rounded-xl border border-slate-100 hover:-translate-y-1 transition-transform duration-300 flex flex-col justify-between group overflow-hidden relative`}>
    <div className={`absolute top-0 right-0 w-24 h-24 ${bgColor} rounded-bl-full -mr-4 -mt-4 opacity-50 transition-transform group-hover:scale-110`} />
    <div className="flex items-center justify-between mb-4 relative z-10">
      <div className={`p-3 ${bgColor} rounded-lg shadow-inner`}>
        {React.cloneElement(icon, { size: 22 })}
      </div>
      <span className="text-xs font-medium text-slate-400 capitalize bg-slate-50 px-2 py-1 rounded-full border border-slate-100">Live</span>
    </div>
    <div className="relative z-10">
       <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
       <p className={`${isText ? 'text-lg overflow-hidden text-ellipsis whitespace-nowrap' : 'text-3xl'} font-bold mb-1 ${colorClass}`}>{value}</p>
       <p className="text-sm font-medium text-slate-400 bg-slate-50 inline-block px-2 py-1 rounded-full">{subtitle}</p>
    </div>
  </Card>
)

export default Analisis

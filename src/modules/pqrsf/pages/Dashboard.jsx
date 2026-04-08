import React from 'react'
import { Card, Badge, cn } from '@/components/ui'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import { 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  FileSearch,
  ArrowRight
} from 'lucide-react'

const dataMonthly = [
  { name: 'Ene', qty: 21 },
  { name: 'Feb', qty: 15 },
  { name: 'Mar', qty: 18 },
]

const dataPie = [
  { name: 'PETICIÓN', value: 30, color: '#0460D9' },
  { name: 'ATENCIÓN PADRE DE FAMILIA', value: 16, color: '#002855' },
  { name: 'QUEJA', value: 6, color: '#F59E0B' },
  { name: 'RECLAMO', value: 1, color: '#EF4444' },
  { name: 'SUGERENCIA', value: 1, color: '#10B981' },
]

const StatCard = ({ title, value, icon: Icon, color, trend, bgColor, border }) => (
  <Card className={cn(
    "p-8 border-none group transition-all duration-300 cursor-default relative overflow-hidden bg-white shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-slate-300/60",
    "before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1.5",
    border
  )}>
    <div className="flex justify-between items-start relative z-10">
      <div className="space-y-4">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] leading-none mb-4 block">
          {title}
        </p>
        <div className="flex items-baseline gap-1">
          <h3 className="text-4xl font-black text-slate-900 tracking-tighter italic">{value}</h3>
          {trend && (
            <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 ml-2 border border-emerald-100 italic">
               +{trend}%
            </span>
          )}
        </div>
        {trend && (
           <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-2 italic flex items-center gap-1">
              <TrendingUp size={10} className="text-emerald-500" /> vs periodo anterior
           </p>
        )}
      </div>
      <div className={cn(
        "h-14 w-14 flex items-center justify-center transition-all duration-500 rounded-none shadow-sm",
        bgColor,
        color
      )}>
        <Icon size={28} className="group-hover:scale-110 transition-transform" />
      </div>
    </div>
    
    {/* Decoración de fondo */}
    <div className={cn(
      "absolute -bottom-8 -right-8 w-24 h-24 rounded-full blur-[40px] opacity-20 transition-all group-hover:scale-150",
      bgColor
    )}></div>
  </Card>
)

const Dashboard = () => {
  return (
    <div className="space-y-8">
      {/* Contenido principal ya manejado por el layout, pero podemos añadir KPIs aquí */}
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="TOTAL RADICADOS" value="54" icon={TrendingUp} bgColor="bg-blue-50" trend="15" color="text-[#0460D9]" border="before:bg-[#0460D9]" />
        <StatCard title="EN PROCESO" value="01" icon={Clock} bgColor="bg-amber-50" color="text-amber-500" border="before:bg-amber-500" />
        <StatCard title="ATENDIDOS" value="53" icon={CheckCircle} bgColor="bg-emerald-50" trend="8" color="text-emerald-500" border="before:bg-emerald-500" />
        <StatCard title="ALERTAS" value="00" icon={AlertCircle} bgColor="bg-slate-50" color="text-slate-400" border="before:bg-slate-200" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <Card className="lg:col-span-2 p-8 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
              <TrendingUp size={16} className="text-primary" /> Radicación Mensual 2026
            </h3>
            <div className="text-[10px] font-black uppercase tracking-widest bg-slate-50 px-3 py-1 border border-slate-100">
              ACUMULADO ANUAL
            </div>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dataMonthly}>
                <defs>
                  <linearGradient id="colorQty" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0460D9" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#0460D9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="1 1" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 10, fontWeight: 700}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 10, fontWeight: 700}} />
                <Tooltip 
                  contentStyle={{borderRadius: '0px', border: '1px solid #E2E8F0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.05)', fontSize: '10px', fontWeight: 'bold'}}
                />
                <Area type="monotone" dataKey="qty" name="RADICADOS" stroke="#0460D9" strokeWidth={4} fillOpacity={1} fill="url(#colorQty)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Distribution Chart */}
        <Card className="p-8 flex flex-col gap-6">
          <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">Resolución</h3>
          <div className="h-[200px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dataPie}
                  innerRadius={65}
                  outerRadius={85}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {dataPie.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-black text-primary leading-none">57</span>
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">RADICADOS</span>
            </div>
          </div>
          <div className="space-y-3 mt-auto">
             {dataPie.map((item) => (
               <div key={item.name} className="flex items-center justify-between">
                 <div className="flex items-center gap-2">
                   <div className="h-1.5 w-1.5" style={{backgroundColor: item.color}}></div>
                   <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{item.name}</span>
                 </div>
                 <span className="text-[11px] font-black text-slate-900">{item.value}%</span>
               </div>
             ))}
          </div>
        </Card>
      </div>

      {/* Recents list */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-12">
        <Card className="border-none">
           <div className="bg-[#002855] p-5 flex items-center justify-between text-white">
              <h4 className="text-[11px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
                <FileSearch size={14} className="text-accent" /> Últimas Actividades
              </h4>
              <button className="text-[9px] font-black opacity-70 hover:opacity-100 transition-opacity flex items-center gap-1 uppercase tracking-widest">
                AUDITORÍA <ArrowRight size={12} />
              </button>
           </div>
           <div className="divide-y divide-slate-100">
             {[1378, 1377, 1376, 1375].map((id, idx) => (
               <div key={id} className="p-5 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer group border-l-2 border-transparent hover:border-primary">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 bg-slate-50 border border-slate-100 flex items-center justify-center text-[11px] font-black text-slate-400 group-hover:text-primary transition-colors">
                      {idx === 0 ? 'P' : idx === 1 ? 'P' : idx === 2 ? 'P' : 'P'}
                    </div>
                    <div>
                      <h5 className="text-[12px] font-black text-slate-900 leading-tight">FOLIO #{id}</h5>
                      <p className="text-[10px] text-slate-400 uppercase font-black tracking-tighter mt-1">
                        {id === 1378 ? 'TESORERÍA' : id === 1377 ? 'SECCIÓN JARDÍN - TERCERO' : 'SECCIÓN OCTAVO - UNDÉCIMO'} · HACE {idx + 1} H
                      </p>
                    </div>
                  </div>
                  <Badge variant={id === 1378 ? 'info' : 'success'}>
                    {id === 1378 ? 'EN PROCESO' : 'ATENDIDO'}
                  </Badge>
               </div>
             ))}
           </div>
        </Card>

        <div className="bg-slate-100/50 border border-slate-200 flex flex-col items-center justify-center p-12 text-center">
           <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Reporte Consolidado</h4>
           <div className="h-px w-12 bg-slate-300 my-4"></div>
           <p className="text-[10px] text-slate-400 max-w-xs uppercase font-bold tracking-tight">Generación de archivos PDF/Excel para revisoría académica.</p>
           <button className="mt-8 px-10 py-3 bg-white border border-slate-200 text-slate-300 text-[10px] font-black uppercase tracking-[0.2em] cursor-not-allowed">
              EXPORTAR DATA
           </button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
